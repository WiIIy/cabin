import React, { forwardRef } from 'react';
import Image from 'next/image';

const imageAspectRatio = 3;

interface LightModeBGProps {
  handleCinderBlocksBoxClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCupboardInsideClick: ()=> void;
  cupboardOpen: boolean
  onCupboardClick:()=>void
  cinderBoxFell:boolean;
}

export const LightModeBG =  forwardRef<HTMLDivElement, LightModeBGProps>(({onCupboardClick, handleCinderBlocksBoxClick, cupboardOpen, onCupboardInsideClick, cinderBoxFell}:LightModeBGProps, ref) => {
  
  return (
    <>
      {/*visual background elements, dont put events here*/}

      <div
        className="h-fit w-fit overflow-x-scroll overscroll-x-none"
        style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})`}}>
            
        {/*cupboard*/}
        <Image
          src={`https://wiiiy.github.io/cabin/cabin/background/background_light/cupboard_${cupboardOpen?"open":"closed"}.png`}
          className="absolute pointer-events-none z-21"
          alt="cupboard" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
      />

      {/*cinderblock box*/}
      <Image
          src={`https://wiiiy.github.io/cabin/cabin/background/background_light/cinderblockBox_${cinderBoxFell?"fallen":"up"}.png`}
          className="absolute pointer-events-none z-21"
          alt="cinderbox" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
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

    {/*cupboard*/}
      <div className={`absolute z-112  ${cupboardOpen? "left-48 w-30" :"left-15 w-63"} top-25 h-82 cursor-pointer`} onClick={onCupboardClick}></div>

    {/*cupboard inside*/}
      <div className={`absolute z-111 left-15 top-25 h-82 w-33 cursor-pointer`} onClick={onCupboardInsideClick}></div>

    {/*cinderblock box on top of cupboard*/}
      <div className={`absolute z-111 left-15 top-15 h-15 w-33 bg-black opacity-50 cursor-pointer`}></div>
    </>
  );
});

LightModeBG.displayName = 'LightModeBG';