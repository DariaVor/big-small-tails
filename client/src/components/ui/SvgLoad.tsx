import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import svgUrl from '../../../public/JSON/Anim1.json'

export default function Spinner(): JSX.Element {
  return (
    <div className="flex justify-center pt-[12%]">
    <Player
      src={svgUrl}
      background='#ffffff'
      speed={1}
      loop
      autoplay
      direction={1}
      className="w-[355px] h-[355px] transition-all duration-1000"
    />
  </div>
  );
}
