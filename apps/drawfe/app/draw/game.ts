import { Romanesco, Sora } from "next/font/google";
import { getExsistingShapes } from ".";
import { Tool } from "@/components/Canvas";

type Shape =
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
    }
  | {
      type: "pencil";
      points: [number, number][];
    }
  | {
      type: "line";
      x: number;
      y: number;
      finalx: number;
      finaly: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingshape: Shape[];
  private roomId: string;
  private socket: WebSocket;
  private clicked: boolean;
  private startx: number;
  private starty: number;
  private selectedTool: Tool = "circle";
  private arr: [number, number][] = [];
  private slide: number;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingshape = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandler();
    this.startx = 0;
    this.starty = 0;
    this.arr = [];
    this.initMouseHandler();
    this.slide = 0;
  }

  setShape(tool: Tool) {
    this.selectedTool = tool;
  }

  nextSlide() {
    if (this.slide + 1 <= 5) {
      this.slide++;
      this.init();
    }
  }

  prevSlide() {
    if (this.slide - 1 >= 0) {
      this.slide--;
      this.init();
    }
  }

  getslide() {
    return this.slide;
  }

  async init() {
    this.existingshape = await getExsistingShapes(this.roomId, this.slide);
    this.clearCanvas();
  }

  initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat" && message.slide == this.slide) {
        console.log(this.slide);
        const parsedShape = JSON.parse(message.message);
        this.existingshape.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingshape.map((shape) => {
      if (shape.type == "rect") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type == "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerx,
          shape.centery,
          shape.radius,
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type == "pencil") {
        const arr: [number, number][] = shape.points;

        if (Array.isArray(arr) && arr.length > 0 && Array.isArray(arr[0])) {
          this.ctx.beginPath();
          this.ctx.moveTo(arr[0][0], arr[0][1]);

          for (let i = 1; i < arr.length; i++) {
            this.ctx.lineTo(arr[i][0], arr[i][1]);
            this.ctx.stroke();
          }

          this.ctx.closePath();
        } else {
          console.warn(
            "Skipping pencil shape with invalid or empty points array:",
            arr
          );
        }
      } else if (shape.type == "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.x, shape.y);
        this.ctx.lineTo(shape.finalx, shape.finaly);
        this.ctx.stroke();
      }
    });
  }
  //@ts-ignore
  mouseDownhandler = (e) => {
    this.clicked = true;
    this.startx = e.clientX;
    this.starty = e.clientY;
    if (this.selectedTool == "pencil") {
      this.arr = [];
      this.ctx.beginPath();
      this.ctx.moveTo(this.startx, this.starty);
      this.arr.push([this.startx, this.starty]);
    }
  };

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
    this.canvas.removeEventListener("mouseup", this.mouseUphandler);
    this.canvas.removeEventListener("mousemove", this.mouseMovehandler);
  }
  //@ts-ignore
  mouseUphandler = (e) => {
    this.clicked = false;
    console.log("up");
    console.log(e.clientX);
    console.log(e.clientY);
    let shape: Shape | null = null;

    const width = e.clientX - this.startx;
    const height = e.clientY - this.starty;
    //@ts-ignore
    const selectedTool = this.selectedTool;
    if (selectedTool == "rect") {
      shape = {
        type: "rect",
        x: this.startx,
        y: this.starty,
        height,
        width,
      };
    } else if (selectedTool == "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerx: this.startx + radius,
        centery: this.starty + radius,
        radius: radius,
      };
    } else if (selectedTool == "pencil") {
      shape = {
        type: "pencil",
        points: this.arr,
      };
    } else if (selectedTool == "line") {
      shape = {
        type: "line",
        x: this.startx,
        y: this.starty,
        finalx: e.clientX,
        finaly: e.clientY,
      };
    }
    if (!shape) {
      return;
    }

    this.existingshape.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        //@ts-ignore
        roomId: this.roomId,
        slide: this.slide,
      })
    );
  };
  //@ts-ignore
  mouseMovehandler = (e) => {
    if (this.clicked) {
      const width = e.clientX - this.startx;
      const height = e.clientY - this.starty;
      this.ctx.strokeStyle = "rgba(255,255,255)";
      //@ts-ignore
      const selectedTool = this.selectedTool;
      if (selectedTool == "rect") {
        this.clearCanvas();
        this.ctx.strokeRect(this.startx, this.starty, width, height);
      } else if (selectedTool == "circle") {
        this.clearCanvas();
        const centerx = this.startx + width / 2;
        const centery = this.starty + height / 2;
        const radius = Math.max(width, height) / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (selectedTool == "pencil") {
        this.arr.push([e.clientX, e.clientY]);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
      } else if (selectedTool == "line") {
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.moveTo(this.startx, this.starty);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
      }
    }
  };

  initMouseHandler() {
    this.canvas.addEventListener("mousedown", this.mouseDownhandler);

    this.canvas.addEventListener("mouseup", this.mouseUphandler);

    this.canvas.addEventListener("mousemove", this.mouseMovehandler);
  }
}
