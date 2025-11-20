import { useEffect } from "react";

export function useSingleTabGuard(onDuplicateTab: () => void) {
  useEffect(() => {
    const channel = new BroadcastChannel("app_session_channel");

    // Aviso al resto que esta pestaña se abrió
    channel.postMessage({ type: "tab_opened" });

    // Si recibo un mensaje significa que otra pestaña también está abierta
    channel.onmessage = (event) => {
      if (event.data?.type === "tab_opened") {
        onDuplicateTab();
      }
    };

    return () => {
      channel.close();
    };
  }, [onDuplicateTab]);
}
