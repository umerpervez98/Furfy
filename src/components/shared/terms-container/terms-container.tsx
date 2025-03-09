import Image from "next/image";
import { BsCheckSquare } from "react-icons/bs";
import BadgeTrust from '../../../../public/images/shared/badge-trust.svg';
import styles from "./terms-container.module.scss";
import BadgeCertificate from '../../../../public/images/shared/badge-certificate.svg';

const featureArr = [
  "The most planet-friendly poo bags on earth",
  "Durable & thick, ready to bag scats!",
  "Made from 100% plastic-free cornstarch",
  "Fully compostable & Biodegradable",
  "Australia's highest-rated dog poo bags",
];

const TermsContainer = () => {
  return (
    <div className={styles.div}>
      <h4>join Thousands of aussie customers</h4>
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
