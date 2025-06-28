import { Paintbrush, PaintRoller, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <div className="h-[45vh] w-screen bg-white    text-black  px-40 py-10 ">
      <div className="  ">
        <div className="flex ">
          <Mainfoot />
          <Secondcomp
            heading="Product "
            t1="Features "
            t2="pricing "
            t3="API "
            t4="Integrations "
          />

          <Secondcomp
            heading="Company "
            t1="About  "
            t2="Blog "
            t3="Career"
            t4="Press "
          />
          <Secondcomp
            heading="Support "
            t1="HeadOffice "
            t2="Contact  "
            t3="Privacy "
            t4="Terms  "
          />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-200 mt-5 "></div>
      <div className=" w-full p-5 justify-center  flex m-2 ">
        <div className="text-gray-600 ">
          {" "}
          © 2025 DrawLive. All rights reserved.{" "}
        </div>
      </div>
    </div>
  );
}

function Mainfoot() {
  return (
    <div className="   w-60 ">
      <div className="flex ">
        <div>
          <Paintbrush className=" h-10 w-10 text-blue-600 " />
        </div>
        <div>
          <div className=" text-blue-600 text-3xl  font-bold ">Doodleio</div>
        </div>
      </div>
      <div className="text-gray-500 p-1">
        The ultimate platform for real-time collaborative drawing and creative
        teamwork.
      </div>
      <div className="flex text-gray-500 p-1 ">
        <div className=" mr-2 ">
          <Mail className=" " />
        </div>
        <div>
          <Phone className="" />
        </div>
      </div>
    </div>
  );
}

function Secondcomp({
  heading,
  t1,
  t2,
  t3,
  t4,
}: {
  heading: string;
  t1: string;
  t2: string;
  t3: string;
  t4: string;
}) {
  return (
    <div className="mx-25 mt-1">
      <div className="text-xl font-bold text-blue-600 ">{heading}</div>
      <div className="text-sm text-gray-600  mt-5 ">
        <div className="mt-2 ">{t1}</div>
        <div className="mt-2 ">{t2}</div>
        <div className="mt-2 ">{t3}</div>
        <div className="mt-2 ">{t4}</div>
      </div>
    </div>
  );
}
