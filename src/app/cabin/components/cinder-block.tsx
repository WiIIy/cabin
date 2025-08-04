// cinder-block.tsx
"use client"

import React, { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export interface Cinderblock {
  id: number;
  x: number;
  y: number;
}

interface DraggableCinderblockProps {
  initialPosition: { x: number; y: number };
  onDelete: (id: number) => void;
  id: number;
  onDragStop: (id: number, finalPosition: { x: number; y: number }) => void; // Modified signature
  disableFallingAnimation?: boolean;
}

export function DraggableCinderblock({ initialPosition, onDelete, id, onDragStop, disableFallingAnimation = false }: DraggableCinderblockProps) {
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const {resolvedTheme} = useTheme()
  const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
  const myRef = useRef<HTMLImageElement>(null);
  const fallSpeed: number = 5;
  const animationFrameRef = useRef<number | null>(null);

  const handleStart: DraggableEventHandler = () => {
    setIsFalling(false); // Ensure it's not falling when a new drag starts
  };

  const handleDrag: DraggableEventHandler = (e, ui) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  const handleStop: DraggableEventHandler = (e, ui) => {
    // Pass the ID and final position to the parent's onDragStop handler
    onDragStop(id, { x: ui.x, y: ui.y }); // Pass final position here
    setPosition({ x: ui.x, y: ui.y });

    if (!disableFallingAnimation) {
      setIsFalling(true);
      startFallingAnimation(ui.x, ui.y);
    } else {
      // If falling animation is disabled (e.g., window broken), just delete it
      onDelete(id);
    }
  };

  const startFallingAnimation = (startX: number, startY: number): void => {
    let currentFallY = startY;

    const animateFall = (): void => {
      if (myRef.current) {
        const { bottom } = myRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (bottom < viewportHeight + 100) {
          currentFallY += fallSpeed;
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
      onDrag={handleDrag}
      onStop={handleStop}
      position={position}
      bounds="parent"
      disabled={isFalling || disableFallingAnimation}
      nodeRef={myRef}
    >
      <Image
        ref={myRef}
        src={`https://wiiiy.github.io/cabin${resolvedTheme === 'dark'? '/cabin/items/cinderblock_dark.png' : '/cabin/items/cinderblock_light.png'}`} // Assuming this image exists
        alt="Cinderblock"
        className="absolute w-12 h-12 cursor-grab z-101"
        width={50}
        height={50}
        style={{
          transition: isFalling ? 'none' : 'transform 0s ease-out',
          zIndex: 100
        }}
      />
    </Draggable>
  );
}