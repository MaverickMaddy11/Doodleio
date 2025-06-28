"use client";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Headerlanding } from "@/components/header";
import { useEffect, useState } from "react";
import { UserExp } from "@/components/userexp";
import { Footer } from "@/components/footer";
import { useRef } from "react";

export default function Home() {
  const [scroll, setscroll] = useState(false);
  const [bright, setbright] = useState(false);
  const homeref = useRef<HTMLDivElement | null>(null);
  const featureref = useRef<HTMLDivElement | null>(null);
  const testimonialref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollhandler = () => {
      setscroll(window.scrollY > 30);
    };
    window.addEventListener("scroll", scrollhandler);
    return () => window.removeEventListener("scroll", scrollhandler);
  }, []);

  return (
    <div className=" overflow-x-hidden ">
      <Headerlanding
        bright={bright}
        setbright={setbright}
        scroll={scroll}
        homeref={homeref}
        featureref={featureref}
        testimonialref={testimonialref}
      />
      <div ref={homeref}>
        <Hero bright={bright} />
      </div>
      <div ref={featureref}>
        <Features bright={bright} />
      </div>
      <div ref={testimonialref}>
        <UserExp bright={bright} />
      </div>
      <Footer />
      {/* <Testimonials /> */}
    </div>
  );
}
