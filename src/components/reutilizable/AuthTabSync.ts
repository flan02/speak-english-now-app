"use client";

import { useEffect } from "react";

export default function AuthTabSync() {

  useEffect(() => {
    const channel = new BroadcastChannel("auth_channel");

    // Cuando otra pestaña envía logout
    channel.onmessage = (e) => {
      if (e.data === "logout") {
        console.log("Logout sincronizado entre pestañas");
        window.location.href = "/auth/login"; // redirige a login
      }

      if (e.data === "login") {
        console.log("Login sincronizado entre pestañas");
        window.location.reload();
      }
    };

    return () => channel.close();
  }, []);

  return null;
}
