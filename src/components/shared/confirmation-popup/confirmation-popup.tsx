import { Button } from '@/components/Checkout/index.checkout';
import styles from './confirmation-popup.module.scss';

type ConfirmationPopupProps = {
  noHandler: () => void;
  yesHandler: () => void;
  text: string;
};

const ConfirmationPopup = ({
  noHandler,
  yesHandler,
  text,
}: ConfirmationPopupProps) => {
  return (
    <div className={styles.div}>
      <p className="confirmation">{text}</p>
      <div>
        <Button
          extraStyles={{
            fontSize: "1.2rem",
            width: "6rem",
            backgroundColor: "#fff",
          }}
          onClick={noHandler as React.MouseEventHandler<HTMLButtonElement>}
        >
          no
        </Button>
        <Button
          extraStyles={{
            fontSize: "1.2rem",
            width: "6rem",
            backgroundColor: "#fff",
          }}
          onClick={yesHandler as React.MouseEventHandler<HTMLButtonElement>}
        >
          yes
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
