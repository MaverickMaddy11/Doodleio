"use client";

import { useEffect, useRef, useState } from "react";
import { Headerlanding } from "./header";
import { Header } from "./header";
import { withRouter } from "next/router";
import Image from "next/image";
import doodle from "./icons/hero3.png";
import { useRouter } from "next/navigation";
type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
};

export function Hero({ bright }: { bright: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const setCanvasDimension = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimension();
    window.addEventListener("resize", setCanvasDimension);

    const colors = ["#3B82F6", "#8B5CF6", "#0D9488", "#F59E0B"];
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x + p.radius > canvas.width || p.x - p.radius < 0) p.speedX *= -1;
        if (p.y + p.radius > canvas.height || p.y - p.radius < 0)
          p.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // if (bright) {
            //   ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            // } else {
            //   ctx.strokeStyle = "white";
            // }
            console.log({ bright });
            ctx.strokeStyle = bright ? "rgba(0, 0, 0, 0.1)" : "gray";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasDimension);
    };
  }, [bright]);

  return (
    <div
      className={` h-screen  w-screen ${bright ? " bg-white text-black " : " bg-gray-900 text-white "} static`}
    >
      <canvas ref={canvasRef} className=" absolute top-0 left-0" />

      <div className="  absolute top-0 left-0  w-full h-full  ">
        <div className=" w-full pt-50  ">
          <div className="flex  justify-center ">
            <div className="pr-10">
              <div className="text-6xl w-100 font-semibold  ">
                Unleash Your Creativity on{" "}
                <span className="text-blue-600"> Doodle</span>{" "}
              </div>
              <div className="w-130 py-7 text-xl text-gray-500">
                The ultimate digital canvas for artists, designers, and creative
                professionals. Create stunning artwork with intuitive tools and
                seamless collaboration
              </div>
              <div className="flex ">
                <div className="pr-3">
                  <Button
                    txt="Try Doodle Now ! "
                    onClick={() => {
                      router.push("/signup");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="h-full w-100 bg-white shadow-2xl border-1 border-gray-100 rounded-2xl relative flex justify-center align-center  ">
                <Image
                  src={doodle}
                  alt=""
                  className=" w-full  h-auto  rounded-2xl "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({ txt, onClick }: { txt: string; onClick: () => void }) {
  return (
    <div className=" rounded-xl bg-blue-600  p-4 text-white ">
      <button onClick={onClick}> {txt}</button>
    </div>
  );
}
