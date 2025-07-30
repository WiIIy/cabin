"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client, so we can safely use `mounted` state.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button className="absolute left-5 top-2 z-10" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Image src="/moonicon.png" alt="sun icon" width={50} height={50} ></Image>
      ) : (
        <Image src="/sunicon.png" alt="moon icon" width={50} height={50} ></Image>
      )}
    </button>
  );
}