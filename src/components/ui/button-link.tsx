import * as React from 'react'
import { Button } from './button'
import { useEffect, useRef } from 'react'

function ButtonLink({
  children,
  className,
  href,
  download,
  ...props
}: React.ComponentProps<typeof Button> & Pick<React.ComponentProps<'a'>, 'href' | 'download'>) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const aRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!buttonRef.current || !aRef.current || !buttonRef.current.className) return
    const className = buttonRef.current.className
    aRef.current.className = className

    buttonRef.current.removeAttribute('class')
  }, [])

  return (
    <Button ref={buttonRef} {...props}>
      <a ref={aRef} className={className} href={href} download={download}>
        {children}
      </a>
    </Button>
  )
}

export { ButtonLink }
