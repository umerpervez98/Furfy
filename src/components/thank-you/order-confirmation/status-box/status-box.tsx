import { StatusPill } from "@/components/shared/index.shared";
import styles from "./status-box.module.scss";
import type { StatusPillProps } from "@/components/shared/status-pill/status-pill";

type StatusBoxProps = {
  statusArr: { name: string; [key: string]: unknown }[];
};

const StatusBox = ({ statusArr }: StatusBoxProps) => {
  return (
    <div className={styles["status-box"]}>
      <span>status</span>
      <div className={styles["pill-container"]}>
        {statusArr.map((status) => {
          return <StatusPill key={status.name} text={status.name} />;
        })}
      </div>
    </div>
  );
};

export default StatusBox;
