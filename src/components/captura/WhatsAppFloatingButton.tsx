"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function WhatsAppFloatingButton({ href }: { href: string }) {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos directo por WhatsApp"
      className={`tap-target fixed right-4 bottom-6 z-40 h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6 ${
        formVisible ? "flex" : "hidden sm:flex"
      }`}
      style={{ background: "var(--green)" }}
    >
      <Icon icon="ic:baseline-whatsapp" width={30} height={30} color="white" />
    </a>
  );
}
