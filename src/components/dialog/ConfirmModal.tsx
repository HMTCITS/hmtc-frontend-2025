import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Show Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>Cancel</DialogCancel>
          <DialogAction>Continue</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
