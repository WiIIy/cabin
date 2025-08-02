import { ThemeToggle } from "./components/theme-toggle";
import { MainButtonArray } from "./components/main-button-array";
import { Footer } from "./components/footer";
import { CabinLink } from "./components/cabin-link";

export default function Home() {

  return (
    <div className="relative flex flex-col items-center h-screen w-screen">
      <ThemeToggle className="left-5 top-2"/>
      

      <div className="flex items-center justify-center h-screen w-screen"> {/*invisible frame takes up the whole screen */}
          <div className=" flex w-7/8 sm:w-6/13 h-2/3 sm:bg-accent-dark sm:border-2 sm:border-text items-end rounded-lg sm:overflow-hidden"> {/*main window*/}
            <div className="flex justify-self-start sm:bg-background w-full h-9/10 bottom-0 left-0"> {/*lower part*/}
              <MainButtonArray/>
            </div>
          </div>
      </div>

      <CabinLink/>

      <div className="absolute bottom-0 left-0 h-1/13 w-full sm:h-1/2 bg-accent-light -z-10"> {/*half the background thats light */}
         <Footer/>
      </div>
    </div>
  );
}
