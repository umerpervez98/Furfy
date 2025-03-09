import { LinkList } from "../../index.shared";
import NavButton from "../nav-button/nav-button";
import styles from "./side-nav.module.scss";
import type { Dispatch, SetStateAction } from "react";

type SideNavProps = {
  setShowNav: Dispatch<SetStateAction<boolean>>;
  setShowScatulator: (bool: boolean) => void;
  showNav: boolean;
  className: string;
};

const SideNav = ({
  setShowNav,
  setShowScatulator,
  showNav,
  className,
}: SideNavProps) => {
  return (
    <aside
      className={
        className ? `${styles[className]} ${styles.aside}` : styles.aside
      }
    >
      <LinkList onClick={setShowNav} onButtonClick={setShowScatulator} />
      <NavButton
        className="btn-nav-icon-animated"
        currentState={!showNav}
        onClick={setShowNav}
        style={{ position: "absolute", top: "2rem", right: "2rem" }}
      />
    </aside>
  );
};

export default SideNav;
