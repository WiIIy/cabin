import Draggable, { DraggableEventHandler } from "react-draggable";
import Image from "next/image";
import { useRef, useState } from "react";

interface DraggableCinderblockProps {
  initialPosition: { x: number; y: number };
  onDelete: (id: number) => void;
  id: number;
  onDragStart: () => void;
  onDragStop: (id: number, finalPosition: { x: number; y: number }) => void; // Modified signature
  disableFallingAnimation?: boolean;
}

export function Crowbar({ initialPosition, onDelete, id, onDragStart, onDragStop }: DraggableCinderblockProps){
    const myRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);

    const handleStart: DraggableEventHandler = () => {
        onDragStart();
      };
    
      const handleDrag: DraggableEventHandler = (e, ui) => {
        setPosition({ x: ui.x, y: ui.y });
      };
    
      const handleStop: DraggableEventHandler = (e, ui) => {
        // Pass the ID and final position to the parent's onDragStop handler
        onDragStop(id, { x: ui.x, y: ui.y }); // Pass final position here
        setPosition({ x: ui.x, y: ui.y });

          onDelete(id);

      };
    
    return (
        <Draggable
              onStart={handleStart}
              onDrag={handleDrag}
              onStop={handleStop}
              position={position}
              bounds="parent"
              nodeRef={myRef}
            >
              <Image
                ref={myRef}
                src={`https://wiiiy.github.io/cabin/items/crowbar.png'}`} // Assuming this image exists
                alt="Cinderblock"
                className="absolute w-12 h-12 cursor-grab z-101"
                width={50}
                height={50}
                style={{
                  zIndex: 100
                }}
              />
            </Draggable>
    )
}