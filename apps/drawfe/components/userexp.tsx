import { UserComp } from "./Component";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Design Team Lead at TechCorp",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "DrawLive has transformed how our design team collaborates. The real-time features are incredibly smooth and intuitive.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Creative Director at Studio Nine",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "The best collaborative drawing tool we've used. It feels like everyone is drawing on the same whiteboard.",
    rating: 5,
  },
  {
    name: "Emily Taylor",
    role: "UX Designer at Innovation Labs",
    avatar:
      "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "Simple, powerful, and reliable. DrawLive makes remote design collaboration feel effortless.",
    rating: 4,
  },
];

export function UserExp({ bright }: { bright: boolean }) {
  return (
    <div
      className={`h-[75vh] w-screen ${bright ? " bg-white text-black " : " bg-gray-900 text-white "} `}
    >
      <div className="pt-20">
        <div className=" w-full flex mx-10 justify-center  ">
          <div>
            <div className="  w-full">
              <div className="w-full justify-center flex   ">
                <div className=" text-6xl font-bold p-1 ">
                  Loved By Users{" "}
                  <span className="text-blue-600 ">WorldWide</span>
                </div>
              </div>

              <div className=" w-full justify-center flex text-gray-400 p-1 text-xl">
                <div>
                  Join thousands of artists who've made DrawLive their creative
                  home
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex m-10 w-fyll justify-center ">
          {testimonials.map((testimonial, index) => (
            <div
              className={`h-50 w-70  m-5 text-black flex flex-col justify-between rounded-lg ${bright ? " bg-gray-100   " : " bg-white  "}`}
              key={index}
            >
              <div>
                {/* rating complenent  */}
                <div className="flex m-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={` h-5 w-5 ${i < testimonial.rating ? " text-yellow-400 fill-current  " : " text-gray-300 "}`}
                    />
                  ))}
                </div>

                {/* testimonial  */}

                <div className="m-1 w-full ">{testimonial.content}</div>
              </div>

              {/* user box  */}
              <div className=" flex m-1">
                <div className="  ">
                  <img
                    src={testimonial.avatar}
                    className=" rounded-full h-12 w-12 object-cover mr-1"
                  />
                </div>
                <div>
                  <div className=" font-bold ">{testimonial.name}</div>
                  <div className="text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
