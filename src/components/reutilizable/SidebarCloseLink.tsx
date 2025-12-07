"use client"; // Esto es obligatorio

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { ComponentProps } from "react";

// Este componente es igual a un Link normal, pero cierra el menú
export function SidebarCloseLink(props: ComponentProps<typeof Link>) {
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Link
      {...props}
      onClick={(e) => {
        // Si estamos en celular, cerramos el menú
        if (isMobile) {
          setTimeout(() => {
            setOpenMobile(false);
          }, 300); // Le damos un pequeño delay para que el usuario vea que hizo click
        }
        // Ejecutamos cualquier otro evento si existiera
        props.onClick?.(e);
      }}
    />
  );
}