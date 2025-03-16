import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

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
    <Button ref={buttonRef} className={className} {...props}>
      <a ref={aRef} href={href} download={download} rel='noopener noreferrer' target='_blank'>
        {children}
      </a>
    </Button>
  )
}

export { ButtonLink }
