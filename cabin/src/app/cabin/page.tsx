// page.tsx
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";
import { useTheme } from "next-themes";

// Define types for Will's expressions
export type WillExpression = 'reading' | 'blinking' | 'talking' | 'shocked'| 'really' ;

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

  // Refs to hold the latest state values for use in memoized callbacks
  const willExpressionRef = useRef(willExpression);
  const speechTextRef = useRef(speechText);

  // Update refs whenever the state changes
  useEffect(() => {
    willExpressionRef.current = willExpression;
  }, [willExpression]);

  useEffect(() => {
    speechTextRef.current = speechText;
  }, [speechText]);


  // Function to start blinking animation
  const startBlinkingAnimation = useCallback(() => {
    // Ensure no duplicate intervals are running
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }

    // Check current state using refs before starting interval
    // Only start blinking if Will is in 'reading' state and not shocked/talking/has speech
    if (willExpressionRef.current === 'reading') {
      blinkIntervalRef.current = setInterval(() => {
        // Use functional update to ensure latest state for blinking
        setWillExpression(prev => {
          // Only blink if current state is reading and no speech
          if (willExpressionRef.current === 'reading' && speechTextRef.current === null) { // Use ref for latest state
            return 'blinking';
          }
          return prev; // Don't change if already talking/shocked/etc.
        });

        setTimeout(() => {
          // Revert to reading if still blinking and conditions allow
          setWillExpression(prev => {
            if (willExpressionRef.current === 'blinking') { // Use ref for latest state
              return 'reading';
            }
            return prev;
          });
        }, 300); // Blink duration
      }, Math.random() * (5000 - 3000) + 3000); // Blink every 3-5 seconds
    }
  }, []); // Dependencies for useCallback: only windowBroken as it's outside ref/state

  // Function to clear speech bubble and reset Will's expression
  const clearSpeechAndResetExpression = useCallback(() => {
    setSpeechText(null);
    // Only revert to reading if not currently shocked or talking
    if (willExpressionRef.current !== 'reading' && willExpressionRef.current !== 'shocked' ) { // Use ref for latest state
      setWillExpression('reading');
    }
    // Restart blinking animation if applicable
    startBlinkingAnimation();
  }, [startBlinkingAnimation]); // Depend on startBlinkingAnimation

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
      // Use willExpressionRef.current to check the latest state
      if (willExpressionRef.current !== 'talking' && willExpressionRef.current !== 'shocked' && willExpressionRef.current !== 'really') {
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
    // Get the window's position relative to the parent
    const windowRect = {
      left: windowRef.current.offsetLeft,
      top: windowRef.current.offsetTop,
      right: windowRef.current.offsetLeft + windowRef.current.offsetWidth,
      bottom: windowRef.current.offsetTop + windowRef.current.offsetHeight,
    };

    const cinderblockWidth = 50;
    const cinderblockHeight = 50;

    // Calculate the actual position of the cinderblock relative to the same coordinate system
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
      triggerSpeechBubble("My window!", 1700, 'shocked');
      setCinderblocks([]); // Remove all cinderblocks after breaking the window

      // Set a timeout to change Will's expression back after being shocked
      if (shockTimeoutRef.current) {
        clearTimeout(shockTimeoutRef.current);
      }
      shockTimeoutRef.current = setTimeout(() => {
        triggerSpeechBubble("That was unnecessary...", 2000, 'really');
        // After this speech, ensure Will's expression reverts and blinking resumes
        setTimeout(() => {
          clearSpeechAndResetExpression(); // Explicitly call to reset and restart blinking
        }, 2300); // Duration for "That was unnecessary..."
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
        className="absolute bg-accent-dark z-100 left-235 top-70 h-30 w-50 border-2 border-white cursor-pointer"
      >will book
      </div>
      <div
        className="absolute bg-accent-dark z-100 left-245 top-15 h-30 w-25 border-2 border-white cursor-pointer"
      >will face
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
