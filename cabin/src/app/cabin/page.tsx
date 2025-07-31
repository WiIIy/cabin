"use client"

import React, { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";

export default function Cabin() {
  const [cinderblocks, setCinderblocks] = useState<Cinderblock[]>([]);
  const [isHoldingCinderblock, setIsHoldingCinderblock] = useState<boolean>(false); // Global holding state
  const [windowBroken, setWindowBroken] = useState<boolean>(false); // State for window break
  const tableRef = useRef<HTMLDivElement>(null);

  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (tableRef.current) {
      const rect = tableRef.current.getBoundingClientRect();
      const newCinderblock: Cinderblock = {
        id: Date.now(),
        x: rect.left,
        y: rect.top,
      };
      setCinderblocks(prev => [...prev, newCinderblock]);
    }
  };

  const handleDeleteCinderblock = (idToDelete: number): void => {
    setCinderblocks(prev => prev.filter(block => block.id !== idToDelete));
  };

  const handleDragStartCinderblock = (): void => {
    setIsHoldingCinderblock(true);
  };

  const handleDragStopCinderblock = (): void => {
    setIsHoldingCinderblock(false);
  };

  const handleWindowTap = (): void => {
    if (isHoldingCinderblock) {
      console.log("Window breaks!");
      setWindowBroken(true);
      // You might want to remove all cinderblocks or just the one being held
      // For now, let's just make the window "broken"
    }
  };

  // Example of reacting to windowBroken (e.g., stopping all cinderblocks)
  useEffect(() => {
    if (windowBroken) {
      // Logic to handle all cinderblocks when window breaks.
      // For instance, you might want to immediately delete them or stop any ongoing animations.
      // This part depends on your game logic for "breaking".
      // Example: If you want all currently dragged cinderblocks to just disappear:
      // setCinderblocks([]); // This would remove all of them
    }
  }, [windowBroken]);


  return (
    <div className="absolute h-screen w-fit overscroll-none" onClick={handleWindowTap}> {/* Add onClick to main div */}
      <ThemeToggle className="left-1/4 top-5" />

      <SpeechBubble text="wewaewaeawewa" />
      <div
        ref={tableRef}
        className="absolute bg-accent-dark z-10 left-97 top-70 h-30 w-50 border-2 border-white"
        onClick={handleTableClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div>

      <CabinBG />

      {cinderblocks.map((block: Cinderblock) => (
        <DraggableCinderblock
          key={block.id}
          id={block.id}
          initialPosition={{ x: block.x, y: block.y }}
          onDelete={handleDeleteCinderblock}
          onDragStart={handleDragStartCinderblock} // Pass global state setter
          onDragStop={handleDragStopCinderblock}   // Pass global state setter
          disableFallingAnimation={windowBroken}   // Pass prop to disable fall
        />
      ))}

      {windowBroken && (
        <div className="absolute inset-0 bg-red-500 opacity-50 flex items-center justify-center z-50">
          <p className="text-white text-4xl font-bold">WINDOW BROKEN!</p>
        </div>
      )}
    </div>
  );
}