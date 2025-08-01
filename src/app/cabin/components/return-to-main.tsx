import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

export function ReturnToHome(){
    const {theme} = useTheme();
    const isDark = theme==="dark"? true: false;

    return (
        <div className="absolute  h-10 w-10 left-1/4 -translate-x-15/10 top-5 z-10">
            <Link href={"/"}>
            <Image
                src={`${isDark? "/icons/house_dark.png": "/icons/house_light.png"}`}
                alt="cabin"
                width={60}
                height={180}
                unoptimized={true}
                style={{ imageRendering: 'pixelated' }}
            />
            </Link>
        </div>
    )
}