import { Button, Spinner } from "@/components/Checkout/index.checkout";
import { TermsContainer } from "../index.shared";
import styles from "./pay-terms-container.module.scss";

type PayTermsContainerProps = {
  processingPayment: boolean;
  evaluatePayVisible: boolean;
  className: "show" | "hidden";
};

const PayTermsContainer = ({
  processingPayment,
  evaluatePayVisible,
  className,
}: PayTermsContainerProps) => {
  return (
    <div className={`${styles[className]} ${styles.div}`}>
      <Button
        type="submit"
        disabled={!evaluatePayVisible || processingPayment}
        extraStyles={{
          gridArea: "button-small",
          marginBottom: "1.5rem",
          justifyContent: "center",
          padding: "1.5rem 0",
          width: "100%",
        }}
        className="btn-pay"
      >
        {processingPayment ? <Spinner /> : "pay now"}
      </Button>
      <TermsContainer />
    </div>
  );
};

export default PayTermsContainer;
