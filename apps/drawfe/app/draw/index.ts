import { clear } from "console";
import { validateHeaderName } from "http";
import axios from "axios";
import { HTTP_BACKEND } from "../config";
import { json } from "stream/consumers";
import { parse } from "path";
import { Shapes } from "lucide-react";

export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerx: number;
      centery: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  let existinShapes: Shape[] = await getExsistingShapes(roomId);
  console.log("in index.ts draw >..................");
  console.log(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      existinShapes.push(parsedShape.shape);
      clearCanvas(existinShapes, ctx, canvas);
    }
  };

  let clicked = false;
  let startx = 0;
  let starty = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    console.log("down");
    startx = e.clientX;
    starty = e.clientY;
    console.log(e.clientX);
    console.log(e.clientY);
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    console.log("up");
    console.log(e.clientX);
    console.log(e.clientY);
    let shape: Shape | null = null;

    const width = e.clientX - startx;
    const height = e.clientY - starty;
    //@ts-ignore
    const selectedTool = window.selectedTool;
    if (selectedTool == "rect") {
      shape = {
        type: "rect",
        x: startx,
        y: starty,
        height,
        width,
      };
    } else if (selectedTool == "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerx: startx + radius,
        centery: starty + radius,
        radius: radius,
      };
    }
    if (!shape) {
      return;
    }

    existinShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId,
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startx;
      const height = e.clientY - starty;
      clearCanvas(existinShapes, ctx, canvas);
      ctx.strokeStyle = "rgba(255,255,255";
      //@ts-ignore
      const selectedtool = window.selectedTool;
      if (selectedtool == "rect") {
        ctx.strokeRect(startx, starty, width, height);
      } else if (selectedtool == "circle") {
        const centerx = startx + width / 2;
        const centery = starty + height / 2;
        const radius = Math.max(width, height) / 2;
        ctx.beginPath();
        ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      } else if (selectedtool == "pencil") {
      }
    }
  });
}

function clearCanvas(
  existinShapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existinShapes.map((shape) => {
    if (shape.type == "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type == "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerx, shape.centery, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  });
}

export async function getExsistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });

  return shapes;
}
