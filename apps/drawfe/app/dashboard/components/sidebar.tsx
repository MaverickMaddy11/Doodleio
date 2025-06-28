"use client";
import { Paintbrush, Users, User, Sun, Moon } from "lucide-react";
import { ReactNode } from "react";
const url =
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400";

export function Sidebar() {
  return (
    <div className="h-full w-full  bg-gray-100  flex flex-col justify-between  ">
      <div>
        <div className=" flex w-full justify-center ">
          <Logo />
        </div>
        <div>
          <Sidecomp icon={<User className="h-7 w-7 " />} txt="Rooms " />
          <Sidecomp icon={<Users className="h-7 w-7 " />} txt="Profile " />
        </div>
      </div>
      <div>
        <div className="flex  ">
          <button className="flex items-center justify-center ">
            <Sun className="h-8 w-8 mr-3" />
          </button>
          <div className="flex justify-center items-center ">Dark Mode</div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex text-blue-600 p-2 font-bold ">
      <div className="">
        <Paintbrush className=" h-12 w-12  " />{" "}
      </div>

      <div className=" text-5xl  "> Doodleio </div>
    </div>
  );
}

function Sidecomp({ icon, txt }: { icon: ReactNode; txt: string }) {
  return (
    <div className=" flex p-2 bg-gray-200 m-2 rounded-lg   ">
      <div className="mx-2 ">{icon}</div>
      <div className=" text-2xl ">{txt}</div>
    </div>
  );
}
