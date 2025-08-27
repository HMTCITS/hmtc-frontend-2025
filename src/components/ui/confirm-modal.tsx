import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span
    className='sr-only'
    style={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    }}
  >
    {children}
  </span>
);

export type ConfirmAction = {
  id?: string;
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  leadingIcon?: React.ReactNode;
  autoFocus?: boolean;
  autoCloseOnResolve?: boolean;
  onClick?: () => void | Promise<any>;
};

export type ConfirmModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  variant?: 'neutral' | 'info' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  illustration?: React.ReactNode;
  children?: React.ReactNode;
  actions?: ConfirmAction[];
  renderHeader?: (
    p: Omit<ConfirmModalProps, 'renderHeader'>,
  ) => React.ReactNode;
  renderActions?: (
    actions: ConfirmAction[],
    busyIds: string[],
  ) => React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  primaryOnEnter?: boolean;
};

export function ConfirmModal(props: ConfirmModalProps) {
  // Handle controlled/uncontrolled open busy state per action id, onEnter, trigger, etc
  // Handle controlled/uncontrolled open state
  const [uncontrolledOpen, setUncontrolledOpen] = useState(props.defaultOpen);
  const open = props.open !== undefined ? props.open : uncontrolledOpen;
  const setOpen = (value: boolean) => {
    setUncontrolledOpen(value);
    props.onOpenChange?.(value);
  };

  // Busy state
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const isBusy = busyIds.length > 0;

  // Set action as busy during async
  const handleActionBusy = async (action: ConfirmAction) => {
    // Handle close/cancel button (id = 'close' || id = 'cancel')
    if (
      action.id === 'close' ||
      action.label.toLowerCase() === 'close' ||
      action.id === 'cancel' ||
      action.label.toLowerCase() === 'cancel'
    ) {
      setOpen(false);
      return;
    }

    if (!action.onClick) return;

    const actionId = action.id || action.label;
    setBusyIds((prev) => [...prev, actionId]);

    try {
      await action.onClick();
      if (action.autoCloseOnResolve) setOpen(false);
    } finally {
      setBusyIds((prev) => prev.filter((id) => id !== actionId));
    }
  };

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isBusy) return;

    // Close on escape
    if (props.closeOnEsc && e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }

    // Trigger primary action
    if (props.primaryOnEnter && e.key === 'Enter') {
      const actions = props.actions || [];
      const primaryAction = actions.find((a) => a.autoFocus);
      if (primaryAction) {
        e.preventDefault();
        handleActionBusy(primaryAction);
      }
    }
  };

  // map variant -> classNames
  const variantClasses = {
    neutral: '',
    info: '',
    success: '',
    danger: '',
    warning: '',
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  // Map variant to button
  const mapVariantToButtonVariant = (
    modalVariant: string,
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variantMap: Record<
      string,
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      neutral: 'default',
      info: 'default',
      success: 'default',
      danger: 'destructive',
      warning: 'outline',
    };

    return variantMap[modalVariant] || 'default';
  };

  // Default to autoFocus primary actions
  useEffect(() => {
    if (
      open &&
      props.actions?.length &&
      !props.actions.some((a) => a.autoFocus)
    ) {
      props.actions[0].autoFocus = true;
    }
  }, [open, props.actions]);

  // render default header/body/actions bila renderHeader tidak disuplai
  // Render default header
  const defaultHeader = (
    <DialogHeader
      className={cn('flex flex-col items-center space-y-2 text-center')}
    >
      {props.title ? (
        <DialogTitle
          className='font-satoshi text-[24px] font-semibold'
          id='confirm-modal-title'
        >
          {props.title}
        </DialogTitle>
      ) : (
        <VisuallyHidden>
          <DialogTitle id='confirm-modal-title'>Dialog</DialogTitle>
        </VisuallyHidden>
      )}

      {/* Illustration */}
      {props.illustration && <div className='mb-2'>{props.illustration}</div>}

      {/* Subtitle/Description */}
      {props.subtitle && (
        <DialogDescription
          className='font-satoshi text-base'
          id='confirm-modal-description'
        >
          {props.subtitle}
        </DialogDescription>
      )}
    </DialogHeader>
  );

  // Render default actions
  const defaultActions = (
    <DialogFooter className='flex w-full flex-col gap-6 sm:flex-row sm:justify-center'>
      {props.actions?.map((action) => (
        <Button
          key={action.id || action.label}
          variant={
            action.variant ||
            mapVariantToButtonVariant(props.variant || 'neutral')
          }
          disabled={isBusy}
          onClick={() => handleActionBusy(action)}
          autoFocus={action.autoFocus}
          className='h-auto w-full p-4 font-satoshi text-[18px] sm:max-w-[100%] sm:flex-1'
        >
          {action.leadingIcon && (
            <span className='mr-2'>{action.leadingIcon}</span>
          )}
          {action.label}
          {busyIds.includes(action.id || action.label) && (
            <span className='ml-2'>{/* Loading Spinner */}</span>
          )}
        </Button>
      ))}
    </DialogFooter>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          'font-satoshi',
          sizeClasses[props.size || 'md'],
          variantClasses[props.variant || 'neutral'],
          'px-8 py-6',
        )}
        onKeyDown={handleKeyDown}
        onInteractOutside={
          props.closeOnOverlayClick ? undefined : (e) => e.preventDefault()
        }
        aria-labelledby='confirm-modal-title'
        aria-describedby='confirm-modal-description'
      >
        {/* Fallback hidden title */}
        <VisuallyHidden>
          <DialogTitle id='confirm-modal-title-fallback'>Dialog</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        {props.renderHeader
          ? props.renderHeader({
              title: props.title,
              subtitle: props.subtitle,
              illustration: props.illustration,
            })
          : defaultHeader}

        {/* Body */}
        {props.children && (
          <div className='py-2 text-center'>{props.children}</div>
        )}

        {/* Actions */}
        {props.renderActions
          ? props.renderActions(props.actions ?? [], busyIds)
          : defaultActions}
      </DialogContent>
    </Dialog>
  );
}
