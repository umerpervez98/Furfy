import Image from "next/image";
import { BsCheckSquare } from "react-icons/bs";
import BadgeTrust from '../../../../public/images/shared/badge-trust.svg';
import styles from "./terms-container.module.scss";
import BadgeCertificate from '../../../../public/images/shared/badge-certificate.svg';

const featureArr = [
  "Patented Japanese technology that will last forever",
  "No batteries required, simply roll back and forth really fast",
  "Long lasting design, sustainably produced, with high quality materials",
  "BPA-free plastic, making it a safer option for our pets and their humans",
  "Money-back guarantee after 30 days of delivery",
];

const TermsContainer = () => {
  return (
    <div className={styles.div}>
      <h4>join Thousands of AU & US customers</h4>
      <p>You&rsquo;re one click away from...</p>
      <ul>
        {featureArr.map((feature) => {
          return (
            <li key={feature}>
              <BsCheckSquare />
              {feature}
            </li>
          );
        })}
      </ul>
      <p className={styles.agreement}>
        Clicking the Pay Now button confirms your acceptance and agreement to
        our Terms & Conditions
      </p>
      <div>
        <div className={styles["image-container"]}>
          <Image src={BadgeTrust} alt="Secure Logo" height="70" />
          <Image src={BadgeCertificate} alt="Encrypted Logo" height="70" />
        </div>
        <p>SECURE AND ENCRYPTED CHECKOUT</p>
      </div>
    </div>
  );
};

export default TermsContainer;
