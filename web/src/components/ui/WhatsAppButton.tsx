"use client";

import { useState } from "react";
import { ChatIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton({ className = "" }: { className?: string }) {
  const [opening, setOpening] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (siteConfig.whatsappHref === "#") {
      e.preventDefault();
    }
    setOpening(true);
    window.setTimeout(() => setOpening(false), 2000);
  }

  return (
    <a
      href={siteConfig.whatsappHref}
      target={siteConfig.whatsappHref !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold whitespace-nowrap border-[1.5px] border-primary text-primary px-6.5 py-3.5 hover:bg-tint transition-colors ${className}`}
    >
      <ChatIcon size={17} />
      {opening ? "Opening WhatsApp…" : "Message us on WhatsApp"}
    </a>
  );
}
