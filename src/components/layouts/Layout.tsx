import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import cn from '@/lib/clsxm';
import useDialogStore from '@/store/useDialogStore';

type LayoutOpt = {
  children: React.ReactNode;
  withFooter?: boolean;
  withNavbar?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  className,
  withFooter = true,
  withNavbar = true,
}: LayoutOpt) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  //#region //*============ Sidebar =========
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  //#endregion //*========= Sidebar =========

  return (
    <div className={cn('overflow-x-hidden', className)}>
      {withNavbar && (
        <Navbar
          isSidebarOpen={isSidebarOpen}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
        />
      )}
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
