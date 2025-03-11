import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { buttonVariants } from '../../lib/buttonVariants' // Import depuis le fichier séparé

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Utilisation de l'import
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button }; // Ne plus exporter `buttonVariants`
