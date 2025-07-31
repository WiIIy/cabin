"use client"

import React, { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import Image from 'next/image';

export interface Cinderblock {
  id: number;
  x: number;
  y: number;
}

interface DraggableCinderblockProps {
  initialPosition: { x: number; y: number };
  onDelete: (id: number) => void;
  id: number;
  onDragStart: () => void; // New prop for global state
  onDragStop: () => void;  // New prop for global state
  disableFallingAnimation?: boolean; // New prop to control fall animation
}

export function DraggableCinderblock({ initialPosition, onDelete, id, onDragStart, onDragStop, disableFallingAnimation = false }: DraggableCinderblockProps) {
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const [currentY, setCurrentY] = useState<number>(initialPosition.y);
  const [currentX, setCurrentX] = useState<number>(initialPosition.x); // New state for X position during fall
  const myRef = useRef<HTMLImageElement>(null);
  const fallSpeed: number = 5;
  const animationFrameRef = useRef<number | null>(null);

  const handleStart: DraggableEventHandler = () => {
    onDragStart(); // Notify parent that dragging has started
  };

  const handleStop: DraggableEventHandler = (e, ui) => {
    onDragStop(); // Notify parent that dragging has stopped
    setCurrentX(ui.lastX); // Use last X from drag for fall start
    setCurrentY(ui.lastY); // Use last Y from drag for fall start

    if (!disableFallingAnimation) {
      setIsFalling(true);
      startFallingAnimation();
    } else {
      onDelete(id); // Immediately delete if falling is disabled
    }
  };

  const startFallingAnimation = (): void => {
    const animateFall = (): void => {
      if (myRef.current) {
        const { bottom } = myRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (bottom < viewportHeight + 100) {
          setCurrentY(prevY => prevY + fallSpeed);
          animationFrameRef.current = requestAnimationFrame(animateFall);
        } else {
          onDelete(id);
        }
      } else {
        onDelete(id);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animateFall);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Draggable
      onStart={handleStart} // Call handleStart
      onStop={handleStop}
      position={isFalling ? { x: currentX, y: currentY } : undefined} // Use currentX and currentY for fall position
      bounds="parent"
      disabled={isFalling || disableFallingAnimation} // Disable dragging when falling or animation is disabled
      nodeRef={myRef}
    >
      <Image
        ref={myRef}
        src="/cabin/cinderblock_light.png"
        alt="Cinderblock"
        className="absolute w-12 h-12 cursor-grab"
        width={50}
        height={50}
        unoptimized={true}
        style={{
          left: initialPosition.x, // Initial X position for the element's CSS
          top: currentY, // Only 'top' for vertical movement controlled by state
          transform: `translate(${currentX - initialPosition.x}px, 0px)`, // Offset based on drag for `Draggable`
          transition: isFalling ? 'none' : 'transform 0s ease-out',
          zIndex: 100,
          imageRendering:'pixelated'
        }}
      />
    </Draggable>
  );
}