import { useRef, useState } from "react"
import Draggable from "react-draggable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

interface laptopWindowProps {
    isOpen:boolean
    onClose: ()=>void
}

interface badge {
    name:string,
    description:string,
    obtained:boolean
}

export function LaptopWindow({isOpen, onClose}: laptopWindowProps){
    const [selectedTab, setSelectedTab] = useState<string>("badges");
    const achievedBadges = 0

    const myRef = useRef(null);
    const tapAudio = useRef<HTMLAudioElement>(null);

    const badgesList : badge[] = [
        {name: "in my own home??", description:"throw a brick at the window, why?", obtained:false},
        {name: "big time nerd", description:"found all 3 flags, how long did that take?", obtained:false},
        {name: "timeout", description:"bad!", obtained:false},
        {name: "the drawer", description:"well that was underwhelming", obtained:false}
    ]
    const badgeAmount = badgesList.length

    function playTap(){
        if (tapAudio.current){
            tapAudio.current.play()
        }
    }
    return (
        <Draggable nodeRef={myRef} cancel=".no-drag">
            <Tabs ref={myRef} className={`absolute z-112 bg-accent-light rounded-lg h-80 w-100 ${isOpen? "visible":"hidden"}`}>
                <TabsList className="absolute bg-background p-1 h-8 w-full rounded-t-lg">
                    <div onClick={onClose} className="absolute right-3 cursor-pointer no-drag">[x]</div>
                    <TabsTrigger className={`no-drag px-2 rounded-lg h-full ${selectedTab === "badges"? 'bg-background-darkened' : 'bg-background'}`} onClick={()=>{setSelectedTab("badges"); playTap()}} value="badges">badges</TabsTrigger>
                    <TabsTrigger className={`no-drag px-2 rounded-lg h-full  ${selectedTab === "flags"? 'bg-background-darkened' : 'bg-background'}`} onClick={()=>{setSelectedTab("flags"); playTap()}} value="flags">flags</TabsTrigger>
                </TabsList>
                <TabsContent value="badges" className="p-2 absolute top-8 w-full text-black no-drag">
                    <div className="overflow-scroll overscroll-none h-full max-h-89">
                        {achievedBadges}/{badgeAmount}</div>
                </TabsContent>
                <TabsContent value="flags" className="p-2 absolute top-8 h-full w-full text-black no-drag">
                    <div className="overflow-scroll overscroll-none h-full max-h-67">
                        Keep in mind all flags are within the main page,<br/> none are in the cabin!
                        <div className="flex flex-col ">
                            <div>
                            <textarea
                                id="first flag"
                                value={''}
                                onChange={()=>{}}
                                placeholder="first flag"
                                rows={1}
                                required className="w-1/2 px-2 mt-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag">     
                            </textarea>
                            <button className="absolute ml-2 mt-2 w-8 h-8 bg-background rounded-lg cursor-pointer text-white">x</button>
                            </div>

                            <div>
                            <textarea
                                id="first flag"
                                value={''}
                                onChange={()=>{}}
                                placeholder="second flag"
                                rows={1}
                                required className="w-1/2 px-2 mt-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag">     
                            </textarea>
                            <button className="absolute ml-2 mt-2 w-8 h-8 bg-background rounded-lg  cursor-pointer text-white">x</button>
                            </div>
                            <div>
                            <textarea
                                id="first flag"
                                value={''}
                                onChange={()=>{}}
                                placeholder="third flag"
                                rows={1}
                                required className="w-1/2 px-2 mt-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag">     
                            </textarea>
                            <button className="absolute ml-2 mt-2 w-8 h-8 bg-background rounded-lg cursor-pointer text-white">x</button>
                            </div>
                            <div className="text-sm bottom-0 mt-10">
                            And careful with refreshing, I dont keep your data so you might have to re-enter it
                            </div>
                        </div>
                        
                    </div> 
                    </TabsContent>
                <audio src="https://wiiiy.github.io/cabin/sounds/tap.mp3" ref={tapAudio} preload="auto"/>
            </Tabs>
        </Draggable>
    )
}