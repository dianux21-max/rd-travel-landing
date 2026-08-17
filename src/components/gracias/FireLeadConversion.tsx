"use client";

import { useEffect, useRef } from "react";
import { trackLeadConversion } from "@/lib/analytics";

export default function FireLeadConversion() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackLeadConversion();
  }, []);

  return null;
}
