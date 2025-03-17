import {
  ButtonSecondary,
  PromoInput,
} from '@/components/Checkout/index.checkout';
import type { TOrderReceiptCouponRedemption } from '@/types/index.types';
import { INITIAL_PROMO_STATE } from '@/components/shared/cart-container/cart-container';
import styles from './promo-container.module.scss';

type PromoContainerProps = {
  loading: boolean;
  promoApplied: TOrderReceiptCouponRedemption;
  promo: typeof INITIAL_PROMO_STATE;
  setPromo: (promo: typeof INITIAL_PROMO_STATE) => void;
  onClickHandler: () => void;
  onChangeHandler: <T>(e: React.ChangeEvent<T>) => void;
  clearPromo: () => void
};

const PromoContainer = ({
  loading,
  promo,
  promoApplied,
  setPromo,
  onClickHandler,
  onChangeHandler,
  clearPromo
}: PromoContainerProps) => {
  return (
    <div className={styles.div}>
      {promo.show || promoApplied?.code ? (
        <PromoInput
          onClickHandler={onClickHandler}
          onChangeHandler={onChangeHandler}
          loading={loading}
          promo={promo}
          promoApplied={promoApplied}
          disabled={promoApplied ? true : false}
          clearPromo={clearPromo}
        />
      ) : (
        <ButtonSecondary
          onClickHandler={() => setPromo({ ...promo, show: true })}
          extraStyles={{ marginTop: '0' }}
        >
          I have a discount code
        </ButtonSecondary>
      )}
    </div>
  );
};

export default PromoContainer;
