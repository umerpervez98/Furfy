"use client";

import { useCart } from "@/contexts/CartContext";
import type { CSSProperties, ReactNode } from "react";

type ScatulatorButtonProps = {
  children: ReactNode;
  style?: CSSProperties;
};

const ScatulatorButton = ({ children, style }: ScatulatorButtonProps) => {
  const { setShowScatulator } = useCart();

  return (
    <button type="button" style={style} onClick={() => setShowScatulator(true)}>
      {children}
    </button>
  );
};

export default ScatulatorButton;
