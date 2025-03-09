import Link from "next/link";
import { Button } from "@/components/shared/index.shared";
import styles from "./btn-box.module.scss";

type BtnBoxProps = {
  text: string;
  btnLabel: string;
  link: string;
  onClick: () => void;
};

const BtnBox = ({ text, btnLabel, link, onClick }: BtnBoxProps) => {
  return (
    <div className={styles["btn-box"]}>
      <p>{text}</p>
      <Button onClick={onClick}>
        <Link href={link}>{btnLabel}</Link>
      </Button>
    </div>
  );
};

export default BtnBox;
