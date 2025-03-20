'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import {
  Input,
  Label,
  FormRow,
  PhoneVerificationContainer,
  GreenTick,
  GreenSpinner,
  ValidatedAddressContainer,
  PhoneInputField,
} from '../../index.checkout';
import {
  GreyOverlay,
  HeadingSecondary,
} from '@/components/shared/index.shared';
import {
  authWithMethod,
  sendAuthCodeByCustomerToken,
  verifyAuthCodeWithCustomerToken,
  verifyPhone,
} from '@/services/auth-functions';
import type { Method } from '@/types/index.types';
import styles from './details-container.module.scss';
import {
  CountryCode,
  PhoneNumber,
  parsePhoneNumberFromString as parsePhoneNumber,
} from 'libphonenumber-js';

type DetailsContainerProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setPhone: (newPhone: string | undefined) => void;
  onChangeHandler: <
    T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(
    e: React.ChangeEvent<T>
  ) => void;
  emailHasChanged: boolean;
};

const DetailsContainer = ({
  setPhone,
  onChangeHandler,
  firstName,
  lastName,
  email,
  phone,
  emailHasChanged,
}: DetailsContainerProps) => {
  const [loginMethod, setLoginMethod] = useState<Method | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [country, setCountry] = useState<string>('AU');

  const {
    updateCustomerDetailsAtOnce,
    updateUserAuthToken,
    updateSendingCodeToNewUser,
    updateCustomer,
    updateShowPhoneLogin,
    updateMethod,
    updateShowVerification,
    updateShowPhoneError,
    userId,
    user,
    sendingCodeToNewUser,
    customer,
    showPhoneLogin,
    method,
    showVerification,
    showPhoneError,
    emailChecked,
    phoneChecked,
    setEmailChecked,
    setPhoneChecked,
  } = useApp();

  let emailVerified, phoneVerified;

  if (user) {
    emailVerified = user.emailVerified;
    phoneVerified = user.phoneVerified;
  }

  const authWithEmailHandler = async () => {
    if (email) {
      try {
        const data = await authWithMethod('email', email);
        const customer = data.data;
        if (data.exists) {
          updateCustomer?.(customer ?? null);
          setShowLogin(true);
        } else {
          updateCustomer?.(null);
          setEmailChecked?.(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
  };


  const handlePhoneChange = (newPhone: string) => {
    const phoneNumber = parsePhoneNumber(phone, {
      defaultCountry: country as CountryCode,
      extract: false,
    });

    if (phoneNumber?.country) setCountry(phoneNumber.country);
    setPhone(newPhone);
  };

  // Checking Phone Validity
  const checkPhoneValidity = (phone: string, country: string) => {
    const phoneNumber = parsePhoneNumber(phone, {
      defaultCountry: country as CountryCode,
      extract: false,
    });
    const isValid = phoneNumber
      ? phoneNumber.isValid() && phoneNumber.country === country
      : false;
    if (isValid) setPhone(phoneNumber?.number);
    return { isValid, phoneNumber: phoneNumber as PhoneNumber };
  };

  const authWithPhoneHandler = async () => {
    if (phone && phone.length > 3 && (emailChecked || userId)) {
      const { isValid, phoneNumber } = checkPhoneValidity(phone, country);
      if (!isValid)
        return updateShowPhoneError?.('Please enter a valid phone number');

      updateSendingCodeToNewUser?.(true);
      try {
        if (!customer) {
          const data = await authWithMethod('phone', phoneNumber.number);

          if (data.exists) {
          } else if (data.success) {
            updateMethod?.('phone');
            updateShowVerification?.(true);
          }
        } else {
          authWithEmailHandler();
        }

        updateSendingCodeToNewUser?.(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendAuthCodeWithMethod = async (method: Method) => {
    try {
      if (customer) {
        setLoginMethod(method);
        sendAuthCodeByCustomerToken({
          method,
          token: customer.customerID,
        });
        setShowLogin(false);
        updateShowVerification?.(true);
      }
      else {
        authWithPhoneHandler()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAuthCodeWithCustomerTokenHandler = async (code: string) => {
    if (customer) {
      const authObj = {
        loginMethod,
        userAccessToken: customer.customerID,
        code,
      };

      const res = await verifyAuthCodeWithCustomerToken(authObj);

      if (res.verificationStatus === 'approved') {
        updateUserAuthToken?.(res.accessToken);
        return true;
      } else {
        return false;
      }
    } else {
      const authObj = {
        phoneNumber: phone,
        code,
      };

      const res = (await verifyPhone(authObj)) as {
        success: boolean;
        message: string;
      };

      if (res.success) {
        setPhoneChecked?.(true);
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if (email?.length > 0 && !emailChecked && !emailHasChanged) {
      if (!userId) {
        authWithEmailHandler();
      }
    }
  }, [email]);

  return (
    <div className={styles.div}>
      <HeadingSecondary style={{ fontWeight: 700 }}>
        your details
      </HeadingSecondary>
      {emailChecked ? (
        <ValidatedAddressContainer
          input={email}
          label="your email"
          buttonLabel="change email"
          resetInput={() => {
            setEmailChecked?.(false);
            setPhoneChecked?.(false);
            updateCustomerDetailsAtOnce?.({ email: '', phone: '' });
          }}
          showBtn={!!userId ? false : true}
        />
      ) : (
        <FormRow>
          <Input
            disabled={!!userId}
            value={userId ? user?.email : email || ''}
            id="email"
            type="email"
            name="email"
            required
            onChange={onChangeHandler}
            onBlur={authWithEmailHandler}
            style={userId ? { opacity: '1' } : {}}
          />
          <Label htmlFor="email" value={userId ? user?.email : email}>
            your email
          </Label>
          {userId && emailVerified && (
            <GreenTick
              style={{
                position: 'absolute',
                right: '1rem',
                fontSize: '3rem',
                top: '1.1rem',
              }}
            />
          )}
          {showLogin && (
            <GreyOverlay
              onClick={setShowLogin}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PhoneVerificationContainer
                alert
                heading="Welcome back"
                paragraph={[
                  'Customer already exists with email.',
                  'Please choose an authentication method to login.',
                ]}
                setShowVerification={setShowLogin}
                btn1Handler={() => {
                  updateMethod?.('phone');
                  sendAuthCodeWithMethod('phone');
                }}
                btn2Handler={() => {
                  updateMethod?.('email');
                  sendAuthCodeWithMethod('email');
                }}
              />
            </GreyOverlay>
          )}
        </FormRow>
      )}
      <FormRow>
        <div className={styles['name-container']}>
          <Input
            disabled={userId || !email ? true : false}
            value={userId ? user?.firstName : firstName || ''}
            type="text"
            name="firstName"
            id="firstName"
            required={true}
            style={userId ? { opacity: '1' } : {}}
            onChange={onChangeHandler}
            onBlur={async () => { }}
          />
          <Label
            htmlFor="firstName"
            value={userId ? user?.firstName : firstName}
          >
            first name
          </Label>
        </div>
        <div className={styles['name-container']}>
          <Input
            disabled={userId || !email ? true : false}
            value={userId ? user?.lastName : lastName || ''}
            type="text"
            name="lastName"
            id="lastName"
            required={true}
            style={userId ? { opacity: '1' } : {}}
            onChange={onChangeHandler}
            onBlur={async () => { }}
          />
          <Label htmlFor="lastName" value={userId ? user?.lastName : lastName}>
            last name
          </Label>
        </div>
      </FormRow>
      <FormRow>
        {phoneChecked ? (
          <div className={styles['inner-phone-container']}>
            <ValidatedAddressContainer
              input={phone}
              country={country}
              label="mobile phone"
              buttonLabel="change phone"
              resetInput={() => {
                setPhoneChecked?.(false);
                updateCustomerDetailsAtOnce?.({ phone: '' });
              }}
            />
            <GreenTick
              style={{
                position: 'absolute',
                right: '1rem',
                fontSize: '3rem',
                top: '1.1rem',
              }}
            />
          </div>
        ) : (
          <>
            <div className={styles['phone-input-outer']}>
              <PhoneInputField
                disabled={userId || !email ? true : false}
                phone={user ? user?.phone : phone}
                country={country}
                onPhoneChange={handlePhoneChange}
                onCountryChange={handleCountryChange}
                validateHandler={authWithPhoneHandler}
              />
              {sendingCodeToNewUser && !showVerification && (
                <GreenSpinner
                  extraStyles={{
                    position: 'absolute',
                    right: '1rem',
                    fontSize: '3rem',
                    top: '25%',
                  }}
                />
              )}
              {userId && phoneVerified && (
                <GreenTick
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    fontSize: '3rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
            </div>
            <Label htmlFor="phone" value={userId ? user?.phone : phone}>
              mobile phone
            </Label>
          </>
        )}
        <p
          className={`${styles['phone-info']} ${phoneChecked ? styles['phone-info--checked'] : ''
            }`}
        >
          * Your mobile is required to manage your account. No need for
          passwords!
        </p>
        {showPhoneLogin && (
          <GreyOverlay
            onClick={updateShowPhoneLogin}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PhoneVerificationContainer
              alert={true}
              heading="welcome back"
              paragraph={[
                'Customer already exists with phone number.',
                'Please click send to receive an authentication code to login.',
              ]}
              setShowVerification={(value: boolean) => updateShowVerification?.(value) ?? false}
              btn1="send"
              btn1Handler={() => {
                updateMethod?.('phone');
                sendAuthCodeWithMethod('phone');
                updateShowPhoneLogin?.(false);
              }}
            />
          </GreyOverlay>
        )}
        {userId && showVerification && (
          <PhoneVerificationContainer
            method={method}
            email={email}
            phone={phone}
            setShowVerification={(value: boolean) => updateShowVerification?.(value) ?? false}
            authHandler={verifyAuthCodeWithCustomerTokenHandler}
            resendHandler={sendAuthCodeWithMethod}
          />
        )}
        {showPhoneError && (
          <PhoneVerificationContainer
            alert={true}
            btn1="ok"
            heading="INVALID PHONE NUMBER"
            paragraph={[showPhoneError, ' ']}
            setShowVerification={(value: boolean) => updateShowVerification?.(value) ?? false}
            btn1Handler={() => {
              updateShowPhoneError?.('');
            }}
          />
        )}
      </FormRow>
      {showVerification && (
        <PhoneVerificationContainer
          method={method}
          email={email}
          phone={customer?.phone || phone}
          setShowVerification={(value: boolean) => updateShowVerification?.(value) ?? false}
          authHandler={verifyAuthCodeWithCustomerTokenHandler}
          resendHandler={sendAuthCodeWithMethod}

        />
      )}
    </div>
  );
};

export default DetailsContainer;
