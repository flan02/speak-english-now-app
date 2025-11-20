"use client";

import { useEffect, useState } from "react";

export default function ClientTabGuard() {
  const [duplicate, setDuplicate] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel("app_session_channel");

    channel.postMessage({ type: "tab_opened" });

    channel.onmessage = (event) => {
      if (event.data?.type === "tab_opened") {
        setDuplicate(true);
      }
    };

    return () => channel.close();
  }, []);

  if (!duplicate) return null;

  return (
    <div className="fixed top-0 w-full bg-red-600 text-white py-2 text-center text-sm z-50">
      Ya tenés una sesión abierta en otra ventana.
    </div>
  );
}
