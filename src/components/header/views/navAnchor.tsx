import Link from 'next/link'
import type { ComponentProps } from 'react'

export const NavAnchor = ({ href, ...props }: ComponentProps<'a'> & { href: string }) =>
  href.startsWith('/') ? <Link href={href} {...props} /> : <a href={href} {...props} />
