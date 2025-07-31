import Script from "next/script";
import { ThemeToggle } from "./components/theme-toggle";
import { MainButtonArray } from "./components/main-button-array";

export default function Home() {

  return (
    <div className="relative flex flex-col items-center h-screen w-screen">
      <Script src="./script.js" />
      <ThemeToggle className="left-5 top-2"/>

      <div className="flex items-center justify-center h-screen w-screen"> {/*invisible frame takes up the whole screen */}
          <div className="flex w-6/13 h-2/3 bg-accent-dark border-2 border-text items-end rounded-lg overflow-hidden"> {/*main window*/}
            <div className="flex justify-self-start bg-background w-full h-9/10 bottom-0 left-0"> {/*lower part*/}
              <MainButtonArray/>
            </div>
          </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent-light -z-10"> {/*half the background thats light */}
         <p className="absolute bottom-1/6 left-1/2 -translate-x-1/2 text-center text-text-normal">Your Footer Content Here</p>
      </div>
    </div>
  );
}
