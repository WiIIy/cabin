"use client"

import { useState } from "react";
import { ButtonWithIcon } from "./icon-button";


export function MainButtonArray(){
  const [isAboutTabOpen, setIsAboutTabOpen] = useState(false);

  const handleOpenAbout = () => {
    setIsAboutTabOpen(!isAboutTabOpen);
  };

  const handleCloseAbout = () => {
    setIsAboutTabOpen(false);
  };

    return (
        <>
        <div className={`absolute bg-accent-light top-0 pointer-events-none left-0 h-1/2 w-1/2 ${isAboutTabOpen ? 'opacity-100' : 'opacity-0'}`} id="aboutTab">
        </div>

        <div className="flex w-full h-full items-center">
            <ButtonWithIcon onClick={handleOpenAbout} id="aboutIcon" iconLightSrc={"/icons/about_grey.png"} iconDarkSrc="/icons/about_white.png" text={"about"} alt="bub"></ButtonWithIcon>
        </div>
        </>
    )
}
