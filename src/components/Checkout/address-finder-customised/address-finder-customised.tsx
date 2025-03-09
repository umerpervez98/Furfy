import { WidgetInput, Address } from 'react-addressfinder';
import { Country } from 'react-addressfinder/dist/constants';
import { AddressMeta } from 'react-addressfinder/dist/types';
import styles from './address-finder-customised.module.scss';

type AddressFinderCustomisedProps = {
  onSelectedHandler: (
    address: string,
    fullAddress: Address | AddressMeta
  ) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetAddress: (userLoggedIn?: boolean) => void;
  country: Country;
  validated: boolean;
  address: string;
  disabled?: boolean;
};

const AddressFinderCustomised = ({
  onSelectedHandler,
  onChangeHandler,
  resetAddress,
  country,
  validated,
  address,
  disabled = false,
}: AddressFinderCustomisedProps) => {
  const addressFinderKey = process.env.NEXT_PUBLIC_ADDRESS_FINDER_KEY!;

  const onBlurHandler = () => {
    if (!validated) {
      resetAddress();
    }
  };

  return (
    <WidgetInput
      id="address"
      name="address"
      value={address || ''}
      disabled={disabled}
      required
      addressFinderKey={addressFinderKey}
      country={country}
      onBlur={onBlurHandler}
      onChange={onChangeHandler}
      onSelected={onSelectedHandler}
      addressParams={{ post_box: 'paf' }}
      inputClassName={styles['input']}
      itemClassName={styles['address-autocomplete__suggestions__item__custom']}
    />
  );
};

export default AddressFinderCustomised;
