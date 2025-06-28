import { ReactNode } from "react";

export function CompFeature({
  txt1,
  txt2,
  icon,
  light,
}: {
  txt1: string;
  txt2: string;
  icon: ReactNode;
  light: boolean;
}) {
  return (
    <div className="">
      <div
        className={`h-60 w-80 ${light ? " bg-gray-100 " : " bg-white "} rounded-xl text-black `}
      >
        <div className=" w-full flex justify-center ">
          <div className=" p-7 ">{icon}</div>
        </div>
        <div className="w-full flex justify-center text-xl font-semibold ">
          <div>{txt1}</div>
        </div>
        <div className="w-full flex justify-center  ">
          <div className="text-gray-500 text-center pt-3 px-6 ">
            {txt2}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export function Star() {
  return (
    <div>
      <img src="./icons/star-svgrepo-com.svg" />
    </div>
  );
}

export function UserComp() {
  return (
    <div className="h-50 w-80 m-5 bg-white text-black  flex flex-col justify-between  ">
      <div className="w-full ">
        <Star />
      </div>
      <div>
        {" "}
        "DrawLive has transformed how our design team collaborates. The
        real-time features are incredibly smooth and intuitive."
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
