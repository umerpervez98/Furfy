"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./animated-box.module.scss";

const AnimatedBox = () => {
  const path = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "/images/shop/scatboxes9/scatboxes9.hyperesources/scatboxes9_hype_generated_script.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [path]);

  const getClassName = () => {
    switch (true) {
      case path.length === 1:
        return styles["animated-box--home"];
      case path.includes("account"):
        return styles["animated-box--account"];
      default:
        return styles["animated-box--shop"];
    }
  };

  return (
    <div className={getClassName()}>
      <div
        id="scatboxes9_hype_container"
        className="HYPE_document"
        style={{
          margin: "auto",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default AnimatedBox;
