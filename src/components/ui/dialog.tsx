'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='alert-dialog' {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='alert-dialog-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const childrenArray = React.Children.toArray(props.children);
  const hasTitle = childrenArray.some((child) => {
    if (!React.isValidElement(child)) return false;
    const propsAny = child.props as any;
    return (
      propsAny?.['data-slot'] === 'alert-dialog-title' ||
      (child.type as any)?.displayName === 'DialogTitle'
    );
  });

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'font-satoshi text-base',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {!hasTitle && (
          <DialogPrimitive.Title className='sr-only'>
            Dialog
          </DialogPrimitive.Title>
        )}
        {props.children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}
DialogTitle.displayName = 'DialogTitle';

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function DialogAction({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <DialogPrimitive.Close
      asChild
      {...props}
      className={cn(buttonVariants(), className)}
    />
  );
}

function DialogCancel({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <DialogPrimitive.Close
      asChild
      {...props}
      className={cn(buttonVariants({ variant: 'outline' }), className)}
    />
  );
}

export {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
