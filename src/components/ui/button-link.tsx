import { Button } from '@/components/ui/button'

type Nullable<T> = { [K in keyof T]: T[K] | null }

interface IButtonLinkProps
  extends Omit<React.ComponentProps<typeof Button>, 'rel'>,
    Nullable<Pick<React.ComponentProps<'a'>, 'href' | 'download' | 'target' | 'rel'>> {}

function ButtonLink({
  children,
  className,
  href,
  download,
  rel = 'noopener noreferrer',
  target = '_blank',
  ...props
}: IButtonLinkProps) {
  return (
    <Button className={className} asChild {...props}>
      <a
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
