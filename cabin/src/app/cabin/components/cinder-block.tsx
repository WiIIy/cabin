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
  onDragStart: () => void;
  onDragStop: () => void;
  disableFallingAnimation?: boolean;
}

export function DraggableCinderblock({ initialPosition, onDelete, id, onDragStart, onDragStop, disableFallingAnimation = false }: DraggableCinderblockProps) {
  const [isFalling, setIsFalling] = useState<boolean>(false);
  // We'll manage position ourselves after the drag, not relying on Draggable's internal position
  const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
  const myRef = useRef<HTMLImageElement>(null);
  const fallSpeed: number = 5;
  const animationFrameRef = useRef<number | null>(null);

  const handleStart: DraggableEventHandler = () => {
    onDragStart();
    setIsFalling(false); // Ensure it's not falling when a new drag starts
  };

  const handleDrag: DraggableEventHandler = (e, ui) => {
    // During drag, update our internal position state
    // ui.x and ui.y are the absolute coordinates relative to the draggable's parent (or document.body if no parent)
    setPosition({ x: ui.x, y: ui.y });
  };

  const handleStop: DraggableEventHandler = (e, ui) => {
    onDragStop();
    // Set the final position from the drag
    setPosition({ x: ui.x, y: ui.y }); // Use ui.x and ui.y for the drop position

    if (!disableFallingAnimation) {
      setIsFalling(true);
      startFallingAnimation(ui.x, ui.y); // Pass the exact drop coordinates to start the fall
    } else {
      onDelete(id);
    }
  };

  const startFallingAnimation = (startX: number, startY: number): void => {
    // Use an internal currentY for the falling animation, starting from the dropped Y
    let currentFallY = startY;

    const animateFall = (): void => {
      if (myRef.current) {
        const { bottom } = myRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (bottom < viewportHeight + 100) {
          currentFallY += fallSpeed;
          // Update the component's position state to reflect the fall
          setPosition({ x: startX, y: currentFallY });
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
      onStart={handleStart}
      onDrag={handleDrag} // Add onDrag handler to continuously update position
      onStop={handleStop}
      position={position} // Draggable always controls the position based on our state
      bounds="parent"
      disabled={isFalling || disableFallingAnimation}
      nodeRef={myRef}
    >
      <Image
        ref={myRef}
        src="/cabin/cinderblock_light.png"
        alt="Cinderblock"
        className="absolute w-12 h-12 cursor-grab z-101"
        width={50}
        height={50}
        style={{
          // We no longer set 'left' or 'top' directly here.
          // Draggable will manage the transform based on the 'position' prop.
          // The initial spawning position is handled by the first 'position' state update.
          transition: isFalling ? 'none' : 'transform 0s ease-out',
          zIndex: 100
        }}
      />
    </Draggable>
  );
}