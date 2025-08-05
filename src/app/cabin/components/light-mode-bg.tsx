import React, { forwardRef } from 'react';
import Image from 'next/image';

const imageAspectRatio = 3;

interface LightModeBGProps {
  handleCinderBlocksBoxClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCupboardInsideClick: ()=> void;
  cupboardOpen: boolean
  onCupboardClick:()=>void
  cinderBoxFell:boolean;
  onTopOfCupboardClick:()=>void;
}

export const LightModeBG =  forwardRef<HTMLDivElement, LightModeBGProps>(({onCupboardClick, handleCinderBlocksBoxClick, cupboardOpen, onCupboardInsideClick, cinderBoxFell, onTopOfCupboardClick}:LightModeBGProps, ref) => {
  
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

      {/*initial cinderblock hitbox*/}
      <div className={`${cinderBoxFell?"pointer-events-none":""} absolute z-111 left-53 top-12 h-15 w-23 cursor-pointer`} onClick={onTopOfCupboardClick}></div>

      {/*final cinderblock hitbox*/}
      <div
        ref={ref}
        className={`${cinderBoxFell?"":"pointer-events-none"} absolute z-110 left-58 top-105 h-32 w-36 cursor-pointer`}
        onClick={handleCinderBlocksBoxClick}
      >
        <p className="text-white text-center mt-4"></p>
      </div>

    {/*cupboard*/}
      <div className={`absolute z-112  ${cupboardOpen? "left-48 w-30" :"left-15 w-63"} top-25 h-82 cursor-pointer`} onClick={onCupboardClick}></div>

    {/*cupboard inside*/}
      <div className={`absolute z-111 left-15 top-25 h-82 w-33 cursor-pointer`} onClick={onCupboardInsideClick}></div>

    
    </>
  );
});

LightModeBG.displayName = 'LightModeBG';