import { Input, FormRow, ButtonClose } from '@/components/Checkout/index.checkout';
import styles from './promo-input.module.scss';
import { type KeyboardEvent } from 'react';

type PromoInputProps = {
  onClickHandler: () => void;
  onChangeHandler: <T>(e: React.ChangeEvent<T>) => void;
  loading: boolean;
  promo: {
    code: string;
    error: boolean;
    show: boolean;
    loading: boolean;
  };
  promoApplied: null | { code: string };
  disabled: boolean;
  clearPromo: () => void;
};

const PromoInput = ({
  onClickHandler,
  onChangeHandler,
  loading,
  promo,
  promoApplied,
  disabled,
  clearPromo,
}: PromoInputProps) => {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.key === 'Enter' && e.currentTarget.name === 'promo') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.div}>
      <FormRow
        style={{
          gap: '0',
          marginTop: '0',
          alignItems: 'stretch',
        }}
      >
        <Input
          type="text"
          placeholder="promo code"
          name="promo"
          promoApplied={promoApplied}
          value={promo?.code}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
        />
        {promoApplied && (
          <ButtonClose
            onClick={() => clearPromo()}
            style={{
              position: 'absolute',
              right: '9rem',
              height: '4.2rem',
              width: '4rem',
              top: '50%',
              transform: 'translate(0, -50%)',
            }}
          />
        )}
        <button
          type="button"
          onClick={onClickHandler}
          disabled={loading || disabled}
          className={styles['apply-button']}
        >
          {promoApplied ? 'applied' : 'apply'}
        </button>
      </FormRow>
      {promo.error && <small>invalid promo code!</small>}
    </div>
  );
};

export default PromoInput;
