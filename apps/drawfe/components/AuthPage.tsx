"use client";

import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/app/config";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Header } from "./header";
import { User, Mail, Lock } from "lucide-react";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setemail] = useState("");
  const router = useRouter();

  const [username, SetUsername] = useState("");
  const [password, Setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [bright, setbright] = useState(false);

  return (
    <div className="w-screen h-screen ">
      <Header
        isSignin={isSignin}
        setbright={setbright}
        bright={bright}
        loggedin={false}
      ></Header>
      <div
        className={`w-screen h-screen  justify-center items-center flex ${bright ? " bg-white text-black " : " bg-black text-white  "}`}
      >
        <div>
          <div className="justify-center flex text-5xl font-bold">
            <div>
              Join the{" "}
              <span className="text-blue-500">creative community</span>{" "}
            </div>
          </div>

          <div className="flex justify-center m-2">
            <div className="text-base w-140 text-center ">
              Create, Share and Collablorate on drawings in real-time. Join now
              and unleash your creativity
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="p-5 bg-white rounded  ">
              <div className="p-2 flex ">
                <div className="p-1">
                  <Mail className="text-gray-300 w-5 h-5" />
                </div>

                <input
                  type="text"
                  placeholder="email"
                  className="text-black shadow-sm"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 flex ">
                <div className="px-1">
                  <User className="text-gray-300  w-5 h-5 " />
                </div>
                <input
                  type="text"
                  placeholder="username"
                  className="text-black shadow-sm"
                  onChange={(e) => {
                    SetUsername(e.target.value);
                  }}
                ></input>
              </div>
              <div className="p-2 flex ">
                <div className="px-1">
                  <Lock className="text-gray-300  w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="password"
                  className="text-black shadow-sm"
                  onChange={(e) => {
                    Setpassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className="p-2 flex ">
                <div className="px-1">
                  <Lock className="text-gray-300  w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="confirm-password"
                  className=" border-none text-black shadow-sm "
                  onChange={(e) => {
                    setcpassword(e.target.value);
                  }}
                ></input>
              </div>

              <div className="w-full flex justify-center ">
                <button
                  className="text-black p-2 bg-blue-600 rounded  text-white "
                  onClick={() => {
                    isSignin
                      ? Signinfun({ email, username, password, router })
                      : Signupfun({ email, username, password, router });
                  }}
                >
                  {isSignin ? "SignIn" : "SignUp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function Signupfun({
  email,
  username,
  password,
  router,
}: {
  email: string;
  username: string;
  password: string;
  router: AppRouterInstance;
}) {
  console.log("signup fun ");
  try {
    const data = await axios.post(`${HTTP_BACKEND}/signup`, {
      username: email,
      password: password,
      name: username,
    });
    router.push("/signin");
  } catch (e) {
    console.log("there is some error ");
  }
}

async function Signinfun({
  email,
  username,
  password,
  router,
}: {
  email: string;
  username: string;
  password: string;
  router: AppRouterInstance;
}) {
  console.log("signing fun ");
  try {
    const data = await axios.post(`${HTTP_BACKEND}/signin`, {
      username: email,
      password: password,
      name: username,
    });
    //@ts-ignore
    console.log(data.data.token);
    //@ts-ignore
    if (data.data.token) {
      //@ts-ignore
      localStorage.setItem("authorization", data.data.token);
      router.push("/room");
    }
  } catch (e) {
    console.log("there is problem in logging  ");
  }
}
