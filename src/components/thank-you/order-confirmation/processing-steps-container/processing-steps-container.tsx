'use client';

import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button, HeadingSecondary } from '@/components/shared/index.shared';
import {
  GreenTick,
  GreenSpinner,
} from '@/components/Checkout/index.checkout';
import styles from './processing-steps-container.module.scss';
import type { SubmitState } from '@/types/index.types';

type ProcessingStepsContainerProps = {
  resetProcess: () => void;
  setShowReceipt: Dispatch<SetStateAction<boolean>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setStepList: Dispatch<
    SetStateAction<
      (
        | {
          show: boolean;
          success: boolean;
          text: string;
          error?: undefined;
        }
        | {
          show: boolean;
          success: boolean;
          text: string;
          error: {
            title: string;
            details: string;
          };
        }
      )[]
    >
  >;
  error: string | null;
  submitState: SubmitState;
  currentStep: number;
  stepList: (
    | {
      show: boolean;
      success: boolean;
      text: string;
      error?: undefined;
    }
    | {
      show: boolean;
      success: boolean;
      text: string;
      error: {
        title: string;
        details: string;
      };
    }
  )[];
};

const ProcessingStepsContainer = ({
  resetProcess,
  setShowReceipt,
  setCurrentStep,
  setStepList,
  error,
  submitState,
  currentStep,
  stepList,
}: ProcessingStepsContainerProps) => {
  const router = useRouter();
  const { logoutUser } = useCart();

  useEffect(() => {
    let intervalId: number;

    if (currentStep < stepList.length) {
      const newList = stepList;

      if (submitState !== 'fail') {
        intervalId = window.setInterval(() => {
          newList[currentStep].success = true;
          if (newList[currentStep + 1]) {
            newList[currentStep + 1].show = true;
          }
          setCurrentStep(currentStep + 1);
          setStepList(newList);
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      } else if (submitState === 'fail') {
        setCurrentStep(currentStep + 1);
      }
    } else if (submitState === 'success') {
      setTimeout(() => {
        setShowReceipt(true);
      }, 500);
    }
  }, [currentStep, submitState]);
  return (
    <div className={styles.div}>
      <HeadingSecondary style={{ fontWeight: 700 }}>
        placing order
      </HeadingSecondary>
      {(submitState !== 'fail' || currentStep < 2) && (
        <ul>
          {stepList.map((step, index) => {
            if (step.show) {
              return (
                <li key={index}>
                  {step.success ? (
                    <GreenTick style={{ fontSize: '2.3rem' }} />
                  ) : (
                    <GreenSpinner />
                  )}
                  <span className={styles.text}>{step.text}</span>
                </li>
              );
            }
          })}
        </ul>
      )}
      {submitState === 'fail' && currentStep >= 2 && (
        <>
          <HeadingSecondary
            style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
          >
            sorry about this
          </HeadingSecondary>
          <p className={styles['fail-message']}>
            {error ||
              'There was an error while processing your payment. Please try again.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ width: '35rem' }}
              onClick={async () => {
                if (
                  error ===
                  'Your session has expired due to inactivity. For your security, please log in again to continue.'
                ) {
                  logoutUser();
                }
                await router.push('/checkout');
                resetProcess();
              }}
            >
              return to checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProcessingStepsContainer;
