'use client';
import React, { useState, useEffect } from 'react';
import ClosedPopup from './closed-popup/closed-popup';
import OpenPopup from './open-popup/open-popup';
import Cookies from 'js-cookie';
import { useApp } from '@/contexts/AppContext';
import { validateRecaptcha } from '@/utils/recaptcha-functions';
import { newsletterSubmission } from '@/utils/newsletter-functions';
import { EReCAPTCHA } from '@/const/reCapcha';
import LocalStorage from '@/classes/localStorage';

const DiscountPopup = () => {
  const { updateCustomerDetails, user } = useApp();
  // cookies
  const [hidden, setHidden] = useState(!!Cookies.get('hide_popup'));
  const [seen, setSeen] = useState(!!Cookies.get('seen_popup'));
  const [recaptchaModalOpen, setRecaptchaModalOpen] = useState(false);
  // modal states
  const [openDiscount, setOpenDiscount] = useState(false);
  const [open, setOpen] = useState(false);
  // input values
  const [email, setEmail] = useState('');
  // form data
  const [formData, setFormData] = useState(new FormData());
  // error states
  const [pendingError, setPendingError] = useState('');
  const [error, setError] = useState('');
  // generated
  const [code, setCode] = useState('');
  // process states
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  // loading
  const [popupLoading, setPopupLoading] = useState(true);
  // Popupdetails
  const [popupDetails, setPopupDetails] = useState({
    title: '',
    description: '',
    valueFixed: 0,
    valueType: '',
  });

  const processCookies = (name: string, submitted?: string) => {
    Cookies.set(name, 'true', { expires: submitted === 'submitted' ? 365 : 7 });
  };

  function onFormSuccess(
    data: { message: string; code: string },
    email: FormDataEntryValue
  ) {
    processCookies('seen_popup', 'submitted');
    processCookies('hide_popup', 'submitted');
    localStorage.setItem('scCode', data.code);
    localStorage.setItem('scEmail', email.toString());
    setCode(data.code);
    setSubmitted(true);
    setLoading(false);
    console.log('SUCCESS:', data.message, 'for', email);
  }

  function onFormError(error: string) {
    console.error('ERROR:', error);
    if (
      error ===
      'Newsletter coupon validation failed with the following error: newsletter coupon has reached its usage limit of 1'
    ) {
      processCookies('seen_popup', 'submitted');
      processCookies('hide_popup', 'submitted');
    }
    setError(error);
    setLoading(false);
  }

  function onRecaptchaSuccess() {
    setError('');
    setPendingError('');
    setRecaptchaToken('');
    newsletterSubmission({
      formData,
      onFormSuccess,
      onFormError,
    });
  }

  function onRecaptchaError(error: string) {
    setRecaptchaModalOpen(true);
    setPendingError(error);
  }

  function onRecaptchaChallengeError() {
    onFormError(pendingError);
  }

  function onRecaptchaValidate(token: string, emailFormData: FormData) {
    const scoreThreshold = EReCAPTCHA.RECAPTCHA_SCORE;
    setFormData(emailFormData);
    validateRecaptcha({
      token,
      scoreThreshold,
      onRecaptchaSuccess,
      onRecaptchaError,
      email,
    });
  }

  const refresh = () => {
    setError('');
    setLoading(false);
  };

  const togglePopup = () => {
    if (!seen) {
      processCookies('seen_popup');
      setSeen(true);
    }
    setOpen(open ? false : true);
  };

  function toggleDiscount() {
    if (!hidden) {
      processCookies('hide_popup');
      setHidden(true);
    }
    setOpenDiscount(openDiscount ? false : true);
  }

  useEffect(() => {
    if (!seen) {
      setOpen(true);
    }
  }, [seen]);

  useEffect(() => {
    if (formData && formData.get('email') && recaptchaToken.length > 0) {
      onRecaptchaValidate(recaptchaToken, formData);
    }
  }, [formData && recaptchaToken.length]);

  useEffect(() => {
    const user = localStorage.getItem('scUserId');

    if (user === 'null' && !hidden) {
      if (!LocalStorage.getUserLoggedIn()) {
        setOpenDiscount(true);
      }
    } else {
      setOpenDiscount(false);
    }
    setTimeout(() => {
      setPopupLoading(false);
    }, 1000);
  }, [user]);

  useEffect(() => {
    if (openDiscount && popupDetails.valueFixed === 0) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/public/active-coupon-endpoints`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw data.error;
          } else {
            if (data?.data?.newsletter) {
              const newsletter = data?.data?.newsletter;
              setPopupDetails({
                ...popupDetails,
                title: newsletter?.title,
                description: newsletter?.description,
                valueFixed: newsletter?.valueFixed,
                valueType: newsletter?.valueType,
              });
            }
          }
        })
        .catch((error) => {
          onFormError(error);
        });
    }
  }, [openDiscount, popupDetails.valueFixed]);

  if (
    user ||
    popupLoading ||
    popupDetails.title.length < 1 ||
    popupDetails.description.length < 1 ||
    popupDetails.valueFixed < 1 ||
    popupDetails.valueType.length < 1
  ) {
    return null;
  } else {
    return open ? (
      <>
        <OpenPopup
          updateCustomerDetails={updateCustomerDetails}
          email={email}
          setEmail={setEmail}
          formData={formData}
          setFormData={setFormData}
          togglePopup={togglePopup}
          submitted={submitted}
          open={open}
          loading={loading}
          setLoading={setLoading}
          error={error}
          refresh={refresh}
          code={code}
          copied={copied}
          setCopied={setCopied}
          recaptchaModalOpen={recaptchaModalOpen}
          setRecaptchaModalOpen={setRecaptchaModalOpen}
          setRecaptchaToken={setRecaptchaToken}
          onRecaptchaSuccess={onRecaptchaSuccess}
          onRecaptchaChallengeError={onRecaptchaChallengeError}
          title={popupDetails.title}
          discount={popupDetails.valueFixed}
          discountType={popupDetails.valueType}
          description={popupDetails.description}
        />
      </>
    ) : (
      !!openDiscount && (
        <ClosedPopup
          toggleDiscount={toggleDiscount}
          togglePopup={togglePopup}
          value={popupDetails.valueFixed}
          type={popupDetails.valueType}
        />
      )
    );
  }
};

export default DiscountPopup;
