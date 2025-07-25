import Image from "next/image";
import Link from "next/link";
import ImageButton from "./components/icon-button";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent-light -z-10"></div>

      <main className="flex flex-col items-center justify-center w-full h-full flex-grow">
        <div className="absolute w-1/2 h-1/2 bg-accent-dark border-2 border-white rounded-lg overflow-hidden">
          <div className="absolute bg-background w-full h-9/10 bottom-0 left-0">
          <Image src={"/icons/icon_about.jpg"} className=" " width={50} height={50} alt="bub"></Image>
          {/* <ImageButton src="../icons/icon_about_dark.jpg" alt="about icon" href="src/lol"></ImageButton> */}
          </div>
        </div>
      </main>

      {/* FOOTER: At the bottom, within the main flex column of the page */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center mt-auto">
        {/* Add your footer content here */}
        <p className="text-text-normal">Your Footer Content Here</p>
      </footer>
    </div>
  );
}