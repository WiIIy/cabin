import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { useRef, useState } from "react"
import Draggable from "react-draggable";
import Image from "next/image";

interface ScrapBookProps {
  isOpen: boolean;
  onClose: ()=> void;
}

export function ScrapBook ( {isOpen,onClose}: ScrapBookProps){
    const myRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState<string>("home");
    const tapAudio = useRef<HTMLAudioElement>(null);

    function playTap(){
        if (tapAudio.current){
            tapAudio.current.play()
        }
    }

        return (
            <Draggable nodeRef={myRef}>
                <Tabs ref={myRef} defaultValue="home" className={`absolute w-100 h-100 z-120 bg-background z-100 opacity-94 rounded-lg text-black border-1 border-text-normal ${isOpen? 'visible' : 'hidden'}`}>
                <audio src="https://wiiiy.github.io/cabin/sounds/tap.mp3" ref={tapAudio} preload="auto"/>
                <TabsList className="h-8 bg-background-darkened rounded-t-lg">
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "home"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("home"); playTap()}} value="home">home</TabsTrigger>
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "arts"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("arts"); playTap()}} value="arts">arts</TabsTrigger>
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "doodles"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("doodles"); playTap()}} value="doodles">doodles</TabsTrigger>
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "chars"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("chars"); playTap()}} value="chars">chars</TabsTrigger>
                     <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "3D"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("3D"); playTap()}} value="3D">3D</TabsTrigger>
                     <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "misc"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("misc"); playTap()}} value="misc">misc</TabsTrigger>
                    <div className="absolute right-3 top-1 inline align-right text-text-normal cursor-pointer" onClick={onClose}>[X]</div>
                    
                </TabsList>
                    <TabsContent value="home" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89">
                            <div className={"bg-background h-full cursor-default"}>
                                Welcome to the art book! <br/> Here, you can find the various things I&apos;ve worked on. <br/>
                                <br/>
                                Keep in mind things here might be outdated<br/>
                                Last updated: 1st Aug 2025
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="misc" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89">
                            For interesting facts!
                            <div className={"bg-background h-full cursor-default grid grid-flow-row grid-cols-2 gap-1"}>
                                <Image src="https://wiiiy.github.io/cabin/arts/misc/tooth.webp" alt="tooth xray" width={200} height={200}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="doodles" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89">
                            Mostly black n white<br/>
                            <div className={"bg-background h-full cursor-default grid grid-flow-row grid-cols-2 gap-1"}>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_1.png" alt="deers" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_2.png" alt="heart stabber" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_3.png" alt="demon posing i guess" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_4.png" alt="mountain goat" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_5.png" alt="anime styled" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/doodles/bw_6.png" alt="demons" width={200} height={200}/>
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="arts" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89 space-y-2">
                            <div className={"bg-background h-full cursor-default grid grid-flow-row grid-cols-2 gap-1"}>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_1.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_2.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_3.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_4.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_5.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_6.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_7.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_8.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_9.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/detailed/detailed_10.png" alt="demons" width={200} height={200}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="chars" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89">
                            For character portraits
                            <div className={"bg-background h-full cursor-default grid grid-flow-row grid-cols-2 gap-1"}>
                                <Image src="https://wiiiy.github.io/cabin/arts/characters/char_1.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/characters/char_2.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/characters/char_3.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/characters/char_4.png" alt="demons" width={200} height={200}/>
                                <Image src="https://wiiiy.github.io/cabin/arts/characters/char_5.png" alt="demons" width={200} height={200}/>
                                 <Image src="https://wiiiy.github.io/cabin/arts/characters/char_6.png" alt="demons" width={200} height={200}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="3D" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full max-h-89">
                            TBA!
                            <div className={"bg-background h-full cursor-default grid grid-flow-row grid-cols-2 gap-1"}>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </Draggable>
        )
}