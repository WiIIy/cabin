"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger,} from "@radix-ui/react-hover-card"
import { useTheme } from "next-themes";
import Image from "next/image"

export function FlagHover(){
    const {theme} = useTheme();
    const isDark = theme==="dark"? true : false;
    
    return (
        <div className="sm:absolute sm:h-10 sm:w-10 sm:right-1/80 sm:bottom-1/40 sm:cursor-pointer">
            <HoverCard>
            <HoverCardTrigger href="cabin">
                <Image
                    src={`https://wiiiy.github.io/cabin${isDark?"/icons/flag_white.png":"/icons/flag_grey.png"}`}
                    alt="flags"
                    width={60}
                    height={180}
                    unoptimized={true}
                    style={{ imageRendering: 'pixelated' }}
                />
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="border-1 border-accent-dark rounded-lg bg-accent-light p-1 text-sm text-accent-dark">Can you find the flags hidden in this page?</div>
            </HoverCardContent>
        </HoverCard>
    </div>
    )
}