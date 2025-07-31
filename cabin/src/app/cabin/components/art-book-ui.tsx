import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { useRef, useState } from "react"
import Draggable from "react-draggable";


export function ScrapBook (){
    const myRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState<string>("home");
    const [scrapBookOpen, setScrapBookOpen] = useState<boolean>(false);

        return (
            <Draggable nodeRef={myRef}>
            <Tabs ref={myRef} defaultValue="home" className={`absolute w-100 h-100 z-120 bg-background z-100 opacity-94 rounded-lg text-black border-1 border-text-normal ${scrapBookOpen? 'visible' : 'hidden'}`}>
            <TabsList className="h-8 bg-background-darkened rounded-t-lg">
                <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "home"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("home")}} value="home">home</TabsTrigger>
                <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "misc"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("misc")}} value="misc">misc</TabsTrigger>
                <TabsTrigger className={`h-full px-2 rounded-t-lg text-text-normal cursor-pointer ${selectedTab === "horror"? 'bg-background' : 'bg-background-darkened'}`} onClick={()=>{setSelectedTab("horror")}} value="horror">horror</TabsTrigger>
                <div className="absolute right-3 top-1 inline align-right text-text-normal" onClick={()=>{setScrapBookOpen(false)}}>[X]</div>
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