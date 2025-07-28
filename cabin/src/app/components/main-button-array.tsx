"use client"

import { useRef, useState } from "react";
import { ButtonWithIcon } from "./icon-button";
import Draggable from "react-draggable";


export function MainButtonArray(){
  const [isAboutTabOpen, setIsAboutTabOpen] = useState(false);
  const myRef = useRef(null);

  const handleOpenAbout = () => {
    setIsAboutTabOpen(!isAboutTabOpen);
  };

  const handleCloseAbout = () => {
    setIsAboutTabOpen(false);
  };

    return (
        <>
        {/* <Draggable nodeRef={myRef} >
            <div ref={myRef} className={`absolute bg-accent-light top-0 pointer-events-none left-0 h-1/2 w-1/2 ${isAboutTabOpen ? 'opacity-100' : 'opacity-0'}`} id="aboutTab">
                <div className="handle">Drag from here</div>
            </div>
        </Draggable> */}
        <Draggable handle="strong" nodeRef={myRef}>
          <div ref={myRef} className="box no-cursor" style={{display: 'flex', flexDirection: 'column'}}>
            <strong className="cursor"><div>Drag here</div></strong>
            <div style={{overflow: 'scroll'}}>
              <div style={{background: 'yellow', whiteSpace: 'pre-wrap'}}>
                I have long scrollable content with a handle
                {'\n' + Array(40).fill('x').join('\n')}
              </div>
            </div>
          </div>
        </Draggable>

        <div className="flex w-full h-full items-center">
            <ButtonWithIcon onClick={handleOpenAbout} id="aboutIcon" iconLightSrc={"/icons/about_grey.png"} iconDarkSrc="/icons/about_white.png" text={"about"} alt="bub"></ButtonWithIcon>
        </div>
        </>
    )
}
