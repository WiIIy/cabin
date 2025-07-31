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
        x: 500,
        y: 300,
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
      {/*speech bubble needs a way to be triggered, for example, it says "my window!" when the cinderblock is thrown at the window*/}
      {/*or will gives a story about the item the user is holding, eg. "i forgot i had a box of cinderblocks" when a player spawns a cinderblock */}
      {/*these speech bubbles time to live is determined by how long the speech text is*/}
      {/*they will always be overridden by newer ones when they are triggered. only one can be active at a time*/}

      {/*when a speech bubble is active, will's image is the talking one, when a speech bubble isnt active, he is reading, every 5-7 seconds or so he blinks*/}
      <div
        ref={tableRef}
        className="absolute bg-accent-dark z-10 left-97 top-70 h-30 w-50 border-2 border-white"
        onClick={handleTableClick}
      >
        <p className="text-white text-center mt-4">Click to grab a cinderblock</p>
      </div> {/*table*/}

      <div className="absolute bg-accent-light z-10 left-97 top-25 h-32 w-50 border-white border-2">
        {/* default state : blinds open, on Click -> close/open depending on previous condition. this state persists on dark and light mode */}
        {/* if blinds open and upon clicking, user is holding a cinderblock, the window breaks, changing the window image but the blinds still work, theyre a separate component */}
        </div> {/*window. clicking it moves the blinds up and down. clicking a cinderblock at it makes it break, but the blinds are still able to be clicked up or down*/}
        {/*only once the window is broken, the user can click the window to get transported to another page. the broken state persists on dark/light theme*/}

      

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

      <CabinBG />
    </div>
  );
}