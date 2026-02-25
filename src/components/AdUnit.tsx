"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  adSlot: string;       // ex: "1234567890" — l'ID du bloc pub dans AdSense
  adFormat?: string;    // "auto" | "rectangle" | "horizontal" | "vertical"
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ adSlot, adFormat = "auto", className = "" }: AdUnitProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense pas encore chargé
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="YOUR_PUB_ID"   // ← remplace par ca-pub-XXXXXXXXXXXXXXXX
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
