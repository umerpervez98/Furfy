import React, { Dispatch, SetStateAction } from 'react';
import styles from './recaptcha-modal.module.scss';
import RecaptchaCheckPoint from './recaptcha-check-point/recaptcha-check-point';

// Add Additional JSX Elements here for different random checks

interface RecaptchaModalProps {
  onRecaptchaSuccess: () => void;
  onRecaptchaChallengeError: () => void;
  setRecaptchaModalOpen: Dispatch<SetStateAction<boolean>>;
};

const RecaptchaModal = ({
  onRecaptchaSuccess,
  onRecaptchaChallengeError,
  setRecaptchaModalOpen,
}: RecaptchaModalProps) => {
  const checkList: React.JSX.Element[] = [
    <RecaptchaCheckPoint
      key="recaptcha-checkpoint"
      handleSuccess={onRecaptchaSuccess}
      handleError={onRecaptchaChallengeError}
      handleClose={setRecaptchaModalOpen}
    />,
  ];

  const generateCheck = () => {
    return checkList[Math.floor(Math.random() * checkList.length)] || 'loading';
  };

  return <div className={styles['recaptcha-modal']}>{generateCheck()}</div>;
};

export default RecaptchaModal;

