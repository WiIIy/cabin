"use client"

import { useRef, useState } from "react";
import { ButtonWithIcon } from "./icon-button";
import Draggable from "react-draggable";


export function MainButtonArray(){
  const [isAboutTabOpen, setIsAboutTabOpen] = useState(false);
  const [isWorkTabOpen, setIsWorkTabOpen] = useState(false);
  const [isFaqTabOpen, setIsFaqTabOpen] = useState(false);
  const [isLinksTabOpen, setIsLinksTabOpen] = useState(false);
  const [isContactTabOpen, setIsContactTabOpen] = useState(false);
  const myRef = useRef(null);

  const handleOpenAbout = () => {
    setIsAboutTabOpen(!isAboutTabOpen);
  };

  const handleCloseAbout = () => {
    setIsAboutTabOpen(false);
  };

  const handleOpenWork = () => {
    setIsWorkTabOpen(!isWorkTabOpen);
  };

  const handleCloseWork = () => {
    setIsWorkTabOpen(false);
  };

const handleOpenFaq = () => {
    setIsFaqTabOpen(!isFaqTabOpen);
  };

  const handleCloseFaq = () => {
    setIsFaqTabOpen(false);
  };

  const handleOpenLinks = () => {
    setIsLinksTabOpen(!isLinksTabOpen);
  };

  const handleCloseLinks = () => {
    setIsLinksTabOpen(false);
  };

  const handleOpenContact = () => {
    setIsContactTabOpen(!isContactTabOpen);
  };

  const handleCloseContact = () => {
    setIsContactTabOpen(false);
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

         <Draggable handle="strong" nodeRef={myRef}>
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isWorkTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>work</div><div onClick={handleCloseWork}>[X]</div></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none', height:'100%'}}>
              <div className={"bg-background h-full"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
                My artwork can be found on my art cabin(WIP)!
              </div>
            </div>
          </div>
        </Draggable>

        <div className="flex w-full h-full flex-row items-center justify-center">
            <ButtonWithIcon onClick={handleOpenAbout} id="aboutIcon" iconLightSrc={"/icons/about_grey.png"} iconDarkSrc="/icons/about_white.png" text={"about"} alt="about icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenWork} id="workIcon" iconLightSrc={"/icons/work_grey.png"} iconDarkSrc="/icons/work_white.png" text={"work"} alt="work icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenFaq} id="faqIcon" iconLightSrc={"/icons/faq_grey.png"} iconDarkSrc="/icons/faq_white.png" text={"faq"} alt="faq icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenLinks} id="linksIcon" iconLightSrc={"/icons/links_grey.png"} iconDarkSrc="/icons/links_white.png" text={"links"} alt="links icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenContact} id="contactIcon" iconLightSrc={"/icons/contact_grey.png"} iconDarkSrc="/icons/contact_white.png" text={"contact"} alt="conact icon"></ButtonWithIcon>
        </div>
        </>
    )
}
