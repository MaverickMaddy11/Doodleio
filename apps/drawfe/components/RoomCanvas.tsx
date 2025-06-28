"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "@/app/draw";
import { WS_URL } from "@/app/config";
import { Canvascomp } from "./Canvas";
import { json } from "stream/consumers";

export function CanvasPage({ roomId }: { roomId: string }) {
  const canvasref = useRef<HTMLCanvasElement>(null);
  const [Socket, SetSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=${localStorage.getItem("authorization")}`
    );
    ws.onopen = () => {
      //@ts-ignore
      SetSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };
  });

  if (!Socket) {
    return <div>page is loading.........</div>;
  }

  return (
    <div>
      <Canvascomp roomId={roomId} socket={Socket}></Canvascomp>
    </div>
  );
}
