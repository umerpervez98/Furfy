"use client";
import Mask from "@/components/shared/mask/mask";
import Image from "next/image";
import styles from "./sms.module.scss";

const SMSCodePending = () => {
  const sendingCodeToNewUser = false;

  return (
    <Mask
      className={styles["mask-container"]}
      shouldDisplay={sendingCodeToNewUser}
    >
      <div className={styles["mask-contents"]}>
        <Image width={313.49} height={150} src={"/icons/logo.svg"} alt="logo" />
        <p>
          JUST A SEC,
          <br />
          WE&apos;RE SENDING A<br />
          CODE TO YOUR
          <br />
          MOBILE
          <span />
        </p>
      </div>
    </Mask>
  );
};

export default SMSCodePending;
