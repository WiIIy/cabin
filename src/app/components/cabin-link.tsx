"use client"

import { useTheme } from "next-themes";
import Image from "next/image"
import Link from "next/link";
import { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger,} from "@radix-ui/react-hover-card"

export function CabinLink(){
    const {theme} = useTheme();
    const isDark = theme==="dark"? true : false;
    const [cabinToggle, setCabinToggle] = useState(false);

    useEffect(() => {
        let lightInterval: NodeJS.Timeout;
            // eslint-disable-next-line prefer-const
            lightInterval = setInterval(() => {
                setCabinToggle(prev => !prev);
            }, 1000); // Toggle every 1 second

        return () => clearInterval(lightInterval);
    }, []);

    return(
        <div  className="absolute right-1/8  top-1/2 -translate-y-9/10 cursor-pointer">
            <HoverCard>
            {/*https://wiiiy.github.io/cabin*/}
            <HoverCardTrigger>
                <a href={"cabin"}>
            <Image
                src={`https://wiiiy.github.io/cabin${
                    cabinToggle
                        ? (isDark ? "/icons/cabin_icon_dark_1.png" : "/icons/cabin_icon_light_1.png")
                        : (isDark ? "/icons/cabin_icon_dark_2.png" : "/icons/cabin_icon_light_2.png")
                }`}
                alt="cabin"
                width={60}
                height={180}
                unoptimized={true}
                style={{ imageRendering: 'pixelated' }}
            />
            </a>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="border-1 border-accent-dark rounded-lg bg-accent-light p-1 text-sm text-accent-dark">This will take you to <br/> an adjacent site!</div>
            </HoverCardContent>
            {/* <Image src="/icons/cabin_icon_dark_1.png" width={60} height={180} unoptimized={true} alt="cabin" style={{imageRendering:'pixelated'}} /> */}
        </HoverCard>
    </div>
    )  
}