"use client";

import { useEffect } from "react";
import { initGTM } from "@/utils/gtm"; // Adjust the path as necessary

function GTM() {
  useEffect(() => {
    initGTM();
  }, []);

  return <div style={{ display: "none" }} />;
}

export default GTM;
