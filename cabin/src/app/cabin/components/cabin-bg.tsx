"use client"

import Image from "next/image"
const imageAspectRatio = 3;

export function CabinBG (){
    return (
        <div
            className="h-full overflow-auto overscroll-x-none"
            style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})` }}
        >
            <Image src={"/cabin/cabin_bg_placeholder.png"} className="h-full w-auto" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
        </div>
    )
}