import { LinkProps } from 'next/link';
import * as React from 'react';

import Button, { ButtonProps } from '@/components/buttons/Button';
import BaseLink from '@/components/links/BaseLink';

export type ButtonLinkProps = {
  href: string;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & ButtonProps &
  React.ComponentPropsWithRef<'a'>;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    { href, openNewTab, className, nextLinkProps, target, children, ...rest },
    ref,
  ) => {
    return (
      <BaseLink
        href={href}
        ref={ref}
        target={target}
        openNewTab={openNewTab}
        nextLinkProps={nextLinkProps}
        className={className}
      >
        <Button {...rest}>{children}</Button>
      </BaseLink>
    );
  },
);

export default ButtonLink;
