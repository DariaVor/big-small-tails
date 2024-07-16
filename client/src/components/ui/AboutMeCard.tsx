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
    // <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
    //   <div className="h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 flex justify-center items-center">
        // <div className="">
        //   <Player
        //     src={svgUrl}
        //     background={bgColor}
        //     speed={1}
        //     loop
        //     autoplay
        //     direction={1}
        //     className="w-[355px] h-[355px] transition-all duration-1000 hover:w-[390px] hover:h-[390px]"
        //   />
        // </div>
    //   </div>
    //   <div className="p-6">
    //     <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    //       {title}
    //     </h5>
    //     <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
    //       {description}
    //     </p>
    //   </div>
    //   <div className="p-6 pt-0">
    //     <button
    //       className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
    //       type="button"
    //     >
    //       Подробнее
    //     </button>
    //   </div>
    // </div>
    <div
  className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
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
  <div className="flex items-center justify-between p-6">
    <div className="flex items-center -space-x-3">
      <img alt="natali craig"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
        className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
      <img alt="Tania Andrew"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
    </div>
    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
      January 10
    </p>
  </div>
</div> 
  );
}

export default AboutMeCard;
