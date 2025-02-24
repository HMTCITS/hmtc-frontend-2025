import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
import { cn } from '@/lib/utils';
import useDialogStore from '@/store/useDialogStore';
type LayoutOpt = {
  children: React.ReactNode;
  withFooter?: boolean;
  withNavbar?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  className,
  withNavbar = true,
  withFooter = true,
}: LayoutOpt) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  //#endregion //*========= Sidebar =========

  return (
    <div className={cn('overflow-x-hidden', className)}>
      {withNavbar && <Navbar />}
      {children}
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
      {withFooter && <Footer />}
    </div>
  );
}
