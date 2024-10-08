"use client";
import { useEffect } from "react";

const faviconLinks = [
  "/favicons/typescript.ico",
  "/favicons/node.ico",
  "/favicons/next.ico",
  "/favicons/react.ico",
  "/favicons/git.ico",
  "/favicons/cpp.ico",
];

export default function FaviconLoop() {
  useEffect(() => {
    let currentFaviconIndex = 0;
    const interval = setInterval(() => {
      const link = document.querySelector("link[rel*='icon']");
      if (link) {
        currentFaviconIndex = (currentFaviconIndex + 1) % faviconLinks.length;
        link.href = faviconLinks[currentFaviconIndex];
      }
    }, 2000); // Alterna a cada 2 segundos (ajuste conforme necessário)

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return null;
}
