'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { GalleryFormData } from '@/lib/validation/gallery';

import { GalleryForm } from './GalleryForm';

interface GalleryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GalleryFormData) => Promise<void>;
  initialData?: Partial<GalleryFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export function GalleryFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
  mode = 'create',
}: GalleryFormDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (data: GalleryFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {mode === 'create' ? 'Add New Gallery Item' : 'Edit Gallery Item'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <GalleryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={initialData}
            isLoading={isLoading}
            mode={mode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}