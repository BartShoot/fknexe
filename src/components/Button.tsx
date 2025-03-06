import { cva, cx, type VariantProps } from 'cva'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const variants = cva({
  base: 'cursor-pointer inline-flex items-center justify-center align-middle rounded-md',
  variants: {
    variant: {
      default: 'bg-neutral-900 hover:bg-neutral-700 text-white',
    },
    size: {
      default: 'h-8 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type IElement = HTMLButtonElement

export interface IProps extends ButtonHTMLAttributes<IElement>, VariantProps<typeof variants> {}

const Button = forwardRef<IElement, IProps>(({ className, children, variant, size, ...props }, ref) => (
  <button {...props} ref={ref} className={cx(variants({ variant, size, className }))}>
    {children}
  </button>
))

Button.displayName = 'Button'

export { Button, variants as ButtonVariants, type IProps as IButtonProps }
