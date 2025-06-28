import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
  const [loading, setloading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkN2RjZTlmMS1lMWM3LTQxMjUtYjFkYS0xNTFjOGFlOTU5YTciLCJpYXQiOjE3NDYyNzMxMTZ9.wwsFiKj1Y_Oap2EJYDod7UQkoTQI-NCFA7A6trZq7uk`
    );
    ws.onopen = () => {
      setloading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
