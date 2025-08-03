import Image from "next/image";
import { useEffect, useRef, useState } from "react";
interface darkModeBGProps {
    onPosterClick: ()=>void;
}

const imageAspectRatio=3;
export function DarkModeBG({onPosterClick}: darkModeBGProps){
    const [plugIn, setPlugIn] = useState<boolean>(false);
    const [laptopGlowToggle, setLaptopGlowToggle] = useState(false);

    const laptopHumAudio = useRef<HTMLAudioElement>(null);
    const plugInAudio= useRef<HTMLAudioElement>(null);
    const plugOutAudio = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let glowInterval: NodeJS.Timeout | null = null;
        if (plugIn) {
            glowInterval = setInterval(() => {
                setLaptopGlowToggle(prev => !prev);
            }, 500);
        }

        return () => {
            if (glowInterval) {
                clearInterval(glowInterval);
            }
        };
    }, [plugIn]);
    
    return (
        <>
    
        {/*purely visual bg items*/}
        {/*DO NOT PUT ONCLICK EVENTS HERE*/}
        <div
            className="h-fit w-fit overflow-x-scroll overscroll-x-none"
            style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})` }}
        >
            {/*cable plug*/}
            <Image
                src={`https://wiiiy.github.io/cabin${plugIn? "/cabin/background/background_dark/plug_in.png" : "/cabin/background/background_dark/plug_out.png"}`}
                className="absolute pointer-events-none z-21"
                alt="plug" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
            />

            {/*laptop glow*/}
            {plugIn && (
                    <Image
                        src={`https://wiiiy.github.io/cabin${laptopGlowToggle ? "/cabin/background/background_dark/laptop_glow_cdodge1.png" : "/cabin/background/background_dark/laptop_glow_cdodge2.png"}`}
                        className="absolute mix-blend-color-dodge pointer-events-none z-20"
                        alt="laptop glow" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                    />
                )}

        </div>

        {/*wood pile*/}
        <div className="absolute opacity-50 z-112 left-120 top-91 h-14 w-42 cursor-pointer">wood pile</div>

        {/*msg board*/}
        <div className="absolute opacity-50 z-112 left-20 top-38 h-40 w-35 cursor-pointer"
        onClick={onPosterClick}
        ></div>

        {/*globe*/}
        <div className="absolute z-112 left-58 top-104 h-46 w-49 cursor-pointer">globe</div>

        {/*picture*/}
        <div className="absolute z-112 left-65 top-35 h-21 w-17 cursor-pointer"></div>

        {/*fire*/}
        <div className="absolute z-112 left-175 top-78 h-26 w-32 cursor-pointer"></div>

        {/*laptop*/}
        <div className={`${plugIn? "": "pointer-events-none"} absolute z-112 left-5 top-75 h-32 w-36 cursor-pointer`}></div>

        {/*laptop plug*/}
        <div className="absolute z-112 left-42 top-98 h-20 w-12 cursor-pointer" onClick={
            ()=>{setPlugIn(!plugIn);                      
            if (plugIn===false && plugInAudio.current && laptopHumAudio.current){
                plugInAudio.current.play();
                laptopHumAudio.current.play()
            } else if (plugIn===true && plugOutAudio.current && laptopHumAudio.current){
                plugOutAudio.current.play();
                laptopHumAudio.current.pause()
            }}      
            }></div>

        {/*audio tags*/}
        <audio ref={laptopHumAudio} src={`https://wiiiy.github.io/cabin/sounds/laptop_hum.mp3`} loop preload="auto" />
        <audio ref={plugInAudio} src={`https://wiiiy.github.io/cabin/sounds/plug_in.mp3`} preload="auto" />
        <audio ref={plugOutAudio} src={`https://wiiiy.github.io/cabin/sounds/plug_out.mp3`} preload="auto" />
        </>
    )
}