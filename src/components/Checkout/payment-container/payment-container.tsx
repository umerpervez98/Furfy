import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Input,
  Label,
  ButtonSecondary,
  BraintreePayment,
  FormRow,
} from '@/components/Checkout/index.checkout';
import { HeadingSecondary } from '@/components/shared/index.shared';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { getPaymentToken } from '@services/api';
import { type PaymentMethod } from '@/types/index.types';
import styles from './payment-container.module.scss';

type PaymentContainerProps = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: Dispatch<SetStateAction<string>>;
  newPayment: boolean;
  setNewPayment: Dispatch<SetStateAction<boolean>>;
  paymentMethods: PaymentMethod[];
  visible: boolean;
};

const PaymentContainer = ({
  setSelectedPaymentMethod,
  setNewPayment,
  selectedPaymentMethod,
  newPayment,
  paymentMethods,
  visible,
}: PaymentContainerProps) => {
  const { userId, paymentToken, setPaymentToken } = useCart();

  const initPaymentToken = async () => {
    const token = await getPaymentToken();
    setPaymentToken?.(token.data);
  };

  useEffect(() => {
    if (!paymentToken && visible) {
      initPaymentToken()
    };
  }, [visible]);

  const showDropDown =
    userId && !newPayment && (!paymentMethods || paymentMethods.length >= 1);

  return (
    <div
      className={`payment-container ${visible ? styles.div : `${styles['div--hidden']} ${styles.div}`
        }`}
    >
      <HeadingSecondary style={{ fontWeight: 700 }}>
        choose a way to pay
      </HeadingSecondary>
      {showDropDown && (
        <div>
          <Label
            htmlFor="payment-methods"
            extraStyles={{
              paddingLeft: '1rem',
              marginBottom: '0.24rem',
              fontSize: '1.3rem',
              position: 'static',
              color: 'inherit',
            }}
          >
            your payment methods
          </Label>
          <FormRow
            style={{
              marginTop: '0',
            }}
          >
            <Input
              id="payment-methods"
              name="paymentMethods"
              type="select"
              value={selectedPaymentMethod}
              required={true}
              onChange={(e) => {
                if ('value' in e.target && e.target.value === 'new') {
                  setNewPayment(true);
                } else {
                  setSelectedPaymentMethod(
                    ('value' in e.target && e.target.value) as string
                  );
                }
              }}
              style={{ width: '100%' }}
            >
              {paymentMethods?.map((method) => {
                const {
                  accessToken,
                  cardType,
                  cardExpiry,
                  cardNumber,
                  paypalEmail,
                } = method;

                if (cardType) {
                  return (
                    <option key={accessToken} value={accessToken}>
                      {`${cardType[0].toUpperCase() + cardType.slice(1)
                        } ending in ${cardNumber} ${cardExpiry}`}
                    </option>
                  );
                }
                return (
                  <option key={accessToken} value={accessToken}>
                    {`Paypal ${paypalEmail}`}
                  </option>
                );
              })}
              <option value="new">Add a new payment method</option>
            </Input>
            <MdOutlineKeyboardArrowDown />
          </FormRow>
        </div>
      )}
      <BraintreePayment
        paymentToken={paymentToken ?? null}
        visible={!showDropDown}
        shouldInitiate={visible}
      />
      {!showDropDown && userId && paymentMethods.length > 0 && (
        <ButtonSecondary
          onClickHandler={() => setNewPayment(false)}
          extraStyles={{ marginLeft: 'auto', marginTop: '0.8rem' }}
        >
          back to existing payment methods
        </ButtonSecondary>
      )}
    </div>
  );
};

export default PaymentContainer;
