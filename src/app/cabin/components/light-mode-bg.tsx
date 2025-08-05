import React, { forwardRef } from 'react';
import Image from 'next/image';

const imageAspectRatio = 3;

interface LightModeBGProps {
  handleCinderBlocksBoxClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCupboardClick: ()=> void;
  cupboardOpen: boolean
}

export const LightModeBG =  forwardRef<HTMLDivElement, LightModeBGProps>(({onCupboardClick, handleCinderBlocksBoxClick, cupboardOpen}:LightModeBGProps, ref) => {
  
  return (
    <>
      {/*visual background elements, dont put events here*/}

      <div
        className="h-fit w-fit overflow-x-scroll overscroll-x-none"
        style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})`}}>
            
        <Image
          src={`https://wiiiy.github.io/cabin/cabin/background/background_light/cupboard_${cupboardOpen?"open":"closed"}.png`}
          className="absolute pointer-events-none z-21"
          alt="plug" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
      />
      </div>

      {/*cinderblock hitbox*/}
      <div
        ref={ref}
        className="absolute z-110 left-68 top-110 h-28 w-32 cursor-pointer"
        onClick={handleCinderBlocksBoxClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div>

    {}
      <div className="absolute z-112 left-15 top-25 h-70 w-70 bg-black cursor-pointer bg-black" onClick={onCupboardClick}></div>
    </>
  );
});

LightModeBG.displayName = 'LightModeBG';