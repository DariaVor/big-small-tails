import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

type AboutMeCardProps = {
  title: string;
  description: string;
  svgUrl: string;
  bgColor: string;
};

function AboutMeCard({ title, description, svgUrl, bgColor }: AboutMeCardProps): JSX.Element {
  return (
    <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl transition-all hover:scale-[1.05] duration-[400ms]">
      <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
        <Player
          src={svgUrl}
          background={bgColor}
          speed={1}
          loop
          autoplay
          direction={1}
          className="w-[385px] h-[300px]"
        />
      </div>
      <div className="p-6">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {title}
        </h4>
        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AboutMeCard;
