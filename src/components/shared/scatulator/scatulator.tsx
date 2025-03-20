"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import {
  Button,
  GreyOverlay,
  HeadingSecondary,
  ButtonClose,
} from "../index.shared";
import QuantitySelector from "./quantity-selector/quantity-selector";
import styles from "./scatulator.module.scss";

const Scatulator = () => {
  const [selectedDogs, setSelectedDogs] = useState(0);
  const [selectedPoos, setSelectedPoos] = useState(0);
  const [calculatedQuantity, setCalculatedQuantity] = useState(0);
  const { updateQuantity, setShowScatulator } = useApp();

  const path = usePathname();
  const router = useRouter();

  const calculateQuantity = () => {
    return Math.ceil(selectedDogs * selectedPoos * 0.5);
  };

  useEffect(() => {
    const newQty = calculateQuantity();
    setCalculatedQuantity(newQty);
  }, [selectedDogs, selectedPoos]);

  return (
    <GreyOverlay onClick={() => setShowScatulator(false)}>
      <div className={styles.scatulator}>
        <div className={styles["upper-container"]}>
          <ButtonClose onClick={() => setShowScatulator(false)} special={true} />
          <HeadingSecondary
            style={{ fontSize: "3.7rem", textAlign: "center", fontWeight: "900" }}
          >
            scatulator
          </HeadingSecondary>
          <h3>Estimate how many boxes you’ll need to order.</h3>
          <QuantitySelector
            imgUrl={'/images/shared/scatbags-dog.svg'}
            heading="How many dogs in your family?"
            selectedValue={selectedDogs}
            setSelectedValue={setSelectedDogs}
          />
          <QuantitySelector
            imgUrl={'/images/shared/scatbags-poo-small.svg'}
            heading="How many poos per day for 1 dog?"
            selectedValue={selectedPoos}
            setSelectedValue={setSelectedPoos}
          />
        </div>
        <div
          className={
            selectedDogs > 0 && selectedPoos > 0
              ? styles["btn-container"]
              : `${styles["btn-container--hidden"]} ${styles["btn-container"]}`
          }
        >
          <div className={styles["calculation-display-box"]}>
            <Image
              src={'/images/shop/single-box.svg'}
              alt="Single Box Image"
              style={{ width: "auto", height: "90px" }}
            />
            <p>
              <span>We recommend</span>
              <HeadingSecondary
                style={{
                  textTransform: "none",
                  textAlign: "left",
                }}
              >
                {calculatedQuantity > 1
                  ? `${calculatedQuantity} boxes `
                  : `${calculatedQuantity} box `}
                <br />
                every 4 weeks
              </HeadingSecondary>
            </p>
          </div>
          <Button
            onClick={() => {
              updateQuantity(calculatedQuantity);
              setShowScatulator(false);

              if (path !== "/shop") {
                router.push("/shop");
              }
            }}
          >
            update quantity
          </Button>
        </div>
      </div>
    </GreyOverlay>
  );
};

export default Scatulator;
