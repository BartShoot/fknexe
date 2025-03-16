import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

type Nullable<T> = { [K in keyof T]: T[K] | null }

function ButtonLink({
  children,
  className,
  href,
  download,
  rel = 'noopener noreferrer',
  target = '_blank',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'rel'> &
  Nullable<Pick<React.ComponentProps<'a'>, 'href' | 'download' | 'target' | 'rel'>>) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const aRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!buttonRef.current || !aRef.current || !buttonRef.current.className) return
    const className = buttonRef.current.className
    aRef.current.className = className

    buttonRef.current.removeAttribute('class')
  }, [])

  return (
    <Button ref={buttonRef} className={className} {...props}>
      <a
        ref={aRef}
        href={href ?? undefined}
        download={download}
        rel={rel ?? undefined}
        target={target ?? undefined}
      >
        {children}
      </a>
    </Button>
  )
}

export { ButtonLink }
