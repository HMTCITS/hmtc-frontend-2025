'use client';

import { ArrowLeft,Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { GalleryForm } from '@/components/gallery/GalleryForm';
import { GalleryFormDialog } from '@/components/gallery/GalleryFormDialog';
import { Button } from '@/components/ui/button';
import type { GalleryFormData } from '@/lib/validation/gallery';

import { useCreateGallery } from '../hooks/gallery';

export default function AddGalleryPage() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [showInlineForm, setShowInlineForm] = useState(false);
  const createMutation = useCreateGallery();
  const router = useRouter();

  const handleCreateGallery = async (data: GalleryFormData) => {
    try {
      if (!data.thumbnail) {
        toast.error('Thumbnail image is required.');
        return;
      }

    await createMutation.mutateAsync(data);
      toast.success('Gallery item created successfully!');
      
      // Redirect to gallery list after success
      router.push('/dashboard/gallery');
    } catch (error) {
      toast.error(`Failed to create gallery item. ${(error as Error).message}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/gallery">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Gallery Item</h1>
            <p className="text-gray-600 mt-1">Create a new item for your gallery</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!showInlineForm && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Choose how to add gallery item</h2>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowInlineForm(true)} 
                size="lg"
                className="flex-col h-auto py-4 px-8"
              >
                <Plus className="h-6 w-6 mb-2" />
                <span>Inline Form</span>
                <span className="text-xs opacity-75">Full page form</span>
              </Button>
              
              <Button 
                onClick={() => setIsFormDialogOpen(true)} 
                variant="outline"
                size="lg"
                className="flex-col h-auto py-4 px-8"
              >
                <Plus className="h-6 w-6 mb-2" />
                <span>Dialog Form</span>
                <span className="text-xs opacity-75">Popup modal</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Form */}
      {showInlineForm && (
        <GalleryForm
          onSubmit={handleCreateGallery}
          onCancel={() => setShowInlineForm(false)}
          isLoading={createMutation.isPending}
          mode="create"
        />
      )}

      {/* Dialog Form */}
      <GalleryFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleCreateGallery}
        isLoading={createMutation.isPending}
        mode="create"
      />
    </div>
  );
}