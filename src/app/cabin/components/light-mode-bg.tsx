import React, { forwardRef } from 'react';

// Define the type for the props that LightModeBG expects.
interface LightModeBGProps {
  handleCinderBlocksBoxClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onWardrobeClick: ()=> void;
}

// 1. Wrap the component with `forwardRef`.
//    The first generic type is for the DOM element the ref will point to (HTMLDivElement).
//    The second is for the component's props (LightModeBGProps).
export const LightModeBG =  forwardRef<HTMLDivElement, LightModeBGProps>(({onWardrobeClick, handleCinderBlocksBoxClick}:LightModeBGProps, ref) => {
  // Destructure the handler from props.
  
  return (
    <>
      <div
        // 2. Attach the `ref` passed from the parent to your desired DOM element.
        ref={ref}
        className="absolute z-110 left-68 top-110 h-28 w-32 cursor-pointer"
        // 3. Attach the `onClick` handler from props.
        onClick={handleCinderBlocksBoxClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div>

      <div className="absolute z-112 left-15 top-25 h-70 w-70 bg-black cursor-pointer" onClick={onWardrobeClick}></div>
    </>
  );
});

LightModeBG.displayName = 'LightModeBG';