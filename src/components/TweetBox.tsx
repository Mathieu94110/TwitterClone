import React, { useState } from "react";
import Image from "next/image";
import {
  PhoneIcon,
  MagnifyingGlassCircleIcon,
  FaceSmileIcon,
  CameraIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
function TweetBox() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex space-x-2 p-5">
      <Image
        src="https://www.buzzwebzine.fr/wp-content/uploads/2022/10/actus-elon-musk-tesla-cybertruck-twitter-robot-optimus-ia-1-1024x576.jpg"
        alt="elon musk"
        width={40}
        height={40}
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="flex flex-1 items-center pl-2 md:block">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Que se passe t'il ?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex flex-1 space-x-2 text-twitter">
            <PhoneIcon className="h-5 w-5 cursor-pointer transitiontransform duration-150 ease-out hover:scale-150" />
            <MagnifyingGlassCircleIcon className="h-5 w-5" />
            <FaceSmileIcon className="h-5 w-5" />
            <CameraIcon className="h-5 w-5" />
            <CalendarIcon className="h-5 w-5" />
            <MapPinIcon className="h-5 w-5" />
          </div>
          <div>
            <button
              disabled={!input}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweeter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
