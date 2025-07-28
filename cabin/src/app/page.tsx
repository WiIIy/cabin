// import DraggableBox from "@/components/ui/draggableUi";
import { ButtonWithIcon } from "@/components/ui/iconButton";
import Script from "next/script";
import Draggable from "react-draggable";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center h-screen w-screen">
      <Script src="./script.js" />

      <div className="flex items-center justify-center h-screen w-screen">
        <main className="flex items-center justify-center w-4/5 h-13/12 ">
          <div className="flex w-1/2 h-1/2 bg-accent-dark border-2 border-white items-end rounded-lg overflow-hidden">
            <div className="flex justify-self-start bg-background w-full h-9/10 bottom-0 left-0">
              <ButtonWithIcon id="openAbout" src={"/icons/icon_about.jpg"} text={"about"} alt="bub"></ButtonWithIcon>
            </div>
          </div>
        </main>
      </div>
{/* 
      <Draggable>
            <p>Drag me around!</p>
            <p className="text-sm mt-2">(Client Component)</p>
          </Draggable> */}


      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent-light -z-10">
            <footer className="absolute items-center justify-center">
        <p className="text-text-normal">Your Footer Content Here</p>
      </footer></div>
    </div>
  );
}
