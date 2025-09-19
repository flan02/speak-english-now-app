"use client";

import { ArrowBigUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  // Detecta cuando el usuario hace scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para scrollear al inicio suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //if (!show) return null; // No mostrar el botón si está en la parte superior

  return (
    <button onClick={scrollToTop} className="z-50 my-4" >
      <ArrowBigUp className="mx-auto" size="36" fill="" /> <span className="text-[10px] uppercase" >volver al inicio</span>
    </button>
  );
}
