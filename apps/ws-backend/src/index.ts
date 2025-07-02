import { WebSocketServer, WebSocket } from "ws";
import express, { request } from "express";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { parse } from "next/dist/build/swc/generated-native";
import { routeModule } from "next/dist/build/templates/pages";
import { prismaClient } from "@repo/db/clinet";

interface Users {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: Users[] = [];

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    console.log("user is ", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decode == "string") {
      return null;
    }
    //@ts-ignore
    if (!decoded || !decoded.userId) {
      return null;
    }
    //@ts-ignore
    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  console.log("this is url ");
  console.log(url);
  const queryparam = new URLSearchParams(url.split("?")[1]);
  const token = queryparam.get("token") || "";
  console.log("this is token --> ");
  console.log(token);
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type == "join_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        console.error("User not found during join_room");
        return;
      }

      const roomId = parsedData.roomId;
      console.log("room id in ws-backned index.ts  ");
      console.log(roomId);

      if (user.rooms.includes(roomId)) {
        console.log(`User ${user.userId} is already in room ${roomId}`);
      } else {
        user.rooms.push(roomId);
        console.log(`${user.userId} joined room ${roomId}`);
      }
    }

    if (parsedData.type == "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x !== parsedData.room);
    }

    if (parsedData.type == "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      const slide = parsedData.slide;

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
              slide,
            })
          );
        }
      });
      const UserId = userId;

      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          //@ts-ignore
          UserId,
          slide,
        },
      });
    }
  });
});
