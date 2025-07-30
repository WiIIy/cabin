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
        <Draggable handle="strong" nodeRef={myRef}>
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isAboutTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>about</div><div onClick={handleCloseAbout}>[X]</div></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none'}}>
              <div className={"bg-background"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
                Will *not my real name, I use an alias for stuff on the internet <br/>
ID-based freelance artist, designer, developer, I..<br/>
<br/>
- draw interesting concepts (link to the page)<br/>
- create assets for games<br/>
- model things in 3D<br/>
- do frontend web development<br/>
<br/>
Education<br/>
Bachelor of Information Systems (on-going)<br/>
University of Indonesia<br/>
<br/>
Language<br/>
- English (Fluent)<br/>
- Indonesian (Fluent)<br/>
<br/>
Other Interests<br/>
- gamedev<br/>
- chess<br/>
- ethical hacking<br/>
<br/>
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
