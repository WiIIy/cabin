import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { useRef, useState } from "react"
import Draggable from "react-draggable";

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
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "misc"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("misc"); playTap()}} value="misc">misc</TabsTrigger>
                    <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "horror"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("horror"); playTap()}} value="horror">horror</TabsTrigger>
                    <div className="absolute right-3 top-1 inline align-right text-text-normal cursor-pointer" onClick={onClose}>[X]</div>
                </TabsList>
                    <TabsContent value="home" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full">
                            <div className={"bg-background h-full cursor-default"}>
                                Welcome to the art book! <br/> Here, you can find the various things I&apos;ve worked on. <br/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="misc" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full">
                            <div className={"bg-background h-full cursor-default"}>
                                For interesting facts! <br/>
                            </div>
                        </div>
                    </TabsContent>


                    <TabsContent value="horror" className="p-2 text-text-normal">
                        <div className="overflow-scroll overscroll-none h-full">
                            <div className={"bg-background h-full cursor-default"}>
                                For scary things! <br/>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </Draggable>
        )
}