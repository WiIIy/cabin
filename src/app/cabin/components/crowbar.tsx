import Draggable, { DraggableEventHandler } from "react-draggable";
import Image from "next/image";
import { useRef, useState } from "react";

interface DraggableCinderblockProps {
  isVisible: boolean;
  initialPosition: { x: number; y: number };
  onDragStop: (finalPosition: { x: number; y: number }) => void;
}

export function Crowbar({ initialPosition, onDragStop, isVisible }: DraggableCinderblockProps){
    const myRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);

    const handleStart: DraggableEventHandler = () => {
      };
    
      const handleDrag: DraggableEventHandler = (e, ui) => {
        setPosition({ x: ui.x, y: ui.y });
      };
    
      const handleStop: DraggableEventHandler = (e, ui) => {
        onDragStop({ x: ui.x, y: ui.y });
        setPosition({ x: ui.x, y: ui.y });
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
                src={`https://wiiiy.github.io/cabin/cabin/items/crowbar.png`} // Assuming this image exists
                alt="Crowbar"
                className={`${isVisible? "visible": "hidden" } absolute w-12 h-12 cursor-grab z-101`}
                width={50}
                height={50}
                style={{
                  zIndex: 100
                }}
              />
            </Draggable>
    )
}