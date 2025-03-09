import Image from "next/image";
import { Button } from "../../index.shared";
import styles from "./quantity-selector.module.scss";
import type { Dispatch, SetStateAction } from "react";

type QuantitySelectorProps = {
  heading: string;
  imgUrl: string;
  selectedValue: number;
  setSelectedValue: Dispatch<SetStateAction<number>>;
};

const QuantitySelector = ({
  heading,
  imgUrl,
  selectedValue,
  setSelectedValue,
}: QuantitySelectorProps) => {
  return (
    <div className={styles["quantity-box"]}>
      <div className={styles["info-box"]}>
        <div className={styles["image-box"]}>
          <Image src={imgUrl} alt="Product Icon" />
        </div>
        <p>{heading}</p>
      </div>
      <ul>
        {[1, 2, 3, 4].map((value) => {
          return (
            <li key={value}>
              <Button
                key={value}
                isCurrentValue={selectedValue === value}
                onClick={() => setSelectedValue(value)}
              >
                {value}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuantitySelector;
