import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LaptopWindow, Badge } from "./laptop-window";

interface darkModeBGProps {
    onPosterClick: () => void;
    plugIn: boolean;
    onCableClick: () => void;

    achievements: Badge[];
    onUnlockAchievement: (name: string) => void;
    onGlobeClick: ()=>void;

    laptopDrawerOpen: boolean;
    onLaptopDrawerClick:()=>void;
}

const imageAspectRatio = 3;
export function DarkModeBG({ onPosterClick, plugIn, onCableClick, achievements, onUnlockAchievement, onGlobeClick,laptopDrawerOpen,onLaptopDrawerClick }: darkModeBGProps) {
    const [laptopGlowToggle, setLaptopGlowToggle] = useState<boolean>(false);
    const [isLaptopUIOpen, setLaptopUIOpen] = useState<boolean>(false);

    const tapAudio = useRef<HTMLAudioElement>(null);

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
                    src={`https://wiiiy.github.io/cabin${plugIn ? "/cabin/background/background_dark/plug_in.png" : "/cabin/background/background_dark/plug_out.png"}`}
                    className="absolute pointer-events-none z-21"
                    alt="plug" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />

                {/*laptop drawer*/}
                <Image
                    src={`https://wiiiy.github.io/cabin/cabin/background/background_dark/laptop_drawer_open.png`}
                    className={`absolute pointer-events-none z-21 ${laptopDrawerOpen? "visible": "hidden"}`}
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

            {/* Pass achievements and onUnlockAchievement to LaptopWindow */}
            <LaptopWindow
                isOpen={isLaptopUIOpen}
                onClose={() => { setLaptopUIOpen(false); if (tapAudio.current) { tapAudio.current.play() } }}
                achievements={achievements}
                onUnlockAchievement={onUnlockAchievement}
            />

            {/*wood pile*/}
            <div className="absolute opacity-50 z-112 left-120 top-91 h-14 w-42 cursor-pointer"></div>

            {/*msg board*/}
            <div className="absolute opacity-50 z-112 left-20 top-38 h-40 w-35 cursor-pointer"
                onClick={onPosterClick}
            ></div>

            {/*globe*/}
            <div className="absolute z-112 left-58 top-104 h-46 w-49 cursor-pointer" onClick={onGlobeClick}></div>

            {/*picture*/}
            <div className="absolute z-112 left-65 top-35 h-21 w-17 cursor-pointer"></div>

            {/*fire*/}
            <div className="absolute z-112 left-175 top-78 h-26 w-32 cursor-pointer"></div>

            {/*laptop*/}
            <div className={`${plugIn ? "" : "pointer-events-none"} absolute z-112 left-5 top-75 h-32 w-36 cursor-pointer`} onClick={() => { setLaptopUIOpen(!isLaptopUIOpen); if (tapAudio.current) { tapAudio.current.play() } }}></div>

            {/*laptop plug*/}
            <div className="absolute z-112 left-42 top-98 h-20 w-12 cursor-pointer" onClick={onCableClick}></div>
            
            {/*laptop drawer*/}
            <div className="absolute z-112 left-27 top-105 -rotate-80 h-7 w-22 cursor-pointer" onClick={onLaptopDrawerClick}></div>

            {/*audio tags*/}
            <audio src="https://wiiiy.github.io/cabin/sounds/tap.mp3" ref={tapAudio} preload="auto" />
        </>
    )
}
