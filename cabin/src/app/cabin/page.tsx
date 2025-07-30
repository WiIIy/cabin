import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import Image from "next/image";

export default function Cabin() {
  return (
    <div className="relative h-screen w-screen">
      <ThemeToggle/>
        
      <SpeechBubble text="wewaewaeawewa"/>

      <CabinBG/>
      
    </div>
    
  );
}
