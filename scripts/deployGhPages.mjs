import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

// Builds the static site and force-pushes out/ to the gh-pages branch.
//
//   node scripts/deployGhPages.mjs            production: https://www.garemotours.com (writes CNAME)
//   node scripts/deployGhPages.mjs --test     test: https://<owner>.github.io/<repo> (base path, no CNAME)
//   --no-build   push the existing out/ as-is
//   --no-push    build and prepare out/ without pushing
//
// Repository Settings → Pages → Source must be "Deploy from a branch" → gh-pages / (root).

const domain = 'www.garemotours.com'
const branch = 'gh-pages'
const outDir = resolve('out')

const args = new Set(process.argv.slice(2))
const test = args.has('--test')
const build = !args.has('--no-build')
const push = !args.has('--no-push')

const run = (command, commandArgs, options = {}) => {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit', ...options })

  if (result.status !== 0) {
    console.error(`\n✖ ${command} ${commandArgs.join(' ')} failed`)
    process.exit(result.status ?? 1)
  }
}

const read = (command, commandArgs) => spawnSync(command, commandArgs, { encoding: 'utf8' }).stdout.trim()

const remote = read('git', ['remote', 'get-url', 'origin'])
const match = remote.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/)

if (!match) {
  console.error(`✖ origin is not a GitHub repository: ${remote}`)
  process.exit(1)
}

const [, owner, repo] = match
const basePath = test ? `/${repo}` : ''
const siteUrl = test ? `https://${owner.toLowerCase()}.github.io/${repo}` : `https://${domain}`

console.log(`→ Target: ${siteUrl}${test ? ' (test)' : ''}`)

if (build) {
  run('npm', ['run', 'build:pages'], {
    // shell is needed for npm.cmd on Windows; env is passed directly, so Git Bash cannot rewrite the base path
    shell: process.platform === 'win32',
    env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl }
  })
}

// Serve _next/ as-is (no Jekyll) and bind the custom domain only for production
writeFileSync(join(outDir, '.nojekyll'), '')
if (test) rmSync(join(outDir, 'CNAME'), { force: true })
else writeFileSync(join(outDir, 'CNAME'), `${domain}\n`)

if (!push) {
  console.log(`✔ Built ${outDir} (not pushed)`)
  process.exit(0)
}

// Commit out/ into a throwaway repository and replace the remote branch with it
const source = read('git', ['rev-parse', '--short', 'HEAD'])
const gitDir = mkdtempSync(join(tmpdir(), 'gh-pages-'))
const git = (...gitArgs) => run('git', [`--git-dir=${gitDir}`, `--work-tree=${outDir}`, ...gitArgs])

try {
  git('init', '--quiet', `--initial-branch=${branch}`)
  git('add', '--all')
  git('commit', '--quiet', '-m', `Deploy ${source} to ${siteUrl}`)
  git('push', '--force', remote, `${branch}:${branch}`)
} finally {
  rmSync(gitDir, { recursive: true, force: true })
}

console.log(`✔ Pushed to ${branch}. Live in a minute or two at ${siteUrl}/`)
