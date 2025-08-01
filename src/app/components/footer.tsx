"use client"
import { useTheme } from "next-themes";

export function Footer(){
    const { theme} = useTheme();
    
    return (
        <p className={`absolute bottom-1/6 left-1/2 -translate-x-1/2 text-center ${theme=="dark"? 'text-accent-dark':'text-text-normal'}`}></p>
    )
}