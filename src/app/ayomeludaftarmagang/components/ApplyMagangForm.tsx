'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileSpreadsheet } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ApplyMagangFormData,
  applyMagangSchema,
} from '@/app/ayomeludaftarmagang/validation/schema';
import Input from '@/components/forms/Input';
import { DocumentUpload } from '@/components/repository/DocumentUpload';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';

/**
 * Props contract for ApplyMagangForm component.
 *
 * onSubmitSuccess and onSubmitError are used to notify parent about the
 * asynchronous mutation result and display appropriate dialogs.
 */
export type ApplyMagangFormProps = {
  onSubmitSuccess: () => void;
  onSubmitError: (message: string) => void;
  submitFn: (payload: {
    nama: string;
    nrp: string;
    kelompokKP: string;
    mindmap: File;
  }) => Promise<unknown>;
};

/**
 * ApplyMagangForm encapsulates the form UI and validation logic for
 * registering internship applicants. It reuses existing design-system
 * components for consistent UX.
 */
export default function ApplyMagangForm({
  onSubmitSuccess,
  onSubmitError,
  submitFn,
}: ApplyMagangFormProps) {
  const methods = useForm<ApplyMagangFormData>({
    resolver: zodResolver(applyMagangSchema),
    mode: 'onChange',
    defaultValues: { nama: '', nrp: '', kelompokKP: '', mindmapMeta: null },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, isSubmitting },
  } = methods;

  const [mindmapFile, setMindmapFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string | undefined>(
    undefined,
  );

  const validateAndSelectFile = (file: File) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    const isAllowed =
      allowed.includes(file.type) || /\.(pdf|docx?|txt)$/i.test(file.name);
    const isSizeOk = file.size <= 10 * 1024 * 1024;
    if (!isAllowed) {
      setFileError('Tipe file tidak didukung. Gunakan PDF/DOC/DOCX/TXT.');
      setMindmapFile(null);
      setValue('mindmapMeta', null, { shouldValidate: true });
      return false;
    }
    if (!isSizeOk) {
      setFileError('Ukuran file maksimal 10MB.');
      setMindmapFile(null);
      setValue('mindmapMeta', null, { shouldValidate: true });
      return false;
    }
    setFileError(undefined);
    setMindmapFile(file);
    setValue(
      'mindmapMeta',
      { fileName: file.name, size: file.size },
      { shouldValidate: true },
    );
    return true;
  };

  const onFileSelect = (file: File) => void validateAndSelectFile(file);
  const onFileRemove = () => {
    setMindmapFile(null);
    setFileError(undefined);
    setValue('mindmapMeta', null, { shouldValidate: true });
  };

  const onSubmit = async (data: ApplyMagangFormData) => {
    if (!mindmapFile) {
      setFileError('File mindmap wajib diunggah');
      return;
    }
    try {
      await submitFn({
        nama: data.nama,
        nrp: data.nrp,
        kelompokKP: data.kelompokKP,
        mindmap: mindmapFile,
      });
      onSubmitSuccess();
    } catch (e: any) {
      onSubmitError(e?.message || 'Terjadi kesalahan saat submit');
    }
  };

  const isBusy = isSubmitting;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-7'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <Input
            id='nama'
            label='Nama'
            placeholder='Nama lengkap'
            validation={{
              required: 'Nama wajib diisi',
              minLength: { value: 2, message: 'Nama minimal 2 karakter' },
            }}
            disabled={isBusy}
            autoComplete='name'
            labelClassName='text-white'
            inputClassName='bg-white/6 border-white/30 text-white placeholder:text-white/60 focus:border-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 min-h-11 md:min-h-10'
          />
          <Input
            id='nrp'
            label='NRP'
            placeholder='8-12 digit angka'
            validation={{
              required: 'NRP wajib diisi',
              pattern: {
                value: /^\d{8,12}$/,
                message: 'NRP harus 8-12 digit angka',
              },
            }}
            disabled={isBusy}
            inputMode='numeric'
            autoComplete='off'
            labelClassName='text-white'
            inputClassName='bg-white/6 border-white/30 text-white placeholder:text-white/60 focus:border-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 min-h-11 md:min-h-10'
          />
        </div>

        <Input
          id='kelompokKP'
          label='Kelompok KP'
          placeholder='Contoh: KP-3'
          validation={{ required: 'Kelompok KP wajib diisi' }}
          disabled={isBusy}
          autoComplete='off'
          labelClassName='text-white'
          inputClassName='bg-white/6 border-white/30 text-white placeholder:text-white/60 focus:border-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 min-h-11 md:min-h-10'
        />

        <div className='space-y-3'>
          <Typography
            as='label'
            htmlFor='mindmap'
            variant='s3'
            className='font-satoshi text-sm text-white/90 md:text-[15px]'
          >
            File Mindmap
          </Typography>
          <DocumentUpload
            onFileSelect={onFileSelect}
            onFileRemove={onFileRemove}
            selectedFile={mindmapFile}
            error={fileError}
            disabled={isBusy}
            tone='glass'
            className='mt-1'
          />
          <Typography
            as='p'
            variant='c0'
            className='text-[12px] leading-relaxed text-white/70'
          >
            Format yang diterima: PDF, DOC, DOCX, atau TXT. Maksimal 10MB.
          </Typography>
        </div>

        <div className='flex flex-col-reverse items-stretch justify-end gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center'>
          <Button
            type='reset'
            variant='outline'
            disabled={isBusy}
            onClick={() => {
              onFileRemove();
              reset();
            }}
            className='w-full border-white/40 text-white hover:bg-white md:w-auto'
          >
            Reset
          </Button>
          <Button
            type='submit'
            disabled={!isValid || isBusy}
            className='w-full bg-indigo-600 text-white shadow-[0_10px_30px_-10px_rgba(82,39,255,0.9)] hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300/30 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto'
            aria-label='Kirim Lamaran'
          >
            {isBusy ? (
              <span className='inline-flex items-center gap-2'>
                <span
                  className='h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white'
                  aria-hidden='true'
                />
                Mengirim...
              </span>
            ) : (
              <span className='inline-flex items-center gap-2'>
                <FileSpreadsheet className='h-4 w-4 text-white' /> Kirim Lamaran
              </span>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
