import { DashRoom } from "./components/room";
import { Sidebar } from "./components/sidebar";
import { Users, User } from "lucide-react";

export default function () {
  return (
    <div className="h-screen w-screen    text-black ">
      <div className="flex justify-between h-full w-full    ">
        <div className="h-full flex-1 ">
          {" "}
          <Sidebar />{" "}
        </div>
        <div className="h-full flex-4 bg-blue-300 ">
          <DashRoom />
        </div>
      </div>
    </div>
  );
}
