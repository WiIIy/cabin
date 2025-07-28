"use client"; // If it's a client component

import { Button } from "@/components/ui/button"; // Assuming this path
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
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Determine the correct image source based on the resolved theme
  const currentIconSrc = resolvedTheme === "dark" ? iconDarkSrc : iconLightSrc;

  return (
    <Button id={id} onClick={onClick} {...props} className="flex-col text-(length:--font-size-normal) content-between">
      {currentIconSrc && (
        <Image src={currentIconSrc} alt={alt} width={100} height={100} /> // Adjust width/height as needed
      )}
      <p className="relative top-1">{text}</p>
    </Button>
  );
}