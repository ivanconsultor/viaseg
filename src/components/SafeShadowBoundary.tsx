"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SafeShadowBoundaryProps {
  children: React.ReactNode;
  className?: string;
}

export default function SafeShadowBoundary({ children, className }: SafeShadowBoundaryProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hostRef.current || shadowRoot) return;

    // Criar o Shadow Root no cliente
    const root = hostRef.current.attachShadow({ mode: "open" });

    // Copiar estilos ativos do head para o Shadow Root para aplicar Tailwind
    const copyStyles = () => {
      document.querySelectorAll("style, link[rel='stylesheet']").forEach((style) => {
        root.appendChild(style.cloneNode(true));
      });
    };

    copyStyles();
    setShadowRoot(root);

    // Observar inserção de novas tags de estilo (caso ocorra hot reload em desenvolvimento)
    const observer = new MutationObserver(() => {
      document.querySelectorAll("style, link[rel='stylesheet']").forEach((style) => {
        const alreadyInShadow = Array.from(root.childNodes).some(
          (node) => 
            node.nodeName === style.nodeName && 
            (node as any).href === (style as any).href && 
            node.textContent === style.textContent
        );
        if (!alreadyInShadow) {
          root.appendChild(style.cloneNode(true));
        }
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [mounted, shadowRoot]);

  return (
    <div ref={hostRef} className={className}>
      {shadowRoot ? createPortal(children, shadowRoot) : null}
    </div>
  );
}
