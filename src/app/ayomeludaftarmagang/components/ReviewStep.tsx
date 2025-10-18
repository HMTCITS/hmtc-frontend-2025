'use client';

import { CheckCircle2, FileText, HelpCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';

import Typography from '@/components/Typography';

export interface ReviewStepProps {
  formData: {
    nama?: string;
    nrp?: string;
    kelompokKP?: string;
    file_zip?: File | null;
    generalAnswers?: { q1?: string; q2?: string; q3?: string };
    selectedDivisions: string[];
    divisionAnswers: Record<
      string,
      { q1?: string; q2?: string; q3?: string; q4?: string; q5?: string }
    >;
  };
  divisions: ReadonlyArray<{ id: string; name: string }>;
  onSubmit: () => void;
  formState?: 'success' | 'error' | null;
  onReset?: () => void;
  errors?: Partial<
    Record<
      | 'nama'
      | 'nrp'
      | 'kelompokKP'
      | 'q1'
      | 'q2'
      | 'q3'
      | 'zipFile'
      | 'selectedDivisions'
      | `divisionAnswers.${string}.q1`
      | `divisionAnswers.${string}.q2`
      | `divisionAnswers.${string}.q3`
      | `divisionAnswers.${string}.q4`
      | `divisionAnswers.${string}.q5`,
      string
    >
  >;
}

export default function ReviewStep({
  formData,
  divisions,
  onSubmit: _onSubmit,
  formState = null,
  onReset: _onReset,
  errors,
}: ReviewStepProps) {
  React.useEffect(() => {}, [errors, formData]);
  const getDivisionName = (divId: string) =>
    divisions.find((d) => d.id === divId)?.name || divId;
  const trimFileName = (name: string, max = 28) => {
    if (!name) return name;
    if (name.length <= max) return name;
    const parts = name.split('.');
    if (parts.length <= 1) return name.slice(0, max - 1) + '…';
    const ext = parts.pop() || '';
    const base = parts.join('.');
    const keep = Math.max(6, max - ext.length - 4);
    return `${base.slice(0, keep)}….${ext}`;
  };
  const GENERAL_KEYS = ['q1', 'q2', 'q3'] as const;
  const DIVISION_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  const Box: React.FC<
    React.PropsWithChildren<{ delay?: number; className?: string }>
  > = ({ delay = 0, className = '', children }) => (
    <motion.div
      className={`rounded-2xl border-1 border-blue-400/15 bg-blue-500/5 p-6 shadow-xl backdrop-blur-xs transition-all duration-300 hover:border-[#0040FF]/40 hover:shadow-[0_10px_30px_-10px_rgba(46,106,247,0.55)] ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className='space-y-6'>
      <div>
        <Typography
          as='h2'
          font='satoshi'
          weight='bold'
          className='mb-2 text-3xl text-white'
        >
          Tinjauan Akhir — Apakah Semuanya Sempurna?
        </Typography>
        <Typography as='p' font='satoshi' className='text-white/80'>
          Periksa kembali setiap detail. Ini adalah kesempatan Anda untuk
          bersinar!
        </Typography>
      </div>

      <Box delay={0.1}>
        <div className='mb-4 flex items-center gap-2'>
          <Users className='h-5 w-5 text-[#0040FF]' />
          <Typography
            as='h3'
            font='satoshi'
            weight='semibold'
            className='text-white group-hover:text-[#66a3ff]'
          >
            Identitas Anda
          </Typography>
        </div>
        <div className='space-y-3 text-sm'>
          <div className='flex items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[#0040FF]/5'>
            <span className='font-satoshi font-medium text-white/70'>
              Nama:
            </span>
            <span className='font-satoshi font-semibold text-white'>
              {formData.nama || '-'}
            </span>
          </div>
          {errors?.nama && (
            <p className='px-2 font-satoshi text-xs text-red-400'>
              {errors.nama}
            </p>
          )}
          <div className='flex items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[#0040FF]/5'>
            <span className='font-satoshi font-medium text-white/70'>NRP:</span>
            <span className='font-satoshi font-semibold text-white'>
              {formData.nrp || '-'}
            </span>
          </div>
          {errors?.nrp && (
            <p className='px-2 font-satoshi text-xs text-red-400'>
              {errors.nrp}
            </p>
          )}
          <div className='flex items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[#0040FF]/5'>
            <span className='font-satoshi font-medium text-white/70'>
              Kelompok KP:
            </span>
            <span className='font-satoshi font-semibold text-white'>
              {formData.kelompokKP || '-'}
            </span>
          </div>
          {errors?.kelompokKP && (
            <p className='px-2 font-satoshi text-xs text-red-400'>
              {errors.kelompokKP}
            </p>
          )}
        </div>
      </Box>

      <Box delay={0.2}>
        <div className='mb-4 flex items-center gap-2'>
          <FileText className='h-5 w-5 text-[#0040FF]' />
          <Typography
            as='h3'
            font='satoshi'
            weight='semibold'
            className='text-white'
          >
            Bundle Dokumen (ZIP)
          </Typography>
        </div>
        <div className='space-y-3 text-sm'>
          <div className='flex items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[#0040FF]/5'>
            <span className='font-satoshi font-medium text-white/70'>
              File ZIP:
            </span>
            <span
              className='font-satoshi font-semibold text-white'
              title={formData.file_zip ? formData.file_zip.name : undefined}
            >
              {formData.file_zip ? `✓ ${trimFileName(formData.file_zip.name)}` : '❌ Belum diunggah'}
            </span>
          </div>
          {errors?.zipFile && (
            <p className='px-2 font-satoshi text-xs text-red-400'>
              {errors.zipFile}
            </p>
          )}
          <div className='rounded px-2 py-2 text-white/80'>
            <p className='font-satoshi text-xs'>Isi ZIP:</p>
            <ul className='list-inside list-disc font-satoshi text-xs'>
              <li>Wajib: CV ATS (PDF)</li>
              <li>Wajib: Brainmap (PDF)</li>
              <li>Opsional: Portofolio (PDF, khusus CMI)</li>
            </ul>
          </div>
        </div>
      </Box>

      <Box delay={0.3}>
        <div className='mb-4 flex items-center gap-2'>
          <HelpCircle className='h-5 w-5 text-[#0040FF]' />
          <Typography
            as='h3'
            font='satoshi'
            weight='semibold'
            className='text-white'
          >
            Jawaban Anda (Umum)
          </Typography>
        </div>
        <div className='space-y-4'>
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              className='rounded-lg border border-[#0040FF]/20 bg-[#0040FF]/10 p-3'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + num * 0.05 }}
            >
              <p className='mb-2 font-satoshi text-xs font-semibold text-[#66a3ff]'>
                Pertanyaan {num}
              </p>
              <p className='font-satoshi text-sm text-white'>
                {formData.generalAnswers?.[GENERAL_KEYS[num - 1]] || '-'}
              </p>
              {errors?.[GENERAL_KEYS[num - 1]] && (
                <p className='mt-1 font-satoshi text-xs text-red-400'>
                  {errors[GENERAL_KEYS[num - 1]]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Box>

      <Box delay={0.4}>
        <div className='mb-4 flex items-center gap-2'>
          <Users className='h-5 w-5 text-[#0040FF]' />
          <Typography
            as='h3'
            font='satoshi'
            weight='semibold'
            className='text-white'
          >
            Divisi Pilihan Anda ({formData.selectedDivisions.length})
          </Typography>
        </div>
        <div className='flex flex-wrap gap-2'>
          {formData.selectedDivisions.map((divId, idx) => (
            <motion.span
              key={divId}
              className='rounded-full border border-[#0040FF]/40 bg-gradient-to-r from-[#0040FF]/20 to-blue-300/20 px-4 py-2 font-satoshi text-sm font-semibold text-[#66a3ff]'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              {idx + 1}. {getDivisionName(divId)}
            </motion.span>
          ))}
        </div>
        {errors?.selectedDivisions && (
          <p className='mt-2 font-satoshi text-xs text-red-400'>
            {errors.selectedDivisions}
          </p>
        )}
      </Box>

      {formData.selectedDivisions.length > 0 && (
        <Box delay={0.5}>
          <div className='mb-4 flex items-center gap-2'>
            <HelpCircle className='h-5 w-5 text-[#0040FF]' />
            <Typography
              as='h3'
              font='satoshi'
              weight='semibold'
              className='text-white'
            >
              Jawaban Spesifik Divisi
            </Typography>
          </div>
          <div className='space-y-6'>
            {formData.selectedDivisions.map((divId) => (
              <div key={divId} className='border-l-4 border-[#0040FF]/40 pl-4'>
                <p className='mb-3 font-satoshi font-semibold text-white'>
                  {getDivisionName(divId)}
                </p>
                <div className='space-y-2'>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className='text-sm'>
                      <p className='mb-1 font-satoshi text-xs font-semibold text-[#66a3ff]'>
                        Pertanyaan {num}
                      </p>
                      <p className='font-satoshi text-white'>
                        {formData.divisionAnswers[divId]?.[
                          DIVISION_KEYS[num - 1]
                        ] || '-'}
                      </p>
                      {errors?.[
                        `divisionAnswers.${divId}.${DIVISION_KEYS[num - 1]}`
                      ] && (
                        <p className='mt-1 font-satoshi text-xs text-red-400'>
                          {
                            errors[
                              `divisionAnswers.${divId}.${DIVISION_KEYS[num - 1]}`
                            ]
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}

      <Box
        delay={0.6}
        className={`mb-4 border-1 p-4 ${
          formState === 'success'
            ? 'border-green-400/40 bg-green-600/6'
            : formState === 'error'
              ? 'border-red-400/40 bg-red-600/6'
              : 'border-[#0040FF]/40 bg-gradient-to-r from-[#0040FF]/15 to-blue-300/15'
        }`}
      >
        <div className='flex items-start justify-between gap-3'>
          <div className='flex gap-3'>
            <motion.div
              animate={
                formState ? { scale: [1, 1.04, 1] } : { scale: [1, 1.08, 1] }
              }
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
              className='mt-0.5'
            >
              {formState === 'success' ? (
                <CheckCircle2 className='h-6 w-6 flex-shrink-0 text-green-400' />
              ) : formState === 'error' ? (
                <CheckCircle2 className='h-6 w-6 flex-shrink-0 text-red-400' />
              ) : (
                <CheckCircle2 className='h-6 w-6 flex-shrink-0 text-[#66a3ff]' />
              )}
            </motion.div>
            <div>
              <p className='mb-1 font-satoshi font-semibold text-white'>
                {formState === 'success'
                  ? 'Pengiriman Berhasil'
                  : formState === 'error'
                    ? 'Pengiriman Gagal'
                    : 'Semua siap? Mari kita lanjutkan!'}
              </p>
              <p className='font-satoshi text-sm text-white/80'>
                {formState === 'success'
                  ? 'Aplikasi Anda telah berhasil dikirim. Untuk mengirim ulang atau mengubah data, silakan reset formulir terlebih dahulu.'
                  : formState === 'error'
                    ? 'Terjadi kesalahan saat mengirim. Anda masih dapat kembali dan memperbaiki data, atau coba mengirim kembali.'
                    : 'Klik tombol di bawah untuk mengirim aplikasi Anda. Tim kami akan meninjau dengan seksama dan menghubungi Anda sesegera mungkin.'}
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
