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
  SquareChevronRight,
  SquareChevronLeft,
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
    game?.init();
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
      <TopBar
        SelectedTool={SelectedTool}
        SetSelectedTool={SetSelectedTool}
        g={game}
      />
    </div>
  );
}

function TopBar({
  SelectedTool,
  SetSelectedTool,
  g,
}: {
  SelectedTool: Tool;
  SetSelectedTool: (s: Tool) => void;
  g?: Game;
}) {
  const [slideno, getslideno] = useState(0);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}
    >
      <div className=" text-3xl text-white p-2">{slideno}</div>
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

      <IconButton
        icon={<SquareChevronRight />}
        onClick={() => {
          if (slideno + 1 <= 5) {
            console.log("slide is increased ");
            g?.nextSlide();
            getslideno((slideno) => slideno + 1);
          }
        }}
        activated={false}
      />

      <IconButton
        icon={<SquareChevronLeft />}
        onClick={() => {
          if (slideno - 1 >= 0) {
            console.log("slide is decreased ");
            g?.prevSlide();
            getslideno((slideno) => slideno - 1);
          }
        }}
        activated={false}
      />
    </div>
  );
}
