import { CompFeature } from "./Component";
import {
  Group,
  Users,
  Brush,
  Smartphone,
  Share2,
  Palette,
  Zap,
  Download,
} from "lucide-react";
export function Features({ bright }: { bright: boolean }) {
  return (
    <div
      className={`h-screen w-screen ${bright ? " bg-white text-black " : " bg-gray-900 text-white  "}`}
    >
      <div className="  w-full">
        <div className="w-full justify-center flex ">
          <div className=" text-6xl font-bold p-1 ">
            Everything You Need to{" "}
            <span className="text-blue-600 "> Create </span>
          </div>
        </div>

        <div className=" w-full justify-center flex text-gray-400 p-1 text-xl">
          <div>
            Powerful features designed for artists, designers, and creative
            teams who want to collaborate seamlessly.
          </div>
        </div>
      </div>

      {/* components */}
      <div className=" flex justify-center m-20 ">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <CompFeature
              txt1="Real-time Collaboration "
              txt2="Draw simultaneously with multiple users. See every stroke appear instantly as your team creates together. "
              icon={<Users className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
          <div>
            <CompFeature
              txt1="Professional Tools"
              txt2="Complete set of drawing tools including brushes, shapes, layers, and advanced color palettes for professional artwork. "
              icon={<Palette className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
          <div>
            <CompFeature
              txt1="Lightning Fast "
              txt2="Ultra-low latency drawing with smooth 120fps rendering. Every stroke feels natural and responsive. "
              icon={<Zap className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
          <div>
            <CompFeature
              txt1="Export Anywhere  "
              txt2="Save your creations in multiple formats including PNG, SVG, PDF, and share directly to social platforms. "
              icon={<Download className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
          <div>
            <CompFeature
              txt1=" Brush & Tool Variety "
              txt2="Choose from pencils, pens, markers, erasers, shapes, fill tools, and more."
              icon={<Brush className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
          <div>
            <CompFeature
              txt1="Real-time Collaboration "
              txt2="Draw simultaneously with multiple users. See every stroke appear instantly as your team creates together. "
              icon={<Users className=" w-10 h-10 text-blue-500 " />}
              light={bright}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
