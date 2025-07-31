"use client"

import Image from "next/image"
const imageAspectRatio = 3;

export function CabinBG (){
    return (
        <div
            className="h-fit w-fit overflow-x-scroll overscroll-x-none"
            style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})` }}
        >
            <Image src={"/cabin/cabin_bg_placeholder.png"} className="" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
        </div>
    )
}