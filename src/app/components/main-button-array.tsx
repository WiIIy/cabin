"use client"

import { useRef, useState } from "react";
import { ButtonWithIcon } from "./icon-button";
import Draggable from "react-draggable";
import { FaqTabCollapsible } from "./faq-tab-collapsibles";
import { InteractiveAvatar } from "./avatar";
import Link from "next/link";


export function MainButtonArray(){
  const [isAboutTabOpen, setIsAboutTabOpen] = useState(false);
  const [isWorkTabOpen, setIsWorkTabOpen] = useState(false);
  const [isFaqTabOpen, setIsFaqTabOpen] = useState(false);
  const [isLinksTabOpen, setIsLinksTabOpen] = useState(false);
  const [isContactTabOpen, setIsContactTabOpen] = useState(false);
  const myRef = useRef(null);
  const tapAudio = useRef<HTMLAudioElement>(null);
  

  const handleOpenAbout = () => {
    playTap();
    setIsAboutTabOpen(!isAboutTabOpen);
  };
  const handleCloseAbout = () => {
    playTap();
    setIsAboutTabOpen(false);
  };
  const handleOpenWork = () => {
    playTap();
    setIsWorkTabOpen(!isWorkTabOpen);
  };
  const handleCloseWork = () => {
    playTap();
    setIsWorkTabOpen(false);
  };
  const handleOpenFaq = () => {
    playTap();
    setIsFaqTabOpen(!isFaqTabOpen);
  };
  const handleCloseFaq = () => {
    playTap();
    setIsFaqTabOpen(false);
  };
  const handleOpenLinks = () => {
    playTap();
    setIsLinksTabOpen(!isLinksTabOpen);
  };
  const handleCloseLinks = () => {
    playTap();
    setIsLinksTabOpen(false);
  };
  const handleOpenContact = () => {
    playTap();
    setIsContactTabOpen(!isContactTabOpen);
  };
  const handleCloseContact = () => {
    playTap();
    setIsContactTabOpen(false);
  };
  function playTap(){
    if (tapAudio.current){
            tapAudio.current.play()
        }
  }

    return (
        <>
        {/*audio files*/}
        <audio src="https://wiiiy.github.io/cabin/sounds/tap.mp3" ref={tapAudio} preload="auto"/>

        {/*about tab*/}
        <Draggable handle="strong" nodeRef={myRef} cancel=".no-drag">
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isAboutTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>about</div><button onClick={handleCloseAbout} className="no-drag">[X]</button></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none'}}>
              <div className={"bg-background justify-between"} style={{cursor:'pointer', padding:10}}>
                
                <InteractiveAvatar/><br/> 
                ID-based artist, designer, developer, <br/>
                I..<br/>
                <br/>

                <ul>
                  <li>&#x2022; draw interesting concepts (link to the page)</li>
                  <li>&#x2022; create assets for games</li>
                  <li>&#x2022; model things in 3D</li>
                  <li>&#x2022; do frontend web development</li>
                </ul>
                <br/>
                <strong>Education<br/></strong>
                Bachelor of Information Systems (on-going)<br/>
                University of Indonesia<br/>
                <br/>
                
                <strong>Language<br/></strong>
                <ul>
                  <li>&#x2022; English (Fluent)</li>
                  <li>&#x2022; Indonesian (Fluent)</li>
                </ul>

                <br/>

                <strong>Other Interests<br/></strong>
                <ul>
                  <li>&#x2022; gamedev</li>
                  <li>&#x2022; chess</li>
                  <li>&#x2022; ethical hacking</li>
                </ul>
                <br/>
              </div>
            </div>
          </div>
        </Draggable>

        {/*work tab*/}
         <Draggable handle="strong" nodeRef={myRef} cancel=".no-drag">
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isWorkTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>work</div><button onClick={handleCloseWork} className="no-drag">[X]</button></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none', height:'100%'}}>
              <div className={"bg-background h-full"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
                My artwork can be found on my <p className="inline underline"><Link href={"/cabin"} className="no-drag">cabin(WIP)</Link></p>!
              </div>
            </div>
          </div>
        </Draggable>

        {/*faq tab*/}
        <Draggable handle="strong" nodeRef={myRef} cancel=".no-drag">
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isFaqTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>faq</div><button onClick={handleCloseFaq} className="no-drag">[X]</button></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none', height:'100%'}}>
              <FaqTabCollapsible/>
            </div>
          </div>
        </Draggable>

        {/*links tab*/}
        <Draggable handle="strong" nodeRef={myRef} cancel=".no-drag">
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isLinksTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>links</div><button onClick={handleCloseLinks} className="no-drag">[X]</button></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none', height:'100%'}}>
              <div className={"bg-background mt-8 h-full grid grid-rows-2 grid-cols-3"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
                <a href="https://github.com/WiIIy" className="no-drag"><ButtonWithIcon onClick={()=>{}} id="githubicon" iconLightSrc={"/icons/github_grey.png"} iconDarkSrc="/icons/github_white.png" text={"f4lcon/wiIIy"} alt="github icon"></ButtonWithIcon></a>
                <a href="https://discord.com/" className="no-drag"><ButtonWithIcon onClick={()=>{}} id="discordicon" iconLightSrc={"/icons/discord_grey.png"} iconDarkSrc="/icons/discord_white.png" text={"deer.dance"} alt="discord icon"></ButtonWithIcon></a>
              </div>
            </div>
          </div>
        </Draggable>

        {/*contact tab*/}
        <Draggable handle="strong" nodeRef={myRef} cancel=".no-drag">
          <div ref={myRef} className={`absolute box z-10 border-2 border-text rounded-lg no-cursor  ${isContactTabOpen ? 'visible' : 'invisible'}`} style={{display: 'flex', flexDirection: 'column', height:'50%', overflow:'hidden'}}>
            <strong className="flex justify-between p-2 cursor-pointer bg-accent-dark text-white"><div>contact</div><button onClick={handleCloseContact} className="no-drag">[X]</button></strong>
            <div style={{overflow: 'scroll', overscrollBehavior:'none', height:'100%'}}>
              <div className={"bg-background h-full text-center"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
                You can mail me at <br/><a className="underline no-drag"href="mailto:willydoesthings@gmail.com">willydoesthings@gmail.com</a>
              </div>
            </div>
          </div>
        </Draggable>

        <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-1 sm:flex sm:flex-row items-center justify-center">
            <ButtonWithIcon onClick={handleOpenAbout} id="aboutIcon" iconLightSrc={"/icons/about_grey.png"} iconDarkSrc="/icons/about_white.png" text={"about"} alt="about icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenWork} id="workIcon" iconLightSrc={"/icons/work_grey.png"} iconDarkSrc="/icons/work_white.png" text={"work"} alt="work icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenFaq} id="faqIcon" iconLightSrc={"/icons/faq_grey.png"} iconDarkSrc="/icons/faq_white.png" text={"faq"} alt="faq icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenLinks} id="linksIcon" iconLightSrc={"/icons/links_grey.png"} iconDarkSrc="/icons/links_white.png" text={"links"} alt="links icon"></ButtonWithIcon>
            <ButtonWithIcon onClick={handleOpenContact} id="contactIcon" iconLightSrc={"/icons/contact_grey.png"} iconDarkSrc="/icons/contact_white.png" text={"contact"} alt="conact icon"></ButtonWithIcon>
        </div>
        </>
    )
}
