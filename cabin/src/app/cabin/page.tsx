// page.tsx
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";
import { useTheme } from "next-themes";

// Define types for Will's expressions
export type WillExpression = 'reading' | 'blinking' | 'talking' | 'shocked';

export default function Cabin() {
  const { theme } = useTheme();
  const [cinderblocks, setCinderblocks] = useState<Cinderblock[]>([]);
  const [isHoldingCinderblock, setIsHoldingCinderblock] = useState<boolean>(false);
  const [windowBroken, setWindowBroken] = useState<boolean>(false);
  const [blindsDown, setBlindsDown] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<React.ReactNode | null>(null);
  const [willExpression, setWillExpression] = useState<WillExpression>('reading');
  const [hasClickedTableOnce, setHasClickedTableOnce] = useState<boolean>(false);
  const [currentSpeechDuration, setCurrentSpeechDuration] = useState<number>(0); // New state to hold duration

  const tableRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const shockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start blinking animation
  const startBlinkingAnimation = useCallback(() => {
    // Ensure no duplicate intervals are running
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }

    // Only start blinking if Will is in 'reading' state and not shocked/talking/has speech
    if (willExpression === 'reading' && !speechText ) {
      blinkIntervalRef.current = setInterval(() => {
        setWillExpression('blinking');
        setTimeout(() => {
          // After a short blink, revert to reading if still in blinking state and conditions allow
          if (!windowBroken && speechText === null) {
            setWillExpression('reading');
          }
        }, 300); // Blink duration
      }, Math.random() * (5000 - 3000) + 3000); // Blink every 3-5 seconds
    }
  }, [willExpression, windowBroken, speechText]); // Dependencies for useCallback

  // Function to clear speech bubble and reset Will's expression
  const clearSpeechAndResetExpression = useCallback(() => {
    setSpeechText(null);
    // Only revert to reading if not currently shocked or talking
    if (willExpression !== 'shocked' && willExpression !== 'talking') {
      setWillExpression('reading');
    }
    // Restart blinking animation if applicable
    startBlinkingAnimation();
  }, [willExpression, startBlinkingAnimation]); // Depend on willExpression and startBlinkingAnimation

  // Function to trigger speech bubble - now only sets states
  const triggerSpeechBubble = (
    text: React.ReactNode,
    durationMs: number,
    expression: WillExpression = 'talking'
  ): void => {
    // Clear any existing blinking interval immediately when new speech starts
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }
    setSpeechText(text);
    setWillExpression(expression);
    setCurrentSpeechDuration(durationMs); // Store duration for the effect
  };

  // useEffect to manage speech bubble timeouts and expression changes
  useEffect(() => {
    // Clear any existing speech timeout to prevent overlap
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    if (speechText !== null) {
      // Set a timeout to clear the speech bubble and reset expression
      speechTimeoutRef.current = setTimeout(() => {
        clearSpeechAndResetExpression();
      }, currentSpeechDuration);
    } else {
      // If speechText is null (e.g., after clearing), ensure blinking restarts if conditions allow
      if (willExpression !== 'talking' && willExpression !== 'shocked') {
        startBlinkingAnimation();
      }
    }

    // Cleanup on component unmount or when dependencies change
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, [speechText, willExpression, currentSpeechDuration, clearSpeechAndResetExpression, startBlinkingAnimation]); // Dependencies for this effect


  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (tableRef.current) {
      const newCinderblock: Cinderblock = {
        id: Date.now(),
        x: 500, // Initial position, adjust as needed
        y: 300, // Initial position, adjust as needed
      };
      setCinderblocks(prev => [...prev, newCinderblock]);

      if (!hasClickedTableOnce) {
        triggerSpeechBubble("I forgot I had a box of cinderblocks!", 3000, 'talking');
        setHasClickedTableOnce(true);
      } else {
        const random = Math.random();
        if (random < 1 / 3) { // 1/3 chance to say something
          const responses = [
            "Careful with that.",
            "I heard they absorb water easily.",
            "Makes okay chalk."
          ];
          const randomIndex = Math.floor(Math.random() * responses.length);
          triggerSpeechBubble(responses[randomIndex], 2000, 'talking');
        } else {
          // 2/3 chance to say nothing
          setSpeechText(null); // Explicitly clear speech text
          setWillExpression('reading'); // Ensure Will goes back to reading
        }
      }
    }
  };

  const handleDeleteCinderblock = (idToDelete: number): void => {
    setCinderblocks(prev => prev.filter(block => block.id !== idToDelete));
  };

  const handleDragStartCinderblock = (): void => {
    setIsHoldingCinderblock(true);
    // When dragging starts, stop blinking and set expression to reading
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }
    setWillExpression('reading');
  };

  const handleDragStopCinderblock = (id: number, finalPosition: { x: number; y: number }): void => {
    setIsHoldingCinderblock(false);

    if (!windowBroken && windowRef.current) {
      const windowRect = windowRef.current.getBoundingClientRect();
      const cinderblockWidth = 50; // Assuming a fixed width for the cinderblock
      const cinderblockHeight = 50; // Assuming a fixed height for the cinderblock

      // Calculate the actual position of the cinderblock relative to the viewport
      const cinderblockRect = {
        left: finalPosition.x,
        top: finalPosition.y,
        right: finalPosition.x + cinderblockWidth,
        bottom: finalPosition.y + cinderblockHeight,
      };

      // Check for intersection
      if (
        cinderblockRect.left < windowRect.right &&
        cinderblockRect.right > windowRect.left &&
        cinderblockRect.top < windowRect.bottom &&
        cinderblockRect.bottom > windowRect.top
      ) {
        setWindowBroken(true);
        triggerSpeechBubble("My window!", 1500, 'shocked');
        setCinderblocks([]); // Remove all cinderblocks after breaking the window

        // Set a timeout to change Will's expression back after being shocked
        if (shockTimeoutRef.current) {
          clearTimeout(shockTimeoutRef.current);
        }
        shockTimeoutRef.current = setTimeout(() => {
          triggerSpeechBubble("That was unnecessary...", 2000, 'talking'); // Will says this after being shocked
          // The subsequent reset to reading and blinking is handled by the useEffect for speech.
          // No need for another nested setTimeout here.
        }, 1500); // Duration for "My window!"
      }
    }
    // After drag stop, if window is not broken, restart blinking
    if (!windowBroken) {
      startBlinkingAnimation();
    }
  };

  const handleWindowClick = (): void => {
    setBlindsDown(prev => !prev);
    // The user wants to be able to click the window even while holding a cinderblock.
    // However, the current logic for breaking the window is tied to onDragStopCinderblock.
    // If you want clicking the window while holding a cinderblock to break it, you'd need
    // to add that logic here, checking if isHoldingCinderblock is true.
    // For now, I'm keeping the breaking logic solely in onDragStopCinderblock as per your
    // initial description of the bug.
    // if (!windowBroken && isHoldingCinderblock) {
    //   setWindowBroken(true);
    //   triggerSpeechBubble("You clicked the window while holding a cinderblock!", 2000, 'shocked');
    //   setCinderblocks([]);
    // }
  };

  // Initial setup for blinking when component mounts
  useEffect(() => {
    // Only start blinking initially if window isn't broken
    if (!windowBroken) {
      startBlinkingAnimation();
    }
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount


  return (
    <div className="absolute h-screen w-fit overscroll-none">
      <ThemeToggle className="left-1/4 top-5" />

      {/* Speech Bubble: Ensure it has a high z-index to be visible */}
      {speechText && <SpeechBubble text={speechText} />}

      <div
        ref={tableRef}
        className="absolute bg-accent-dark z-10 left-97 top-70 h-30 w-50 border-2 border-white cursor-pointer"
        onClick={handleTableClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div>

      <div
        ref={windowRef}
        className="absolute bg-accent-light z-10 left-97 top-25 h-32 w-50 border-white border-2 cursor-pointer"
        onClick={handleWindowClick}
      >
        {/* The visual representation of the window and blinds will be handled by CabinBG */}
      </div>

      {cinderblocks.map((block: Cinderblock) => (
        <DraggableCinderblock
          key={block.id}
          id={block.id}
          initialPosition={{ x: block.x, y: block.y }}
          onDelete={handleDeleteCinderblock}
          onDragStart={handleDragStartCinderblock}
          onDragStop={handleDragStopCinderblock}
          disableFallingAnimation={windowBroken}
        />
      ))}

      <CabinBG
        blindsDown={blindsDown}
        windowBroken={windowBroken}
        willExpression={willExpression}
        currentTheme={theme as 'light' | 'dark'}
      />
    </div>
  );
}
