"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HTTP_BACKEND } from "../config";
import axios from "axios";
import { Header } from "@/components/header";
import { Roomcomp } from "./comp";
import { Palette, Users, ArrowLeft } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "domain";

async function getRoomId(slug: string) {
  const response = await axios.get(`${HTTP_BACKEND}/room/${slug}`);
  console.log(response);
  return response.data.room.id;
}

async function createRoom(slug: string) {
  const response = await axios.post(
    `${HTTP_BACKEND}/room`,
    {
      name: slug,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
}

export default function Home() {
  const [slug, setslug] = useState("");
  const router = useRouter();
  const [bright, setbright] = useState(false);
  const [selected, setselected] = useState(false);
  const [joint, setjoin] = useState(false);

  return (
    <div
      className={`  h-screen w-screen flex justify-center items-center ${bright ? " bg-white text-black  " : " bg-black text-white "} `}
    >
      <div className="fixed top-0 left-0">
        <Header bright={bright} setbright={setbright} loggedin={true}></Header>
      </div>

      {!selected && (
        <Roomcomp
          bright={bright}
          setselected={setselected}
          setjoin={setjoin}
          joint={joint}
        />
      )}

      {selected && (
        <Roomcomp2
          slug={slug}
          setslug={setslug}
          router={router}
          bright={bright}
          setselected={setselected}
          joint={joint}
          setjoint={setjoin}
        />
      )}
    </div>
  );
}

function Roomcomp2({
  slug,
  setslug,
  router,
  bright,
  setselected,
  joint,
  setjoint,
}: {
  slug: string;
  setslug: React.Dispatch<React.SetStateAction<string>>;
  router: AppRouterInstance;
  bright: boolean;
  setselected: React.Dispatch<React.SetStateAction<boolean>>;
  joint: boolean;
  setjoint: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [joinerror, setjoinerror] = useState(false);
  return (
    <div>
      <div className="flex ">
        <Palette className="w-15 h-15 text-blue-600" />
        <div className="text-5xl mx-3 font-bold">
          {" "}
          Let Your <span className="text-blue-600">Creativity</span> Flow{" "}
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="text-gray-500">
          When words fails creativity speaks !{" "}
        </div>
      </div>

      <div className="flex  justify-center ">
        <div
          className={`bg-white text-black rounded rounded-xl overflow-hidden m-4 ${bright ? "shadow-2xl border border-gray-200 " : " "}`}
        >
          <div className="flex justify-center bg-blue-600 p-3  text-white  ">
            <div className="flex ">
              <div>
                <Users className="h-7 w-7" />
              </div>
              <div className="text-lg mx-2 font-bold">
                {joint ? (
                  <div>Join a Room</div>
                ) : (
                  <div>Create a Room </div>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="m-5">
            <div className="text-sm text-gray-500">
              {joint ? (
                <div>Enter a room name to join a conversation </div>
              ) : (
                <div>Enter a room name to create room and fun </div>
              )}
            </div>
            <div className="m-2">
              <input
                className="text-lg p-2 border border-gray-400 rounded-lg w-full "
                type="text"
                placeholder="Enter room name to join   "
                onChange={(e) => {
                  setslug(e.target.value);
                }}
              />
            </div>
            <div className="m-2">
              <button
                className="w-full bg-blue-600 p-3 rounded-lg text-white  "
                onClick={async () => {
                  try {
                    if (!joint) {
                      await createRoom(slug);
                    }
                    const roomid = await getRoomId(slug);
                    console.log(roomid);
                    router.push(`canvas/${roomid}`);
                    setjoinerror(false);
                  } catch (e) {
                    setjoinerror(true);
                  }
                }}
              >
                {joint ? "Join Room " : " Create Room "}
              </button>
            </div>
          </div>

          <div className="bg-gray-100 p-3 flex justify-center text-xs  text-gray-500">
            {" "}
            <div>
              Need help?<span className="text-blue-600">Read our guide</span> or
              <span className="text-blue-600">contact support</span>{" "}
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="flex justify-center m-5">
        {" "}
        <div className="rounded-full bg-blue-600 p-2">
          <ArrowLeft
            className="text-white"
            onClick={() => {
              setselected(false);
            }}
          ></ArrowLeft>{" "}
        </div>
      </div>
      <div className="flex justify-center m-5">
        {joinerror && (
          <div className="text-red-300 text-xs"> wrong room name</div>
        )}
      </div>
    </div>
  );
}
