// cabin-bg.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react";
import { WillExpression } from "../page"; // Import the WillExpression type

const imageAspectRatio = 3;

interface CabinBGProps {
    blindsDown: boolean;
    windowBroken: boolean;
    willExpression: WillExpression; // Changed to single expression prop
    currentTheme: 'light' | 'dark';
}

export function CabinBG({ blindsDown, windowBroken, willExpression, currentTheme }: CabinBGProps) {
    const isDark = currentTheme === 'dark';

    const [lightsToggle, setLightsToggle] = useState(false);
    const [windowShineToggle, setWindowShineToggle] = useState(false);

    // Light animation effect
    useEffect(() => {
        let lightInterval: NodeJS.Timeout;
        if (!blindsDown) { // Only animate lights if blinds are up
            lightInterval = setInterval(() => {
                setLightsToggle(prev => !prev);
            }, 1000); // Toggle every 1 second
        }
        return () => clearInterval(lightInterval);
    }, [blindsDown]);

    // Window shine animation effect
    useEffect(() => {
        let shineInterval: NodeJS.Timeout;
        // Only animate shine if window is not broken and Will is not shocked
        if (!windowBroken && willExpression !== 'shocked') { // Ensure shine stops if window is broken OR Will is shocked
            shineInterval = setInterval(() => {
                setWindowShineToggle(prev => !prev);
            }, 500); // Toggle every 0.5 seconds for a shakey effect
        } else {
            // Stop shine if window broken or Will is shocked
            setWindowShineToggle(false); // Ensure shine image is off
        }
        return () => clearInterval(shineInterval);
    }, [windowBroken, willExpression]); // Added willExpression to dependencies


    return (
        <div
            className="h-fit w-fit overflow-x-scroll overscroll-x-none"
            style={{ minWidth: `calc(var(--vh, 1vh) * 100 * ${imageAspectRatio})` }}
        >
            {/* cabin background (light/dark) */}
            <Image
                src={isDark ? "/cabin/background/background_dark/cabin_bg_dark.png" : "/cabin/background/background_light/cabin_bg_light.png"}
                className="absolute pointer-events-none"
                alt="Cabin Background" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
            />
            {/* table and window (light/dark) */}
            <Image
                src={isDark ? "/cabin/background/background_dark/tableNwindow_dark.png" : "/cabin/background/background_light/tableNwindow.png"}
                className="absolute z-10 pointer-events-none"
                alt="Table and Window" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
            />

            {/* Lights (conditional on blinds and theme) */}
            {!blindsDown && (
                <>
                    {lightsToggle && (
                        <Image
                            src={isDark ? "/cabin/background/background_dark/lights1_cdodge_24opcty_dark.png" : "/cabin/background/background_light/lights1_cdodge_24opcty.png"}
                            className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none"
                            alt="Lights 1" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                        />
                    )}
                    {!lightsToggle && (
                        <Image
                            src={isDark ? "/cabin/background/background_dark/lights2_cdodge_24opcty_dark.png" : "/cabin/background/background_light/lights2_cdodge_24opcty.png"}
                            className="absolute z-100 opacity-24 mix-blend-color-dodge pointer-events-none"
                            alt="Lights 2" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                        />
                    )}
                </>
            )}

            {/* Blinds (conditional on blindsDown state and theme) */}
            <Image
                src={isDark
                    ? (blindsDown ? "/cabin/background/background_dark/blinds_down_dark.png" : "/cabin/background/background_dark/blinds_up_dark.png")
                    : (blindsDown ? "/cabin/background/background_light/blinds_down.png" : "/cabin/background/background_light/blinds_up.png")
                }
                className="absolute z-10 pointer-events-none"
                alt="Blinds" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
            />

            {/* Window Shine or Crack (conditional on windowBroken) */}
            {!windowBroken && !blindsDown && (
                <>
                    {windowShineToggle && (
                        <Image
                            src={"/cabin/background/windowshine1_overlay.png"}
                            className="absolute z-88 mix-blend-overlay pointer-events-none"
                            alt="Window Shine 1" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                        />
                    )}
                    {!windowShineToggle && (
                        <Image
                            src={"/cabin/background/windowshine2_overlay.png"}
                            className="absolute z-88 mix-blend-overlay pointer-events-none"
                            alt="Window Shine 2" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                        />
                    )}
                </>
            )}
            {windowBroken && (
                <Image
                    src={"/cabin/background/window_crack.png"}
                    className="absolute z-88 mix-blend-overlay pointer-events-none"
                    alt="Window Crack" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />
            )}

            {/* Will's Sprites (conditional on expression and theme) */}
            {willExpression === 'talking' && (
                <Image
                    src={isDark ? "/cabin/will/will_talking_dark.png" : "/cabin/will/will_talking_light.png"}
                    className="absolute z-88 pointer-events-none"
                    alt="Will Talking" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />
            )}
            {willExpression === 'blinking' && (
                <Image
                    src={isDark ? "/cabin/will/will_blinking_dark.png" : "/cabin/will/will_blinking_light.png"}
                    className="absolute z-88 pointer-events-none"
                    alt="Will Blinking" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />
            )}
            {willExpression === 'reading' && (
                <Image
                    src={isDark ? "/cabin/will/will_reading_dark.png" : "/cabin/will/will_reading_light.png"}
                    className="absolute z-88 pointer-events-none"
                    alt="Will Reading" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />
            )}
            {willExpression === 'shocked' && (
                <Image
                    src={isDark ? "/cabin/will/will_shocked_dark.png" : "/cabin/will/will_shocked_light.png"} // Assuming you have these images
                    className="absolute z-88 pointer-events-none"
                    alt="Will Shocked" width={1800} height={600} unoptimized={true} style={{ imageRendering: 'pixelated' }}
                />
            )}
        </div>
    )
}