'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, TriangleAlert } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import ApplyMagangFormStep from '@/app/ayomeludaftarmagang/components/ApplyMagangFormStep';
import DivisionQuestionStep from '@/app/ayomeludaftarmagang/components/DivisionQuestionStep';
import HMTCIntroductionStep from '@/app/ayomeludaftarmagang/components/HMTCIntroductionStep';
import ReviewStep from '@/app/ayomeludaftarmagang/components/ReviewStep';
import DotGrid from '@/components/reactbits/DotGrid';
import Stepper, { Step } from '@/components/reactbits/Stepper';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DIVISIONS } from '@/contents/magangForm';
import { useScheduleAutoRedirect } from '@/hooks/api/useSchedule';
import { useUploadMagang } from '@/hooks/api/useUploadMagang';
import {
  clearAllLocal,
  clearFormState,
  clearZipFile,
  loadBase,
  loadDivisionAnswers,
  loadFormState,
  loadSelectedDivisions,
  loadZipFile,
  saveDivisionAnswers,
  saveFormState,
  saveSelectedDivisions,
} from '@/lib/persist';
import {
  magangFormSchema,
  type MagangFormValues,
} from '@/lib/validation/magangForm.schema';

export default function Magang2Page() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorMsg, _setErrorMsg] = React.useState<string>('');
  const [submissionOpen, setSubmissionOpen] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [submissionErrorMsg, setSubmissionErrorMsg] =
    React.useState<string>('');
  const [lastPayload, setLastPayload] = React.useState<any | null>(null);
  const [formState, setFormState] = React.useState<'success' | 'error' | null>(
    null,
  );
  const [isReady, setIsReady] = React.useState(false);
  useScheduleAutoRedirect(5000, '/hidden-page-cf');
  const { mutate } = useUploadMagang({
    onSuccess: (_data) => {
      try {
        setSubmissionStatus('success');
        setFormState('success');
        saveFormState('success');
      } catch (err) {
        void err;
      }
    },
    onError: (err) => {
      try {
        setSubmissionErrorMsg(
          err?.message || 'Terjadi kesalahan saat mengirim data.',
        );
        setSubmissionStatus('error');
        setFormState('error');
        saveFormState('error');
      } catch (err) {
        void err;
      }
    },
  });
  const formId = React.useMemo(() => 'apply-magang-form', []);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [clearedSteps, setClearedSteps] = React.useState<number[]>([]);
  const [pendingFocus, setPendingFocus] = React.useState<{
    step: number;
    field?: string;
  } | null>(null);

  const skipSetIsNavigatingRef = React.useRef(false);

  const methods = useForm<MagangFormValues>({
    resolver: zodResolver(magangFormSchema),
    defaultValues: {
      nama: '',
      nrp: '',
      kelompokKP: '',
      q1: '',
      q2: '',
      q3: '',
      zipFile: null as any,
      selectedDivisions: [],
      divisionAnswers: {} as any,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const {
    handleSubmit,
    setValue,
    reset,
    resetField,
    control,
    setFocus,
    clearErrors,
  } = methods;
  const rawSelectedDivisions = useWatch({ control, name: 'selectedDivisions' });
  const selectedDivisions = React.useMemo(
    () => rawSelectedDivisions || [],
    [rawSelectedDivisions],
  );
  const rawDivisionAnswers = useWatch({ control, name: 'divisionAnswers' });
  const divisionAnswers = React.useMemo(
    () => rawDivisionAnswers || {},
    [rawDivisionAnswers],
  );
  const zipFile = useWatch({ control, name: 'zipFile' }) || null;
  const nama = useWatch({ control, name: 'nama' }) || '';
  const nrp = useWatch({ control, name: 'nrp' }) || '';
  const kelompokKP = useWatch({ control, name: 'kelompokKP' }) || '';
  const q1 = useWatch({ control, name: 'q1' }) || '';
  const q2 = useWatch({ control, name: 'q2' }) || '';
  const q3 = useWatch({ control, name: 'q3' }) || '';

  const errorMap = React.useMemo(() => {
    if (isNavigating) return {} as Record<string, string>;
    const errs = (methods.formState?.errors || {}) as any;
    const map: Record<string, string> = {};
    const extractMsg = (v: any) => {
      if (!v && v !== 0) return undefined;
      if (typeof v === 'string') return v;
      if (v?.message && typeof v.message === 'string' && v.message.length)
        return v.message;
      if (Array.isArray(v?._errors) && v._errors.length)
        return String(v._errors[0]);
      return undefined;
    };
    const push = (k: string, v: any) => {
      const msg = extractMsg(v);
      if (typeof msg === 'string' && msg.length) map[k] = msg;
    };
    const keyBelongsToStep = (key: string) => {
      const baseKeys = new Set([
        'nama',
        'nrp',
        'kelompokKP',
        'q1',
        'q2',
        'q3',
        'zipFile',
        'selectedDivisions',
      ]);
      if (baseKeys.has(key)) return 2;
      const m = key.match(/^divisionAnswers\.([^.]+)(?:\.|$)/);
      if (m && m[1]) {
        const divId = m[1];
        const idx = (selectedDivisions || []).indexOf(divId);
        if (idx >= 0) return 3 + idx;
        return 3;
      }
      return 0;
    };
    const maybePush = (key: string, v: any) => {
      const step = keyBelongsToStep(key);
      if (step && clearedSteps.includes(step)) return;
      push(key, v);
    };
    maybePush('nama', errs?.nama);
    maybePush('nrp', errs?.nrp);
    maybePush('kelompokKP', errs?.kelompokKP);
    maybePush('q1', errs?.q1);
    maybePush('q2', errs?.q2);
    maybePush('q3', errs?.q3);
    maybePush('zipFile', errs?.zipFile);
    maybePush('selectedDivisions', errs?.selectedDivisions);
    const de = errs?.divisionAnswers;
    if (de && typeof de === 'object') {
      Object.keys(de).forEach((divId) => {
        const obj = de[divId];
        if (obj && typeof obj === 'object') {
          (['q1', 'q2', 'q3', 'q4', 'q5'] as const).forEach((k) => {
            maybePush(`divisionAnswers.${divId}.${k}`, obj?.[k]);
          });
        } else {
          maybePush(`divisionAnswers.${divId}`, de[divId]);
        }
      });
    }
    Object.keys(map).forEach((k) => {
      if (/^divisionAnswers\./.test(k) && map[k] === 'Invalid input') {
        map[k] = 'Belum diisi';
      }
    });
    try {
      const isSubmitted = !!methods.formState?.isSubmitted;
      if (isSubmitted && Array.isArray(selectedDivisions)) {
        for (const divId of selectedDivisions) {
          (['q1', 'q2', 'q3', 'q4', 'q5'] as const).forEach((k) => {
            const key = `divisionAnswers.${divId}.${k}`;
            const val =
              divisionAnswers && divisionAnswers[divId]
                ? divisionAnswers[divId][k]
                : undefined;
            const isEmpty =
              val === undefined || val === null || String(val).trim() === '';
            if (!map[key] && isEmpty) {
              if (Object.keys(errs || {}).length > 0) {
                map[key] = 'Belum diisi';
              }
            }
          });
        }
      }
    } catch (err) {
      void err;
    }
    return map;
  }, [
    methods.formState?.errors,
    methods.formState?.isSubmitted,
    isNavigating,
    clearedSteps,
    selectedDivisions,
    divisionAnswers,
  ]);

  // React to errorMap changes if needed; no-op effect kept intentionally for future.
  React.useEffect(() => {
    void errorMap;
  }, [errorMap]);

  React.useEffect(() => {
    try {
      localStorage.setItem('magang:clearedSteps', JSON.stringify(clearedSteps));
    } catch (err) {
      void err;
    }
  }, [clearedSteps]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('magang:clearedSteps');
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) setClearedSteps(parsed);
      }
    } catch (err) {
      void err;
    }
  }, []);

  const errorSteps = React.useMemo(() => {
    const set = new Set<number>();
    Object.keys(errorMap).forEach((k) => {
      const baseKeys = new Set([
        'nama',
        'nrp',
        'kelompokKP',
        'q1',
        'q2',
        'q3',
        'zipFile',
        'selectedDivisions',
      ]);
      if (baseKeys.has(k)) set.add(2);
      const m = k.match(/^divisionAnswers\.([^.]+)(?:\.|$)/);
      if (m && m[1]) {
        const idx = (selectedDivisions || []).indexOf(m[1]);
        set.add(idx >= 0 ? 3 + idx : 3);
      }
    });
    return set;
  }, [errorMap, selectedDivisions]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const preSel = loadSelectedDivisions();
        const preAns = loadDivisionAnswers();
        const preBase = loadBase();
        const persistedState = loadFormState();
        if (persistedState) setFormState(persistedState as any);
        if (preSel && preSel.length)
          setValue('selectedDivisions', preSel, { shouldDirty: false });
        if (preAns && Object.keys(preAns).length)
          setValue('divisionAnswers', preAns as any, { shouldDirty: false });
        if (preBase) {
          setValue('nama', preBase.nama, { shouldDirty: false });
          setValue('nrp', preBase.nrp, { shouldDirty: false });
          setValue('kelompokKP', preBase.kelompokKP, { shouldDirty: false });
          setValue('q1', preBase.q1, { shouldDirty: false });
          setValue('q2', preBase.q2, { shouldDirty: false });
          setValue('q3', preBase.q3, { shouldDirty: false });
        }

        try {
          const f = await loadZipFile();
          if (f) {
            setValue('zipFile', f as any, { shouldDirty: false });
          }
        } catch (err) {
          void err;
        }
      } catch (err) {
        void err;
      }

      if (mounted) setIsReady(true);
    })();

    return () => {
      mounted = false;
    };
  }, [setValue]);

  React.useEffect(() => {
    if (formState === 'success') {
      try {
        const totalSteps = 1 + 1 + selectedDivisions.length + 1;
        setCurrentStep(totalSteps);
      } catch (err) {
        void err;
      }
    }
  }, [formState, selectedDivisions.length]);

  const handleDivisionAnswersChange = React.useCallback(
    (
      divisionId: string,
      next: { q1?: string; q2?: string; q3?: string; q4?: string; q5?: string },
    ) => {
      const merged = { ...(divisionAnswers || {}), [divisionId]: next } as any;
      setValue('divisionAnswers', merged, {
        shouldDirty: true,
        shouldValidate: false,
      });
      saveDivisionAnswers(merged);
    },
    [divisionAnswers, setValue],
  );

  const nextStep = React.useCallback(() => {
    const totalSteps = 1 + 1 + selectedDivisions.length + 1;
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsNavigating(true);
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  }, [selectedDivisions.length]);

  React.useEffect(() => {
    saveSelectedDivisions(selectedDivisions);
  }, [selectedDivisions]);

  const handleResetAll = React.useCallback(async () => {
    clearAllLocal();
    await clearZipFile();
    reset({
      nama: '',
      nrp: '',
      kelompokKP: '',
      q1: '',
      q2: '',
      q3: '',
      zipFile: null as any,
      selectedDivisions: [],
      divisionAnswers: {},
    });
    try {
      clearErrors();
    } catch (err) {
      void err;
    }
    try {
      setClearedSteps([]);
    } catch (err) {
      void err;
    }
    setCurrentStep(1);
  }, [reset, clearErrors]);

  const handlePerStepReset = React.useCallback(
    async (step: number) => {
      const totalSteps = 1 + 1 + selectedDivisions.length + 1;
      if (step <= 1) return;
      if (step === totalSteps) {
        await handleResetAll();
        return;
      }
      if (step === 2) {
        resetField('nama');
        resetField('nrp');
        resetField('kelompokKP');
        resetField('q1');
        resetField('q2');
        resetField('q3');
        setValue('zipFile', null as any, { shouldDirty: true });
        await clearZipFile();
        setValue('selectedDivisions', [], { shouldDirty: true });
        saveSelectedDivisions([]);
        setValue('divisionAnswers', {}, { shouldDirty: true });
        saveDivisionAnswers({});
        try {
          clearErrors([
            'nama',
            'nrp',
            'kelompokKP',
            'q1',
            'q2',
            'q3',
            'zipFile',
            'selectedDivisions',
            'divisionAnswers',
          ]);
        } catch (err) {
          void err;
        }
        setCurrentStep(2);
        setClearedSteps((prev) => Array.from(new Set([...prev, 2])));
        return;
      }
      const idx = step - 3;
      if (idx >= 0 && idx < selectedDivisions.length) {
        const divId = selectedDivisions[idx];
        const next = { ...(divisionAnswers || {}) } as any;
        next[divId] = {};
        setValue('divisionAnswers', next, { shouldDirty: true });
        saveDivisionAnswers(next);
        try {
          clearErrors([
            `divisionAnswers.${divId}.q1`,
            `divisionAnswers.${divId}.q2`,
            `divisionAnswers.${divId}.q3`,
            `divisionAnswers.${divId}.q4`,
            `divisionAnswers.${divId}.q5`,
            `divisionAnswers.${divId}`,
          ]);
        } catch (err) {
          void err;
        }
        setCurrentStep(step);
        setClearedSteps((prev) => Array.from(new Set([...prev, step])));
      }
    },
    [
      divisionAnswers,
      handleResetAll,
      resetField,
      selectedDivisions,
      setValue,
      clearErrors,
    ],
  );

  const onSubmit = React.useCallback(
    async (data: MagangFormValues) => {
      const payload = {
        nama: data.nama,
        nrp: data.nrp,
        kelompokKP: data.kelompokKP,
        umum: { q1: data.q1, q2: data.q2, q3: data.q3 },
        selectedDivisions,
        divisionAnswers,
        zipFile: (data.zipFile as unknown as File) || null,
      };
      setSubmissionOpen(true);
      setSubmissionStatus('loading');
      setSubmissionErrorMsg('');
      setLastPayload(payload as any);

      try {
        mutate(payload as any);
      } catch (err) {
        void err;
      }
    },
    [mutate, selectedDivisions, divisionAnswers],
  );

  const handleResetFormState = React.useCallback(async () => {
    try {
      clearFormState();
      setFormState(null);
      await handleResetAll();
    } catch (err) {
      void err;
    }
  }, [handleResetAll]);

  const handleStepperReset = React.useCallback(
    async (step: number) => {
      const totalSteps = 1 + 1 + selectedDivisions.length + 1;
      if (step === totalSteps) {
        await handleResetFormState();
        return;
      }
      await handlePerStepReset(step);
    },
    [handlePerStepReset, handleResetFormState, selectedDivisions.length],
  );

  const onInvalid = React.useCallback(
    (errs: any) => {
      // no-op: placeholder for potential pre-validation side-effects
      let targetStep = 2;
      const divisionErrs = errs?.divisionAnswers;
      if (divisionErrs && typeof divisionErrs === 'object') {
        for (let i = 0; i < selectedDivisions.length; i++) {
          const divId = selectedDivisions[i];
          if (divisionErrs[divId]) {
            targetStep = 3 + i;
            break;
          }
        }
      }
      setIsNavigating(false);
      skipSetIsNavigatingRef.current = true;
      setCurrentStep(targetStep);

      const baseFields = [
        'nama',
        'nrp',
        'kelompokKP',
        'q1',
        'q2',
        'q3',
      ] as const;
      for (const f of baseFields) {
        if (errs?.[f]) {
          try {
            setFocus(f as any);
          } catch (err) {
            void err;
          }
          break;
        }
      }
      try {
        const el = document.getElementById(formId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (err) {
        void err;
      }
    },
    [formId, selectedDivisions, setFocus],
  );

  if (!isReady) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center bg-black'>
        <div className='flex flex-col items-center gap-4 px-6 py-8'>
          <svg
            className='h-12 w-12 animate-spin text-blue-500'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              fill='none'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
          <div className='text-center'>
            <p className='font-satoshi text-lg font-semibold text-white'>
              Memuat data...
            </p>
            <p className='font-satoshi text-sm text-white/80'>
              Mohon tunggu sebentar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full'>
      <div
        className='absolute inset-0 -z-10 w-full bg-black'
        style={{ minHeight: '100%' }}
      >
        <DotGrid
          dotSize={6}
          gap={18}
          baseColor='#1C1C1C'
          activeColor='#0040FF'
          proximity={140}
          shockRadius={250}
          shockStrength={8}
          resistance={1000}
          returnDuration={4}
          className='min-h-full !p-0'
        />
      </div>

      <div className='relative z-10 flex min-h-screen w-full items-center justify-center'>
        <main className='relative w-full max-w-5xl px-5 py-12 max-sm:px-0 md:px-8 md:py-8'>
          <Card className='border-0 bg-transparent'>
            <CardContent className='pt-6'>
              <FormProvider {...methods}>
                <form
                  id={formId}
                  onSubmit={handleSubmit(onSubmit as any, onInvalid as any)}
                  noValidate
                >
                  <Stepper
                    className='sm:px-0'
                    initialStep={1}
                    activeStep={currentStep}
                    onStepChange={(s) => {
                      if (skipSetIsNavigatingRef.current) {
                        skipSetIsNavigatingRef.current = false;
                        setCurrentStep(s);
                        return;
                      }
                      // Scroll to top of page smoothly
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsNavigating(true);
                      setCurrentStep(s);
                    }}
                    onSlideComplete={() => {
                      setIsNavigating(false);
                      if (pendingFocus) {
                        try {
                          if (pendingFocus.field)
                            setFocus(pendingFocus.field as any);
                        } catch (err) {
                          void err;
                        }
                        setPendingFocus(null);
                      }
                    }}
                    renderStepIndicator={({
                      step,
                      currentStep,
                      onStepClick,
                    }) => {
                      const isError = errorSteps.has(step);
                      const isCleared = clearedSteps.includes(step);
                      return (
                        <button
                          key={step}
                          type='button'
                          onClick={() => {
                            if (formState === 'success') return;
                            setIsNavigating(true);
                            onStepClick(step);
                          }}
                          className={`relative outline-none focus:outline-none ${
                            formState === 'success'
                              ? 'cursor-not-allowed opacity-70'
                              : 'cursor-pointer'
                          }`}
                          aria-label={`Step ${step}`}
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-satoshi font-semibold shadow-sm backdrop-blur ${
                              currentStep === step
                                ? 'bg-[#3b82f6]/35 text-white'
                                : isCleared
                                  ? 'bg-white/10 text-white/60'
                                  : 'bg-white/6 text-white/80'
                            }`}
                          >
                            {step}
                          </div>
                          {isError && !isCleared && (
                            <span className='absolute -top-2 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-satoshi text-[10px] font-bold text-white'>
                              !
                            </span>
                          )}
                        </button>
                      );
                    }}
                    backButtonProps={{
                      disabled: formState === 'success',
                      'aria-disabled': formState === 'success',
                      style:
                        formState === 'success' ? { opacity: 0.5 } : undefined,
                    }}
                    nextButtonText={
                      currentStep === 1 ? 'Isi Formulir' : 'Lanjut'
                    }
                    backButtonText='Kembali'
                    finalButtonText='Kirim Lamaran'
                    onReset={handleStepperReset}
                    resetButtonText='Reset'
                    finalAsSubmit={false}
                    onBeforeComplete={() => {
                      if (formState === 'success') return false;
                      try {
                        const submit = handleSubmit(
                          onSubmit as any,
                          onInvalid as any,
                        );
                        submit();
                      } catch (err) {
                        void err;
                      }
                      return false;
                    }}
                    nextButtonProps={{
                      disabled: formState === 'success',
                      'aria-disabled': formState === 'success',
                      style:
                        formState === 'success' ? { opacity: 0.5 } : undefined,
                    }}
                    stepCircleContainerClassName='bg-white/0'
                    contentClassName='pt-2'
                  >
                    <Step>
                      <HMTCIntroductionStep onNext={nextStep} />
                    </Step>
                    <Step>
                      <ApplyMagangFormStep
                        onSubmitSuccess={() => {}}
                        onSubmitError={() => {}}
                        submitFn={async () => {}}
                      />
                    </Step>

                    {selectedDivisions.map((divId) => {
                      const info = DIVISIONS.find((d) => d.id === divId);
                      if (!info) return null;
                      return (
                        <Step key={`division-${divId}`}>
                          <DivisionQuestionStep
                            divisionId={divId}
                            divisionName={info.name}
                            onChange={handleDivisionAnswersChange}
                          />
                        </Step>
                      );
                    })}

                    <Step>
                      <ReviewStep
                        formData={{
                          nama,
                          nrp,
                          kelompokKP,
                          file_zip: zipFile as any,
                          generalAnswers: { q1, q2, q3 },
                          selectedDivisions,
                          divisionAnswers,
                        }}
                        divisions={DIVISIONS}
                        errors={errorMap}
                        onSubmit={nextStep}
                        formState={formState}
                      />
                    </Step>
                  </Stepper>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </main>
        <Dialog
          open={submissionOpen}
          onOpenChange={(v) => {
            if (!v) {
              setSubmissionOpen(false);
              setSubmissionStatus('idle');
              setSubmissionErrorMsg('');
            }
            setSubmissionOpen(v);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='inline-flex items-center gap-2'>
                {submissionStatus === 'loading' && (
                  <svg
                    className='h-5 w-5 animate-spin text-blue-600'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                    />
                  </svg>
                )}
                {submissionStatus === 'success' && (
                  <CheckCircle2 className='h-5 w-5 text-green-600' />
                )}
                {submissionStatus === 'error' && (
                  <TriangleAlert className='h-5 w-5 text-red-600' />
                )}
                {submissionStatus === 'loading'
                  ? 'Mengirim...'
                  : submissionStatus === 'success'
                    ? 'Berhasil'
                    : 'Gagal Mengirim'}
              </DialogTitle>
              <DialogDescription>
                <span className='font-satoshi text-black'>
                  {submissionStatus === 'loading' &&
                    'Mohon tunggu, data Anda sedang dikirim.'}
                  {submissionStatus === 'success' &&
                    'Pendaftaran magang Anda berhasil dikirim.'}
                  {submissionStatus === 'error' &&
                    (submissionErrorMsg ||
                      'Terjadi kesalahan saat mengirim data. Coba lagi nanti.')}
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {submissionStatus === 'loading' ? (
                <DialogCancel
                  onClick={() => {
                    setSubmissionOpen(false);
                    setSubmissionStatus('idle');
                  }}
                >
                  Batal
                </DialogCancel>
              ) : submissionStatus === 'success' ? (
                <DialogAction
                  onClick={async () => {
                    await handleResetAll();
                    setSubmissionOpen(false);
                    setSubmissionStatus('idle');
                  }}
                >
                  Tutup
                </DialogAction>
              ) : (
                <DialogAction
                  onClick={() => {
                    setSubmissionStatus('loading');
                    setSubmissionErrorMsg('');
                    try {
                      mutate(lastPayload as any);
                    } catch (err) {
                      void err;
                    }
                  }}
                >
                  Coba Lagi
                </DialogAction>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='inline-flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-green-600' /> Berhasil
              </DialogTitle>
              <DialogDescription>
                <span className='font-satoshi text-black'>
                  Pendaftaran magang Anda berhasil dikirim.
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogAction
                onClick={async () => {
                  await handleResetAll();
                  setOpenSuccess(false);
                }}
              >
                Tutup
              </DialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={openError} onOpenChange={setOpenError}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='inline-flex items-center gap-2'>
                <TriangleAlert className='h-5 w-5 text-red-600' /> Gagal
                Mengirim
              </DialogTitle>
              <DialogDescription>
                <span className='font-satoshi text-black'>
                  {errorMsg ||
                    'Terjadi kesalahan saat mengirim data. Coba lagi nanti.'}
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogCancel onClick={() => setOpenError(false)}>
                Tutup
              </DialogCancel>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
