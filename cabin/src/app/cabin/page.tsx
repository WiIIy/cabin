// page.tsx
"use client"

import React, { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";
import { useTheme } from "next-themes"; // Import useTheme hook

export default function Cabin() {
  const { theme } = useTheme(); // Get current theme
  const [cinderblocks, setCinderblocks] = useState<Cinderblock[]>([]);
  const [isHoldingCinderblock, setIsHoldingCinderblock] = useState<boolean>(false); // Global holding state
  const [windowBroken, setWindowBroken] = useState<boolean>(false); // State for window break
  const [blindsDown, setBlindsDown] = useState<boolean>(false); // State for blinds
  const [speechText, setSpeechText] = useState<React.ReactNode | null>(null); // State for speech bubble text
  const [isWillTalking, setIsWillTalking] = useState<boolean>(false); // State for Will's talking sprite
  const [isWillBlinking, setIsWillBlinking] = useState<boolean>(false); // State for Will's blinking sprite

  const tableRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null); // Ref for the window div
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (tableRef.current) {
      const newCinderblock: Cinderblock = {
        id: Date.now(),
        x: 500,
        y: 300,
      };
      setCinderblocks(prev => [...prev, newCinderblock]);
      triggerSpeechBubble("I forgot I had a box of cinderblocks!", 2500); // Trigger speech bubble on spawn
    }
  };

  const handleDeleteCinderblock = (idToDelete: number): void => {
    setCinderblocks(prev => prev.filter(block => block.id !== idToDelete));
  };

  const handleDragStartCinderblock = (): void => {
    setIsHoldingCinderblock(true);
  };

  const handleDragStopCinderblock = (id: number, finalPosition: { x: number; y: number }): void => {
    setIsHoldingCinderblock(false);
    // Check for collision with window only if window is not already broken
    if (!windowBroken && windowRef.current) {
      const windowRect = windowRef.current.getBoundingClientRect();
      // Approximate cinderblock size for collision (adjust if cinderblock Image size changes)
      const cinderblockWidth = 50;
      const cinderblockHeight = 50;

      // Calculate cinderblock's absolute position
      const cinderblockX = finalPosition.x;
      const cinderblockY = finalPosition.y;

      // Simple AABB collision detection
      if (
        cinderblockX < windowRect.right &&
        cinderblockX + cinderblockWidth > windowRect.left &&
        cinderblockY < windowRect.bottom &&
        cinderblockY + cinderblockHeight > windowRect.top
      ) {
        console.log("Cinderblock hit the window!");
        setWindowBroken(true);
        triggerSpeechBubble("My window!", 1500); // Trigger speech bubble on window break
        // Optional: remove all cinderblocks or just the one that hit
        setCinderblocks([]); // Remove all cinderblocks on window break
      } else {
        // If it didn't hit the window, let it fall (handled by DraggableCinderblock's default behavior)
      }
    }
  };

  const handleWindowClick = (): void => {
    if (!windowBroken) {
      setBlindsDown(prev => !prev); // Toggle blinds if window is not broken
    } else {
      // If window is broken, navigate to another page (example: '/')
      // For now, let's just log a message
      console.log("Navigating to another page because window is broken!");
      // window.location.href = '/some-other-broken-window-page'; // Uncomment to actually navigate
    }
  };

  const triggerSpeechBubble = (text: React.ReactNode, durationMs: number): void => {
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    setSpeechText(text);
    setIsWillTalking(true);
    setIsWillBlinking(false); // Stop blinking while talking

    speechTimeoutRef.current = setTimeout(() => {
      setSpeechText(null);
      setIsWillTalking(false);
    }, durationMs);
  };

  // Will's blinking animation
  useEffect(() => {
    const startBlinking = () => {
      if (!isWillTalking && !windowBroken) { // Only blink if not talking and window is not broken
        setIsWillBlinking(true);
        blinkTimeoutRef.current = setTimeout(() => {
          setIsWillBlinking(false);
          blinkTimeoutRef.current = setTimeout(startBlinking, Math.random() * (7000 - 5000) + 5000); // Blink again after 5-7 seconds
        }, 300); // Blink duration
      } else if (isWillTalking || windowBroken) {
        setIsWillBlinking(false); // Ensure blinking is off if talking or window broken
        if (blinkTimeoutRef.current) {
          clearTimeout(blinkTimeoutRef.current);
        }
      }
    };

    if (!isWillTalking && !windowBroken) {
        startBlinking();
    }

    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [isWillTalking, windowBroken]);


  return (
    <div className="absolute h-screen w-fit overscroll-none">
      <ThemeToggle className="left-1/4 top-5" />

      {/* Speech Bubble */}
      {speechText && <SpeechBubble text={speechText} />}

      <div
        ref={tableRef}
        className="absolute bg-accent-dark z-10 left-97 top-70 h-30 w-50 border-2 border-white"
        onClick={handleTableClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div> {/*table*/}

      <div
        ref={windowRef}
        className="absolute bg-accent-light z-10 left-97 top-25 h-32 w-50 border-white border-2"
        onClick={handleWindowClick} // Click handler for window/blinds/navigation
      >
        {/* The visual representation of the window and blinds will be handled by CabinBG */}
      </div> {/*window. clicking it moves the blinds up and down. clicking a cinderblock at it makes it break, but the blinds are still able to be clicked up or down*/}
      {/*only once the window is broken, the user can click the window to get transported to another page. the broken state persists on dark/light theme*/}

      {cinderblocks.map((block: Cinderblock) => (
        <DraggableCinderblock
          key={block.id}
          id={block.id}
          initialPosition={{ x: block.x, y: block.y }}
          onDelete={handleDeleteCinderblock}
          onDragStart={handleDragStartCinderblock}
          onDragStop={handleDragStopCinderblock} // Pass the modified handler
          disableFallingAnimation={windowBroken} // Pass prop to disable fall
        />
      ))}

      <CabinBG
        blindsDown={blindsDown}
        windowBroken={windowBroken}
        isWillTalking={isWillTalking}
        isWillBlinking={isWillBlinking}
        currentTheme={theme as 'light' | 'dark'} // Pass current theme
      />
    </div>
  );
}