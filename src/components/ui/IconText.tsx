import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconTextVariants = cva(
  'inline-flex items-center align-middle', // Base classes
  {
    variants: {
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      iconPosition: 'left',
    },
  },
)

export interface IconTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTextVariants> {
  icon: React.ReactNode
  gap?: string // e.g., 'gap-1', 'gap-2', 'gap-0'
  asChild?: boolean
  children?: React.ReactNode // Added children here as it's part of the component's content
}

function IconText({
  className,
  icon,
  iconPosition,
  gap = 'gap-1.5', // Default gap
  asChild = false,
  children,
  ...props
}: IconTextProps) {
  if (asChild) {
    if (React.Children.count(children) !== 1 || !React.isValidElement(children)) {
      console.error(
        'IconText with asChild expects a single React element child. Received:',
        children,
      )
      return <>{children}</>
    }
    return (
      <Slot className={cn(iconTextVariants({ iconPosition, className }), gap)} {...props}>
        {React.cloneElement(children as React.ReactElement, {
          children:
            iconPosition === 'right' ?
              <>
                {(children as React.ReactElement).props.children}
                {icon}
              </>
            : <>
                {icon}
                {(children as React.ReactElement).props.children}
              </>,
        })}
      </Slot>
    )
  }

  return (
    <span className={cn(iconTextVariants({ iconPosition, className }), gap)} {...props}>
      {iconPosition === 'right' ?
        <>
          {children}
          {icon}
        </>
      : <>
          {icon}
          {children}
        </>
      }
    </span>
  )
}

export { IconText, iconTextVariants }
