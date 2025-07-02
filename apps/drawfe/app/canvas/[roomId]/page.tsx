import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { CanvasPage } from "@/components/RoomCanvas";

export default async function Canvas({
  params,
}: {
  params: { roomId: string };
}) {
  const roomId = await params.roomId;
  console.log(roomId);
  return (
    <div>
      <CanvasPage roomId={roomId} />
    </div>
  );

  // return <div> hlo there </div>;
}
