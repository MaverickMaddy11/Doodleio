import { PenTool } from "lucide-react";
import { useState } from "react";

export function Roomcomp({
  bright,
  setselected,
  setjoin,
  joint,
}: {
  bright: boolean;
  setselected: React.Dispatch<React.SetStateAction<boolean>>;
  setjoin: React.Dispatch<React.SetStateAction<boolean>>;
  joint: boolean;
}) {
  return (
    <div>
      <div>
        <div className="flex text-8xl">
          <div className="px-2">
            <PenTool className=" h-20 w-20 text-blue-600 " />
          </div>
          <div>DrawTogether</div>
        </div>
        <div className="flex justify-center m-3 ">
          <div className="w-120 text-center text-gray-500">
            Create or join a room to start drawing with friends in real time .
            Share your creativity and collaborate on the same canvas!
          </div>
        </div>
      </div>

      <div className="flex ">
        <div
          onClick={() => {
            setjoin(false);
          }}
        >
          <Cardroom
            bright={bright}
            title="Create a Room "
            content="start a new drawing room and invite others to join. You'll be the the host ! "
            butcont="Create Room "
            setselected={setselected}
            joint={joint}
          />
        </div>
        <div
          onClick={() => {
            setjoin(true);
          }}
        >
          <Cardroom
            bright={bright}
            title="Join a Room "
            content="Enter a room code to join an existing drawing sessinon. "
            butcont="Join Room "
            setselected={setselected}
            joint={joint}
          />
        </div>
      </div>
    </div>
  );
}

export function Cardroom({
  title,
  content,
  butcont,
  bright,
  setselected,
  joint,
}: {
  title: string;
  content: string;
  butcont: string;
  bright: boolean;
  setselected: React.Dispatch<React.SetStateAction<boolean>>;
  joint: boolean;
}) {
  return (
    <div
      className={`m-5 bg-white text-black w-80 p-4 rounded-2xl ${bright ? " shadow-md border border-gray-200 " : ""} `}
    >
      <div className="font-medium text-xl ">{title}</div>
      <div className="text-gray-500">{content}</div>
      <div className="flex justify-end my-4">
        <button
          className="bg-blue-600 text-white px-6 py-3 mx-4 rounded-lg "
          onClick={() => {
            setselected(true);
          }}
        >
          {butcont}
        </button>
      </div>
    </div>
  );
}
