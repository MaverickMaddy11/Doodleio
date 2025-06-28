"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className=" h-screen w-screen flex justify-center items-center ">
      <div>
        <input
          type="text"
          placeholder="roomId "
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />

        <button
          onClick={() => {
            console.log(roomId);
            router.push(`/room/${roomId}`);
          }}
        >
          Join Room{" "}
        </button>
      </div>
    </div>
  );
}
