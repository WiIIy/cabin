// page.tsx
"use client"

import React, { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";
import { useTheme } from "next-themes"; // Import useTheme hook

// Define types for Will's expressions
export type WillExpression = 'reading' | 'blinking' | 'talking' | 'shocked';

export default function Cabin() {
  const { theme } = useTheme();
  const [cinderblocks, setCinderblocks] = useState<Cinderblock[]>([]);
  const [isHoldingCinderblock, setIsHoldingCinderblock] = useState<boolean>(false);
  const [windowBroken, setWindowBroken] = useState<boolean>(false);
  const [blindsDown, setBlindsDown] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<React.ReactNode | null>(null);
  const [willExpression, setWillExpression] = useState<WillExpression>('reading'); // New state for Will's expression
  const [hasClickedTableOnce, setHasClickedTableOnce] = useState<boolean>(false); // New state for first table click

  const tableRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null); // Changed to interval ref

  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (tableRef.current) {
      const newCinderblock: Cinderblock = {
        id: Date.now(),
        x: 500,
        y: 300,
      };
      setCinderblocks(prev => [...prev, newCinderblock]);

      // Only trigger "I forgot..." on the first click
      if (!hasClickedTableOnce) {
        triggerSpeechBubble("I forgot I had a box of cinderblocks!", 2500, 'talking');
        setHasClickedTableOnce(true);
      }
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

    if (!windowBroken && windowRef.current) {
      const windowRect = windowRef.current.getBoundingClientRect();
      const cinderblockWidth = 50; // Based on your Image width
      const cinderblockHeight = 50; // Based on your Image height

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
        triggerSpeechBubble("My window!", 1500, 'shocked'); // Trigger shocked expression
        setCinderblocks([]); // Remove all cinderblocks on window break
      }
    }
  };

  const handleWindowClick = (): void => {
    if (!windowBroken) {
      setBlindsDown(prev => !prev);
    } else {
      console.log("Navigating to another page because window is broken!");
      // window.location.href = '/some-other-broken-window-page';
    }
  };

  // Modified triggerSpeechBubble function with optional expression
  const triggerSpeechBubble = (text: React.ReactNode, durationMs: number, expression: WillExpression = 'talking'): void => {
    // Clear any existing speech timeout
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null; // Clear the ref
    }
    // Clear any existing blinking interval
    if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
        blinkIntervalRef.current = null; // Clear the ref
    }

    setSpeechText(text);
    setWillExpression(expression); // Set Will's expression

    speechTimeoutRef.current = setTimeout(() => {
      setSpeechText(null);
      if (!windowBroken) { // Revert to reading if window not broken
        setWillExpression('reading');
      } else { // Or stay shocked if window broken
        setWillExpression('shocked');
      }
      // Re-initialize blinking after speech
      startBlinkingAnimation();
    }, durationMs);
  };

  // Function to start Will's blinking animation
  const startBlinkingAnimation = () => {
    if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current); // Ensure no duplicate intervals
    }
    // Only start blinking if Will is not talking and window is not broken
    if (willExpression !== 'talking' && willExpression !== 'shocked' && !windowBroken) {
        blinkIntervalRef.current = setInterval(() => {
            setWillExpression('blinking');
            setTimeout(() => {
                setWillExpression('reading');
            }, 300); // Blink duration
        }, Math.random() * (7000 - 5000) + 5000); // Blink every 5-7 seconds
    }
  };

  // Effect to manage Will's expressions and blinking
  useEffect(() => {
    if (windowBroken) {
      setWillExpression('shocked'); // Keep Will shocked if window is broken
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
        blinkIntervalRef.current = null;
      }
      if (speechTimeoutRef.current) { // Clear any ongoing speech timeout if window breaks
          clearTimeout(speechTimeoutRef.current);
          speechTimeoutRef.current = null;
          setSpeechText(null);
      }
    } else if (speechText === null) { // If no speech, revert to reading/blinking
      setWillExpression('reading');
      startBlinkingAnimation(); // Start blinking when not talking/shocked
    }

    // Cleanup function for useEffect
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [speechText, windowBroken]); // Depend on speechText and windowBroken

  // Initial blinking setup when component mounts
  useEffect(() => {
    if (!windowBroken && speechText === null) {
      startBlinkingAnimation();
    }
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, []); // Run once on mount

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
      </div>

      <div
        ref={windowRef}
        className="absolute z-100 left-98 top-25 h-32 w-50 border-white border-2"
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
        willExpression={willExpression} // Pass Will's expression
        currentTheme={theme as 'light' | 'dark'}
      />
    </div>
  );
}