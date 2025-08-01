import { useTheme } from "next-themes";
import Image from "next/image"
import { useEffect, useState } from "react";

const iconWillLight = "/avatar/will_light.png"
const iconWillDark = "/avatar/will_dark.png"
const hoverWillLight = "/avatar/will_light_hover.gif" // Changed to .gif
const hoverWillDark = "/avatar/will_dark_hover.gif" // Placeholder for dark hover gif

export function InteractiveAvatar() {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentIconSrc = resolvedTheme === "dark" ? iconWillDark : iconWillLight;
    const currentHoverSrc = resolvedTheme === "dark" ? hoverWillDark : hoverWillLight;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-row justify-between h-100px w-100px"
        >
            {isHovered ? (
                <Image src={currentHoverSrc} alt={"avatar-hover"} className="bg-accent-light rounded-full" width={90} height={90} />
            ) : (
                <Image src={currentIconSrc} alt={"avatar"} className="bg-accent-light rounded-full" width={90} height={90} />
            )}
            <div className="flex flex-col justify-self-end justify-items-center w-3/4 h-full">
                <p className="inline pl-3 pt-4 text-xl">Willliam F.</p> <p className="text-sm pl-3 inline">*an alias</p>
            </div>
           
        </div>
    )
}