// components/DraggableBox.tsx
"use client"; // This directive makes this component a Client Component

import Draggable from "react-draggable";
import React from "react"; // Import React for JSX

interface DraggableBoxProps {
  children: React.ReactNode;
}

// Corrected function component declaration in TypeScript
export default function DraggableBox({ children }: DraggableBoxProps) {
  return (
    // If you encounter "findDOMNode is not a function" error,
    // ensure your 'react-draggable' package is version 4.x.x or newer,
    // as older versions might use deprecated React APIs.
    <Draggable>
      <div className="cursor-grab bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-center text-center select-none">
        {children || "Drag me!"}
      </div>
    </Draggable>
  );
}
