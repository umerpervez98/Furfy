"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import type { Dispatch, SetStateAction } from "react";
import styles from "./link-list.module.scss";

const navLink = [
  { url: "/", text: "home" },
  { url: "/shop", text: "shop" },
  { url: null, text: "scatulator" },
  { url: "/my-account", text: "my account" },
  { url: "/faq", text: "FAQ" },
  { url: "/about", text: "about" },
  { url: "/contact", text: "contact" },
];

type LinkListProps = {
  onClick: Dispatch<SetStateAction<boolean>>;
  onButtonClick: (bool: boolean) => void;
};

const LinkList = ({ onClick, onButtonClick }: LinkListProps) => {
  const { setCurrentTab } = useCart();
  const path = usePathname();

  return (
    <ul className={styles["link-list"]}>
      {navLink.map(({ url, text }) => (
        <li key={text}>
          {url ? (
            <Link
              href={url}
              className={path === url ? styles.active : ""}
              onClick={() => {
                onClick(false);
                if (url === "/my-account") {
                  setCurrentTab("dashboard");
                }
              }}
            >
              {text}
            </Link>
          ) : (
            <button
              type="button"
              className={path === url ? styles.active : ""}
              onClick={() => {
                onButtonClick(true);
                onClick(false);
              }}
            >
              {text}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
