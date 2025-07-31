"use client"

import Image from "next/image"
const imageAspectRatio = 3;

export function CabinBG (){
    return (
        <div
            className="h-fit w-fit overflow-x-scroll overscroll-x-none"
            style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})` }}
        >
            {/*users do not interact with any of these directly. the image states are controlled by the elements on the main page*/}

            {/*cabin light mode*/}
            <Image src={"/cabin/background/background_light/cabin_bg_light.png"} className="absolute pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_light/tableNwindow.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_light/lights1_cdodge_24opcty.png"} className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_light/lights2_cdodge_24opcty.png"} className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_light/blinds_up.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_light/blinds_down.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
           
            {/*cabin dark mode*/}
            <Image src={"/cabin/background/background_dark/cabin_bg_dark.png"} className="absolute pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_dark/tableNwindow_dark.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_dark/lights1_cdodge_24opcty_dark.png"} className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_dark/lights2_cdodge_24opcty_dark.png"} className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_dark/blinds_up_dark.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/background_dark/blinds_down_dark.png"} className="absolute z-10 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
           

            {/*no need for dark/light versions*/}
            {/*the 2 windowshine images will switch to one another to make a little shakey effect, giving a little dynamic*/}
            {/*once the user clicks the window with a cinderblock, the 2 windowshines will stop and it will just become the static cracked image*/}
            <Image src={"/cabin/background/windowshine1_overlay.png"} className="absolute z-88 mix-blend-overlay pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/windowshine2_overlay.png"} className="absolute z-88 mix-blend-overlay pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/background/window_crack.png"} className="absolute z-88 mix-blend-overlay pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>

            {/*cabin dark mode*/}

            {/*will light mode*/}
            {/*only one of the reading/blinking/talking images will appear at a time, talking images will appear when a speechbubble is active*/}
            <Image src={"/cabin/will/will_reading_light.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/will/will_blinking_light.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/will/will_talking_light.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>

            {/*will dark mode*/}
            <Image src={"/cabin/will/will_reading_dark.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/will/will_blinking_dark.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
            <Image src={"/cabin/will/will_talking_dark.png"} className="absolute z-88 pointer-events-none" alt="a" width={1800} height={600} unoptimized={true} style={{imageRendering:'pixelated'}}/>
        </div>
    )
}