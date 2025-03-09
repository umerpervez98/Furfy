"use client";

import { useEffect, useRef } from "react";
import { ButtonClose } from "../index.checkout";
import { useCart } from "@/contexts/CartContext";
import styles from "./modal-input-container.module.scss";

type ModalInputContainerProps = {
  closeHandler: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  showInfo?:
  | { type: string; state: boolean }
  | {
    showInfo: boolean;
    extra: number;
  };
};

const ModalInputContainer = ({
  children,
  closeHandler,
  style,
  className,
  showInfo,
}: ModalInputContainerProps) => {
  const { setIsScrollActivated } = useCart();
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (
      showInfo &&
      containerRef &&
      containerRef.current &&
      containerRef.current.className.split(" ").includes("animated")
    ) {
      const checkScroll = () => {
        // Check if the document's scroll height is greater than the window's height
        const el = containerRef.current!;
        const isActivated = el.scrollHeight > el.clientHeight;
        setIsScrollActivated(isActivated);
      };

      // Run the check on mount
      checkScroll();

      const updateViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      updateViewportHeight();

      // // Optionally, add an event listener to check scroll on window resize
      window.addEventListener("resize", updateViewportHeight);
      window.addEventListener("orientationchange", updateViewportHeight);
      window.addEventListener("resize", checkScroll);

      // // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", checkScroll);
        window.removeEventListener("resize", updateViewportHeight);
        window.removeEventListener("orientationchange", updateViewportHeight);
      };
    }
  }, [showInfo]);

  return (
    <div
      className={`${className} ${styles.div}`}
      style={style}
      ref={containerRef}
    >
      <ButtonClose special={true} onClick={closeHandler} />
      {children}
    </div>
  );
};

export default ModalInputContainer;
