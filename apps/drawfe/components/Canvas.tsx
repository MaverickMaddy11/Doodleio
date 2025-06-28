import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  Circle,
  Icon,
  Pencil,
  RectangleHorizontal,
  RectangleHorizontalIcon,
  Slash,
} from "lucide-react";
import { Game } from "@/app/draw/game";

export type Tool = "circle" | "pencil" | "rect" | "line";

export function Canvascomp({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [SelectedTool, SetSelectedTool] = useState<Tool>("circle");
  const [game, setgame] = useState<Game>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    //@ts-ignore
    // window.selectedTool = SelectedTool;
    game?.setShape(SelectedTool);
  }, [SelectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setgame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        {" "}
      </canvas>
      <TopBar SelectedTool={SelectedTool} SetSelectedTool={SetSelectedTool} />
    </div>
  );
}

function TopBar({
  SelectedTool,
  SetSelectedTool,
}: {
  SelectedTool: Tool;
  SetSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}
    >
      <IconButton
        icon={<Pencil />}
        onClick={() => {
          SetSelectedTool("pencil");
        }}
        activated={SelectedTool == "pencil"}
      />
      <IconButton
        icon={<RectangleHorizontalIcon />}
        onClick={() => {
          SetSelectedTool("rect");
        }}
        activated={SelectedTool == "rect"}
      />
      <IconButton
        icon={<Circle />}
        onClick={() => {
          SetSelectedTool("circle");
        }}
        activated={SelectedTool == "circle"}
      />

      <IconButton
        icon={<Slash />}
        onClick={() => {
          SetSelectedTool("line");
        }}
        activated={SelectedTool == "line"}
      />
    </div>
  );
}
