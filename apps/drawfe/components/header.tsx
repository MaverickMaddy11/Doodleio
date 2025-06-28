import { useRouter } from "next/navigation";
import { Paintbrush, Sun } from "lucide-react";
import { Parisienne } from "next/font/google";
import { Navbut } from "./buttonUI";
import React, { ReactElement, ReactNode } from "react";
import { useRef } from "react";

export function Header({
  loggedin,
  isSignin,
  bright,
  setbright,
}: {
  loggedin?: boolean;
  isSignin?: boolean;
  setbright: React.Dispatch<React.SetStateAction<boolean>>;
  bright: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={`flex h-20 w-full fixed justify-between ${bright ? " bg-white text-black " : " bg-black text-white "} `}
    >
      <Logo />
      <div className="flex">
        <div className="py-3">
          <button
            onClick={() => {
              setbright(!bright);
            }}
          >
            <Sun />
          </button>
        </div>
        {!loggedin && (
          <Navbut
            txt={`${isSignin ? "Signup" : "Signin"}`}
            fun={() => {
              if (isSignin) {
                router.push("/signup");
              } else {
                router.push("/signin");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <div className="m-1">
      <div className="flex ">
        <div>
          <Paintbrush className="text-blue-600 h-12 w-12 p-1" />
        </div>
        <div className="text-4xl p-1 font-bold text-blue-600 ">Doodleio</div>
      </div>
    </div>
  );
}

export function Headerlanding({
  scroll,
  setbright,
  bright,
  homeref,
  featureref,
  testimonialref,
}: {
  scroll: boolean;
  setbright: React.Dispatch<React.SetStateAction<boolean>>;
  bright: boolean;
  homeref: React.RefObject<HTMLDivElement | null>;
  featureref: React.RefObject<HTMLDivElement | null>;
  testimonialref: React.RefObject<HTMLDivElement | null>;
}) {
  const scrollto = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 ${bright ? (scroll ? " bg-white text-black " : " bg-white/0 text-black ") : scroll ? " bg-gray-900 text-white " : " bg-gray-900/0 text-white  "}`}
    >
      <div className="flex justify-between  ">
        <div className={""}>
          <Logo />{" "}
        </div>
        <div className=" p-2 flex  ">
          <Buttonlanding txt="Home" onClick={() => scrollto(homeref)} />
          <Buttonlanding txt="Features" onClick={() => scrollto(featureref)} />
          <Buttonlanding
            txt="Testimonials"
            onClick={() => scrollto(testimonialref)}
          />

          <button
            onClick={() => {
              console.log("button clicked ");
              setbright(!bright);
            }}
          >
            <Sun className=" " />
          </button>
        </div>
      </div>
    </div>
  );
}

function Buttonlanding({ txt, onClick }: { txt: string; onClick: () => void }) {
  return (
    <button className=" p-2 text-lg mx-2 " onClick={onClick}>
      {txt}{" "}
    </button>
  );
}
