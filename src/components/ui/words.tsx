import { Fragment } from 'react'

// Word splits stay real text with real spaces so crawlers read whole sentences; char splits are hidden and need an sr-only copy
export const Words = ({ text, className, chars }: { text: string, className: string, chars?: boolean }) => (
  <span aria-hidden={chars}>
    {text.split(' ').map((word, i) => (
      <Fragment key={i}>
        {i > 0 && ' '}
        <span className='inline-block overflow-hidden pb-0.5 align-bottom'>
          {chars
            ? word.split('').map((char, j) => (
              <span key={j} className={`${className} inline-block`}>{char}</span>
            ))
            : <span className={`${className} inline-block`}>{word}</span>}
        </span>
      </Fragment>
    ))}
  </span>
)
