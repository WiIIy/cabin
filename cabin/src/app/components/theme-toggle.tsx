"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface themeToggleProps {
  className:string
}

export function ThemeToggle({className}:themeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
   const clickAudio = useRef<HTMLAudioElement>(null);

  // useEffect runs only on the client, so we can safely use `mounted` state.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (clickAudio.current){
      clickAudio.current.play()
    }
  };

  return (
    <button className={`absolute z-10 cursor-pointer ${className}`} onClick={toggleTheme}>
      <audio ref={clickAudio} src="/sounds/click.mp3" preload="auto" />
      {theme === "dark" ? (
        <Image src="/moonicon.png" alt="sun icon" width={50} height={50} ></Image>
      ) : (
        <Image src="/sunicon.png" alt="moon icon" width={50} height={50} ></Image>
      )}
    </button>
  );
}