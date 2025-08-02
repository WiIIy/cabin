"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface IconButtonProps {
  iconLightSrc: string;
  iconDarkSrc: string;
  alt: string;
  id:string;
  text:string;
  onClick?: () => void;
}

export function ButtonWithIcon({
  iconLightSrc,
  iconDarkSrc,
  alt,
  id,
  text,
  onClick,
  ...props
}: IconButtonProps) {
  const [mounted, setMounted] = useState(false);
  const {resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentIconSrc = resolvedTheme === "dark" ? iconDarkSrc : iconLightSrc;

  return (
    <Button id={id} onClick={onClick} {...props} className="flex-col text-lg content-between shadow-none">
      {currentIconSrc && (
        <Image src={`https://wiiiy.github.io/cabin${currentIconSrc}`} className="w-200px h-200px sm:w-75px sm:h-75px" alt={alt} width={75} height={75} /> // Adjust width/height as needed
      )}
      <p className="relative top-1">{text}</p>
    </Button>
  );
}