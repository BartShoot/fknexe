import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconTextVariants = cva(
  "inline-flex items-center align-middle", // Base classes
  {
    variants: {
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
    },
    defaultVariants: {
      iconPosition: "left",
    },
  }
)

export interface IconTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTextVariants> {
  icon: React.ReactNode;
  gap?: string; // e.g., 'gap-1', 'gap-2', 'gap-0'
  asChild?: boolean;
  children?: React.ReactNode; // Added children here as it's part of the component's content
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
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn(iconTextVariants({ iconPosition, className }), gap)}
      {...props}
    >
      {icon}
      {children}
    </Comp>
  );
}

export { IconText, iconTextVariants }
