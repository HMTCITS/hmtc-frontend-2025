'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';
import React, {
  Children,
  HTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onReset'> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  /**
   * Called when user clicks the final action (last step). Return false to prevent completing.
   * If it returns a Promise, completion waits for its resolution.
   */
  onBeforeComplete?: () => Promise<boolean> | boolean;
  /** Called after the slide transition for a step finishes (center animation) */
  onSlideComplete?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  /**
   * Custom text for the final action button on the last step. Defaults to 'Complete'.
   */
  finalButtonText?: string;
  /**
   * Optional reset button and callback; when provided, a Reset button is rendered next to Next/Final button.
   */
  onReset?: (step: number) => void;
  resetButtonText?: string;
  /**
   * When true, the final button will be a submit button for a parent <form> and won't call onBeforeComplete.
   */
  finalAsSubmit?: boolean;
  /**
   * Optional controlled active step. When provided the Stepper will sync to this value.
   */
  activeStep?: number;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeComplete: _onBeforeComplete,
  onSlideComplete,
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  finalButtonText = 'Complete',
  onReset,
  resetButtonText = 'Reset',
  disableStepIndicators = false,
  finalAsSubmit = false,
  activeStep,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const [locked, setLocked] = useState(false);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  // If parent provides a controlled `activeStep`, use it for rendering
  // decisions (isLastStep/isCompleted). This prevents a render mismatch
  // where the Stepper footer incorrectly treats the button as submit
  // before the controlled value has synced into internal state.
  const activeIndex = typeof activeStep === 'number' ? activeStep : currentStep;
  const isCompleted = activeIndex > totalSteps;
  const isLastStep = activeIndex === totalSteps;

  React.useEffect(() => {
    // footer-level debug info
    // Keep this log lightweight and only when relevant values change
    // (helps trace when the footer decides to be a submit button)
    // debug logs removed
  }, [activeIndex, isLastStep, totalSteps]);

  // clear lock when activeIndex changes (user navigated) or when totalSteps changes
  React.useEffect(() => {
    setLocked(false);
  }, [activeIndex, totalSteps]);

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  // If parent controls the active step, sync to it.
  React.useEffect(() => {
    if (typeof activeStep === 'number' && activeStep !== currentStep) {
      setDirection(activeStep > currentStep ? 1 : -1);
      setCurrentStep(activeStep);
      // notify parent as well (keeps callbacks consistent)
      if (activeStep > totalSteps) {
        onFinalStepCompleted();
      } else {
        onStepChange(activeStep);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, totalSteps]);

  const handleBack = () => {
    if (locked) return; // ignore while locked
    if (activeIndex > 1) {
      setDirection(-1);
      setLocked(true);
      updateStep(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (locked) return; // prevent double clicks
    if (!isLastStep) {
      setDirection(1);
      setLocked(true);
      updateStep(activeIndex + 1);
    }
  };

  // Note: final completion path is handled by parent via finalAsSubmit or onBeforeComplete when needed.

  return (
    <div
      className='flex min-h-full flex-1 flex-col items-center justify-center p-4'
      {...rest}
    >
      <div className={`mx-auto w-full ${stepCircleContainerClassName}`}>
        <div
          className={`${stepContainerClassName} flex w-full items-center rounded-2xl border-1 border-blue-400/15 bg-blue-500/5 p-8 shadow-xl backdrop-blur-xs`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className='mt-6 w-full rounded-2xl border-1 border-blue-400/15 bg-blue-500/5 p-8 md:px-4 max-sm:px-2 shadow-xl backdrop-blur-xs'>
          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={activeIndex}
            direction={direction}
            className={`space-y-2 px-8 ${contentClassName}`}
            onSlideComplete={() => {
              // clear local navigation lock when slide completes
              setLocked(false);
              try {
                onSlideComplete?.();
              } catch (err) {
                void err;
              }
            }}
          >
            {stepsArray[activeIndex - 1]}
          </StepContentWrapper>

          {!isCompleted && (
            <div
              className={`px-8 pb-8 ${footerClassName} ${currentStep === 1 ? 'hidden' : ''}`}
            >
              <div
                className={`mt-10 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}
              >
                {activeIndex !== 1 && (
                  <button
                    type='button'
                    data-stepper-back
                    onClick={handleBack}
                    className={`cursor-pointer rounded px-2 py-1 transition duration-350 ${
                      currentStep === 1
                        ? 'pointer-events-none text-blue-300/60 opacity-50'
                        : 'text-blue-200 hover:text-blue-50'
                    }`}
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                )}
                <div className='flex items-center gap-3'>
                  {onReset && (
                    <button
                      type='button'
                      onClick={() => onReset(currentStep)}
                      className='cursor-pointer rounded px-2 py-1 text-blue-200 transition duration-350 hover:text-blue-50'
                    >
                      {resetButtonText}
                    </button>
                  )}
                  {/* Always render the next button in the DOM so external callers can programmatically click it (e.g. intro CTA). */}
                  {/* Footer debug log is emitted via useEffect to avoid emitting void in JSX */}
                  <button
                    data-stepper-next
                    type={isLastStep && finalAsSubmit ? 'submit' : 'button'}
                    onClick={async (e) => {
                      if (locked) {
                        e.preventDefault();
                        return;
                      }

                      if (isLastStep) {
                        // If consumer wants a native submit button, let it run
                        if (finalAsSubmit) {
                          setLocked(true);
                          return;
                        }

                        // Otherwise, if an onBeforeComplete hook is provided,
                        // call it and only advance/complete when it returns truthy.
                        if (typeof _onBeforeComplete === 'function') {
                          try {
                            setLocked(true);
                            const res = _onBeforeComplete();
                            const ok = await Promise.resolve(res as any);
                            setLocked(false);
                            if (ok) {
                              // proceed to mark as completed
                              updateStep(activeIndex + 1);
                            }
                          } catch {
                            setLocked(false);
                          }
                          return;
                        }

                        // No special handling: just advance as default
                        setDirection(1);
                        setLocked(true);
                        updateStep(activeIndex + 1);
                        return;
                      }

                      // normal navigation
                      handleNext();
                    }}
                    disabled={locked}
                    aria-disabled={locked}
                    className={`flex cursor-pointer items-center justify-center rounded-lg bg-blue-500/30 px-3.5 py-1.5 font-medium tracking-tight text-white shadow-[0_10px_30px_-10px_rgba(46,106,247,0.55)] backdrop-blur-sm transition duration-350 hover:bg-blue-500/40 active:bg-blue-600/40 ${
                      locked ? 'pointer-events-none opacity-60' : ''
                    }`}
                    {...nextButtonProps}
                  >
                    {isLastStep ? finalButtonText : nextButtonText}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
  onSlideComplete?: () => void;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = '',
  onSlideComplete,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode='sync' custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
            onSlideComplete={onSlideComplete}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
  onSlideComplete?: () => void;
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
  onSlideComplete,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [interactive, setInteractive] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{ duration: 0.4 }}
      onAnimationComplete={(definition) => {
        try {
          if (definition === 'center') {
            // This slide has finished entering and is the active content.
            setInteractive(true);
            onSlideComplete?.();
          } else {
            // For non-center phases (enter/exit) don't allow pointer events
            setInteractive(false);
          }
        } catch (err) {
          void err;
        }
      }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      <div aria-hidden={!interactive}>{children}</div>
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0,
  }),
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className='px-8 max-sm:px-2 md:px-4'>{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? 'active'
      : currentStep < step
        ? 'inactive'
        : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className='relative cursor-pointer outline-none focus:outline-none'
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          // Blue glass-style indicators
          inactive: {
            scale: 1,
            backgroundColor: 'rgba(30, 58, 138, 0.15)', // blue-900 tint
            color: 'rgba(219, 234, 254, 0.8)', // blue-100 text
          },
          active: {
            scale: 1,
            backgroundColor: 'rgba(59, 130, 246, 0.35)', // blue-500 tint
            color: '#ffffff',
          },
          complete: {
            scale: 1,
            backgroundColor: 'rgba(37, 99, 235, 0.95)', // blue-600 solid
            color: '#ffffff',
          },
        }}
        transition={{ duration: 0.3 }}
        className='flex h-8 w-8 items-center justify-center rounded-full font-semibold shadow-sm backdrop-blur'
      >
        {status === 'complete' ? (
          <CheckIcon className='h-4 w-4 text-white' />
        ) : status === 'active' ? (
          <div className='h-3 w-3 rounded-full bg-white' />
        ) : (
          <span className='text-sm'>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    // Blue glass style: animate fill from faint blue to solid blue
    incomplete: { width: 0, backgroundColor: 'rgba(59, 130, 246, 0.25)' }, // blue-500/25
    complete: { width: '100%', backgroundColor: 'rgba(37, 99, 235, 0.9)' }, // blue-600/90
  };

  return (
    <div className='relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-blue-500/20'>
      <motion.div
        className='absolute top-0 left-0 h-full'
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      viewBox='0 0 24 24'
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        }}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 13l4 4L19 7'
      />
    </svg>
  );
}
