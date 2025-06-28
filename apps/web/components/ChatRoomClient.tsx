"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  console.log("this is id ");
  console.log(id);

  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);
  const [currentmessage, setcurrentmessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          //@ts-ignore
          roomId: id.id.toString(),
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          //@ts-ignore
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m) => (
        <div>{m.message}</div>
      ))}

      <input
        type="text"
        value={currentmessage}
        onChange={(e) => {
          setcurrentmessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              //@ts-ignore
              roomId: id.id.toString(),
              message: currentmessage,
            })
          );
        }}
      >
        SEND MESSAGE{" "}
      </button>
    </div>
  );
}
