import {
  ButtonSecondary,
  VerificationInput,
  Paragraph,
  GreenTick,
  RedCross,
  ModalInputContainer,
  Spinner,
} from '@/components/Checkout/index.checkout';
import {
  Button,
  GreyOverlay,
  HeadingSecondary,
} from '@/components/shared/index.shared';
import type { ReactivationDates } from '@/utils/account-functions';
import type { ReactNode } from 'react';

type PhoneVerificationContainerProps = {
  setShowVerification: (value: boolean) => void;
  btn1Handler?: () => void;
  btn2Handler?: () => void | ((weekToken?: string) => void);
  resendHandler?: (method: 'phone' | 'email') => void;
  authHandler?: (code: string) => Promise<boolean | void>;
  handlePauseActiveSubscription?: (weekToken: string) => void;
  alert?: boolean;
  heading?: string;
  paragraph?: string[];
  red?: boolean;
  green?: boolean;
  phone?: string;
  email?: string;
  btn1?: string;
  btn2?: string;
  method?: 'phone' | 'email' | null;
  editQuantity?: ReactNode;
  isProcessing?: boolean;
  reactivate?: boolean;
  reactivationDates?: ReactivationDates;
};

const PhoneVerificationContainer = ({
  handlePauseActiveSubscription,
  resendHandler,
  reactivate,
  setShowVerification,
  authHandler,
  btn1Handler,
  btn2Handler,
  red,
  green,
  alert,
  phone,
  email,
  heading,
  paragraph = [],
  btn1,
  btn2,
  isProcessing,
  method,
  reactivationDates,
  editQuantity,
}: PhoneVerificationContainerProps) => {
  return (
    <GreyOverlay
      onClick={setShowVerification}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalInputContainer closeHandler={() => setShowVerification(false)}>
        <HeadingSecondary
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem',
            fontSize: '3.5rem',
          }}
        >
          {green && (
            <GreenTick
              className="address-verification-tick"
              style={{
                marginRight: '1rem',
                width: '2.7rem',
                height: '2.7rem',
                display: 'flex',
                fontSize: '3rem',
                backgroundColor: '#000',
              }}
            />
          )}
          {red && (
            <RedCross
              className="address-verification-tick"
              style={{
                marginRight: '1rem',
                width: '2.7rem',
                height: '2.7rem',
                display: 'flex',
                fontSize: '2.3rem',
              }}
            />
          )}
          {heading || "confirm it's you"}
        </HeadingSecondary>
        {editQuantity && editQuantity}
        <Paragraph
          extraStyles={{
            marginTop: '1rem',
            marginBottom: '0',
            fontStyle: 'italic',
            color: '#444',
            fontSize: '2rem',
            padding: '0 3rem',
            fontWeight: '300',
          }}
        >
          {paragraph[0] || (
            <>
              {`Enter the code sent to your ${method} to`}
              <br />
              securely access your account.
            </>
          )}
          {reactivate && handlePauseActiveSubscription && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                margin: '2rem 0 3rem',
              }}
            >
              {reactivationDates?.map((date, index) => {
                return (
                  <Button
                    key={index}
                    disabled={false}
                    style={{ width: '100%', color: '#000' }}
                    onClick={() =>
                      handlePauseActiveSubscription(date.weekToken)
                    }
                  >
                    {date.startDay}
                  </Button>
                );
              })}
            </div>
          )}
        </Paragraph>
        {!reactivate && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.70)',
              borderRadius: '0 0 1rem 1rem',
            }}
          >
            <Paragraph
              extraStyles={{
                marginBottom: '1rem',
                color: '#444',
                fontSize: '2.3rem',
                padding: '0.5rem 2.5rem',
                fontWeight: '300',
              }}
            >
              {paragraph[1] ||
                (method === 'phone'
                  ? `Number ${paragraph[1] ? 'ending in' : ''} ${phone ? phone : ''
                  }`
                  : email)}
            </Paragraph>
            {!alert && (
              <VerificationInput
                authHandler={authHandler!}
                setShowVerification={setShowVerification}
              />
            )}
            {!alert && (
              <Paragraph extraStyles={{ fontWeight: '300', color: '#444' }}>
                Didn&rsquo;t receive your code?
                <ButtonSecondary
                  onClickHandler={() => {
                    if (resendHandler && method) {
                      resendHandler(method);
                    }
                  }}
                  extraStyles={{
                    display: 'inline-block',
                    fontWeight: 'bold',
                    fontSize: '1.6rem',
                    margin: '0 0 0 0.5rem',
                  }}
                >
                  re-send
                </ButtonSecondary>
              </Paragraph>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
              }}
            >
              {alert && btn1Handler && (
                <Button
                  style={{
                    width: '17rem',
                  }}
                  onClick={btn1Handler}
                  disabled={isProcessing}
                >
                  {btn1 || 'sms'}
                </Button>
              )}
              {alert && btn2Handler && (
                <Button
                  style={{
                    width: '17rem',
                  }}
                  onClick={btn2Handler}
                  disabled={isProcessing}
                >
                  {isProcessing ? <Spinner /> : btn2 || 'email'}
                </Button>
              )}
            </div>
          </div>
        )}
      </ModalInputContainer>
    </GreyOverlay>
  );
};

export default PhoneVerificationContainer;
