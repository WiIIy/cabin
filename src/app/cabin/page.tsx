// page.tsx
"use client"

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import { CabinBG } from "./components/cabin-bg";
import { SpeechBubble } from "./components/speech-bubble";
import { Cinderblock, DraggableCinderblock } from "./components/cinder-block";
import { useTheme } from "next-themes";
import { ScrapBook } from "./components/art-book-ui";
import { ReturnToHome } from "./components/return-to-main";
import { DarkModeBG } from "./components/dark-mode-bg";
import { LightModeBG } from "./components/light-mode-bg";
import MsgBoard from "./components/anonymous-msg-board";
import { Timeout } from "./components/timeout";
import { Badge } from "./components/laptop-window"; // Import Badge interface

// Define types for Will's expressions
export type WillExpression = 'reading' | 'blinking' | 'talking' | 'shocked' | 'really' | 'poked';

export default function Cabin() {
  const { theme } = useTheme();

  const [isScrapBookOpen, setScrapBookOpen] = useState<boolean>(false);
  const [amountFaceIsClicked, setAmountFaceIsClicked] = useState<number>(0);
  const [msgBoardOpen, setMsgBoardOpen] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [timeoutEndTime, setTimeoutEndTime] = useState<number | null>(null);


  const [cinderblocks, setCinderblocks] = useState<Cinderblock[]>([]);
  const [isHoldingCinderblock, setIsHoldingCinderblock] = useState<boolean>(false);
  const [windowBroken, setWindowBroken] = useState<boolean>(false);
  const [blindsDown, setBlindsDown] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<React.ReactNode | null>(null);
  const [willExpression, setWillExpression] = useState<WillExpression>('reading');
  const [hasClickedCinderblockBox, sethasClickedCinderblockBox] = useState<boolean>(false);
  const [currentSpeechDuration, setCurrentSpeechDuration] = useState<number>(0);
  const [plugIn, setPlugIn] = useState<boolean>(false);
  // State to manage achievements
  const [achievements, setAchievements] = useState<Badge[]>([
    { name: "in my own home??", description: "throw a brick at the window, why?", obtained: false, secret: true },
    { name: "big time nerd", description: "found all 3 flags, how long did that take?", obtained: false, secret: false },
    { name: "timeout", description: "bad!", obtained: false, secret: false },
    { name: "the drawer", description: "well that was underwhelming", obtained: false, secret: true } // Marked as secret
  ]);

  const openBookAudio = useRef<HTMLAudioElement>(null);
  const glassShatterAudio = useRef<HTMLAudioElement>(null);
  const blindsUpAudio = useRef<HTMLAudioElement>(null);
  const tapAudio = useRef<HTMLAudioElement>(null);
  const lockedDrawerAudio = useRef<HTMLAudioElement>(null);
  const laptopHumAudio = useRef<HTMLAudioElement>(null);
  const plugInAudio = useRef<HTMLAudioElement>(null);
  const plugOutAudio = useRef<HTMLAudioElement>(null);

  const cinderblocksBoxRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const shockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs to hold the latest state values for use in memoized callbacks
  const willExpressionRef = useRef(willExpression);
  const speechTextRef = useRef(speechText);

  // Update refs whenever the state changes
  useEffect(() => {
    willExpressionRef.current = willExpression;
  }, [willExpression]);

  useEffect(() => {
    speechTextRef.current = speechText;
  }, [speechText]);

  // Load achievements from localStorage on component mount
  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Function to unlock an achievement
  const unlockAchievement = useCallback((name: string) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(badge =>
        badge.name === name ? { ...badge, obtained: true } : badge
      );
      return updatedAchievements;
    });
  }, []);

  // Check for persistent timeout on component mount
  useEffect(() => {
    const storedTimeoutEndTime = localStorage.getItem('timeoutEndTime');
    if (storedTimeoutEndTime) {
      const endTime = parseInt(storedTimeoutEndTime, 10);
      if (Date.now() < endTime) {
        setIsTimeout(true);
        setTimeoutEndTime(endTime);
        // Unlock "timeout" achievement if it's not already obtained
        if (!achievements.find(a => a.name === "timeout")?.obtained) {
          unlockAchievement("timeout");
        }
      } else {
        localStorage.removeItem('timeoutEndTime');
      }
    }
  }, [achievements, unlockAchievement]); // Added achievements and unlockAchievement to dependencies

  // Function to start blinking animation
  const startBlinkingAnimation = useCallback(() => {
    // Ensure no duplicate intervals are running
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }

    // Check current state using refs before starting interval
    // Only start blinking if Will is in 'reading' state and not shocked/talking/has speech
    if (willExpressionRef.current === 'reading') {
      blinkIntervalRef.current = setInterval(() => {
        // Use functional update to ensure latest state for blinking
        setWillExpression(prev => {
          // Only blink if current state is reading and no speech
          if (willExpressionRef.current === 'reading' && speechTextRef.current === null) { // Use ref for latest state
            return 'blinking';
          }
          return prev; // Don't change if already talking/shocked/etc.
        });

        setTimeout(() => {
          // Revert to reading if still blinking and conditions allow
          setWillExpression(prev => {
            if (willExpressionRef.current === 'blinking') { // Use ref for latest state
              return 'reading';
            }
            return prev;
          });
        }, 300); // Blink duration
      }, Math.random() * (5000 - 3000) + 3000); // Blink every 3-5 seconds
    }
  }, []); // Dependencies for useCallback: only windowBroken as it's outside ref/state

  // Function to clear speech bubble and reset Will's expression
  const clearSpeechAndResetExpression = useCallback(() => {
    setSpeechText(null);
    // Only revert to reading if not currently shocked or talking
    if (willExpressionRef.current !== 'reading' && willExpressionRef.current !== 'shocked') { // Use ref for latest state
      setWillExpression('reading');
    }
    // Restart blinking animation if applicable
    startBlinkingAnimation();
  }, [startBlinkingAnimation]); // Depend on startBlinkingAnimation

  // Function to trigger speech bubble - now only sets states
  const triggerSpeechBubble = (
    text: React.ReactNode,
    durationMs: number,
    expression: WillExpression = 'talking'
  ): void => {
    // Clear any existing blinking interval immediately when new speech starts
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }
    setSpeechText(text);
    setWillExpression(expression);
    setCurrentSpeechDuration(durationMs); // Store duration for the effect
  };

  // useEffect to manage speech bubble timeouts and expression changes
  useEffect(() => {
    // Clear any existing speech timeout to prevent overlap
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    if (speechText !== null) {
      // Set a timeout to clear the speech bubble and reset expression
      speechTimeoutRef.current = setTimeout(() => {
        clearSpeechAndResetExpression();
      }, currentSpeechDuration);
    } else {
      // If speechText is null (e.g., after clearing), ensure blinking restarts if conditions allow
      // Use willExpressionRef.current to check the latest state
      if (willExpressionRef.current !== 'talking' && willExpressionRef.current !== 'shocked' && willExpressionRef.current !== 'really') {
        startBlinkingAnimation();
      }
    }

    // Cleanup on component unmount or when dependencies change
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, [speechText, willExpression, currentSpeechDuration, clearSpeechAndResetExpression, startBlinkingAnimation]); // Dependencies for this effect

  const handleFacePoked = (() => {
    if (amountFaceIsClicked === 10) {
      triggerSpeechBubble("stop that", 1800, "talking")

    } else if (amountFaceIsClicked === 15) {
      triggerSpeechBubble("you're gonna regret that", 2400, "talking")
    } else if (amountFaceIsClicked === 25) {
      triggerSpeechBubble("i've actually made it so if you do it a certain amount of times it IP bans you", 3400, "talking")
    } else if (amountFaceIsClicked === 35) {
      triggerSpeechBubble("i lied about the ban but i am gonna give you a timeout", 3400, "talking")
    } else if (amountFaceIsClicked === 37) {
      const endTime = Date.now() + 60 * 1000; // 1 minute from now
      localStorage.setItem('timeoutEndTime', endTime.toString());
      setIsTimeout(true);
      setTimeoutEndTime(endTime);
      unlockAchievement("timeout"); // Unlock timeout achievement
    } else if (amountFaceIsClicked > 37 && amountFaceIsClicked % 3 === 0) {
      const endTime = Date.now() + 60 * 1000; // 1 minute from now
      setIsTimeout(true);
      setTimeoutEndTime(endTime);
    } else {
      triggerSpeechBubble("ow", 200, "poked")
    }
    setAmountFaceIsClicked(amountFaceIsClicked + 1)
  })

  const handleCableClick = () => {
    setPlugIn(!plugIn);
    if (plugIn === false && plugInAudio.current && laptopHumAudio.current) {
      plugInAudio.current.play();
      laptopHumAudio.current.play()
    } else if (plugIn === true && plugOutAudio.current && laptopHumAudio.current) {
      plugOutAudio.current.play();
      laptopHumAudio.current.pause()
    }
  }

  const handleCinderBlockBoxClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (cinderblocksBoxRef.current) {
      const newCinderblock: Cinderblock = {
        id: Date.now(),
        x: 400, // Initial position, adjust as needed
        y: 400, // Initial position, adjust as needed
      };
      setCinderblocks(prev => [...prev, newCinderblock]);

      if (!hasClickedCinderblockBox) {
        triggerSpeechBubble("I forgot I had a box of cinderblocks!", 3000, 'talking');
        sethasClickedCinderblockBox(true);
      } else {
        const random = Math.random();
        if (random < 1 / 3) { // 1/3 chance to say something
          const responses = [
            "Careful with that.",
            "I heard they absorb water easily.",
            "Makes okay chalk."
          ];
          const randomIndex = Math.floor(Math.random() * responses.length);
          triggerSpeechBubble(responses[randomIndex], 2000, 'talking');
        } else {
          // 2/3 chance to say nothing
          setSpeechText(null); // Explicitly clear speech text
          setWillExpression('reading'); // Ensure Will goes back to reading
        }
      }
    }
  };

  const handleDeleteCinderblock = (idToDelete: number): void => {
    setCinderblocks(prev => prev.filter(block => block.id !== idToDelete));
  };

  const handleDragStartCinderblock = (): void => {
    setIsHoldingCinderblock(true);
    // When dragging starts, stop blinking and set expression to reading
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }
    setWillExpression('reading');
  };

  const handleDragStopCinderblock = (id: number, finalPosition: { x: number; y: number }): void => {
    setIsHoldingCinderblock(false);

    if (!windowBroken && windowRef.current) {
      // Get the window's position relative to the parent
      const windowRect = {
        left: windowRef.current.offsetLeft,
        top: windowRef.current.offsetTop,
        right: windowRef.current.offsetLeft + windowRef.current.offsetWidth,
        bottom: windowRef.current.offsetTop + windowRef.current.offsetHeight,
      };

      const cinderblockWidth = 50;
      const cinderblockHeight = 50;

      // Calculate the actual position of the cinderblock relative to the same coordinate system
      const cinderblockRect = {
        left: finalPosition.x,
        top: finalPosition.y,
        right: finalPosition.x + cinderblockWidth,
        bottom: finalPosition.y + cinderblockHeight,
      };

      // Check for intersection
      if (
        cinderblockRect.left < windowRect.right &&
        cinderblockRect.right > windowRect.left &&
        cinderblockRect.top < windowRect.bottom &&
        cinderblockRect.bottom > windowRect.top
      ) {
        setWindowBroken(true);
        if (glassShatterAudio.current) {
          glassShatterAudio.current.play();
        }
        setBlindsDown(true)
        triggerSpeechBubble("My window!", 1700, 'shocked');
        setCinderblocks([]); // Remove all cinderblocks after breaking the window
        unlockAchievement("in my own home??"); // Unlock achievement for breaking window

        // Set a timeout to change Will's expression back after being shocked
        if (shockTimeoutRef.current) {
          clearTimeout(shockTimeoutRef.current);
        }
        shockTimeoutRef.current = setTimeout(() => {
          triggerSpeechBubble("That was unnecessary...", 2000, 'really');
          // After this speech, ensure Will's expression reverts and blinking resumes
          setTimeout(() => {
            clearSpeechAndResetExpression(); // Explicitly call to reset and restart blinking
          }, 2300); // Duration for "That was unnecessary..."
        }, 1500); // Duration for "My window!"
      }
    }
    // After drag stop, if window is not broken, restart blinking
    if (!windowBroken) {
      startBlinkingAnimation();
    }
  };

  const handleWindowClick = (): void => {
    setBlindsDown(prev => !prev);
    if (blindsDown === true && blindsUpAudio.current) {
      blindsUpAudio.current.play()
    }
  };

  // Initial setup for blinking when component mounts
  useEffect(() => {
    // Only start blinking initially if window isn't broken
    if (!windowBroken) {
      startBlinkingAnimation();
    }
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount


  return (
    <div className="absolute h-screen w-fit overscroll-none">

      <audio ref={glassShatterAudio} src="https://wiiiy.github.io/cabin/sounds/window_shatter.mp3" preload="auto" />
      <audio ref={openBookAudio} src="https://wiiiy.github.io/cabin/sounds/open_book.mp3" preload="auto" />
      <audio ref={blindsUpAudio} src="https://wiiiy.github.io/cabin/sounds/open_blinds.mp3" preload="auto" />
      <audio ref={tapAudio} src="https://wiiiy.github.io/cabin/sounds/tap.mp3" preload="auto" />
      <audio ref={lockedDrawerAudio} src="https://wiiiy.github.io/cabin/sounds/locked_drawer.mp3" preload="auto" />

      {/*darkmode audio*/}
      <audio ref={laptopHumAudio} src={`https://wiiiy.github.io/cabin/sounds/laptop_hum.mp3`} loop preload="auto" />
      <audio ref={plugInAudio} src={`https://wiiiy.github.io/cabin/sounds/plug_in.mp3`} preload="auto" />
      <audio ref={plugOutAudio} src={`https://wiiiy.github.io/cabin/sounds/plug_out.mp3`} preload="auto" />

      <ThemeToggle className="left-1/4 top-5" />
      <ReturnToHome />
      <MsgBoard onClose={() => { setMsgBoardOpen(false); if (tapAudio.current) { tapAudio.current.play() } }} isOpen={msgBoardOpen} />
      {isTimeout && <Timeout timeoutEndTime={timeoutEndTime} onTimeoutEnd={() => {
        setIsTimeout(false);
        setTimeoutEndTime(null);
        localStorage.removeItem('timeoutEndTime');
      }} />}

      {speechText && <SpeechBubble text={speechText} />}

      <ScrapBook isOpen={isScrapBookOpen} onClose={() => {
        setScrapBookOpen(false)
        if (tapAudio.current) {
          tapAudio.current.play()
        }
      }} />

      {/*drawer*/}
      <div
        className="absolute z-110 left-98 top-77 h-11 w-50 cursor-pointer"
        onClick={() => {
          if (lockedDrawerAudio.current) {
            lockedDrawerAudio.current.play()
          }
          unlockAchievement("the drawer"); // Unlock achievement for clicking drawer
        }}
      >
        <p className="text-white text-center mt-4"></p>
      </div>

      {/*Open scrap book*/}
      <div
        className="absolute z-100 left-235 top-70 h-30 w-50 cursor-pointer"
        onClick={() => {
          setScrapBookOpen(true)
          if (openBookAudio.current) {
            openBookAudio.current.play()
          }
        }}
      >
      </div>

      {/*Face*/}
      <div
        className="absolute z-100 left-245 top-15 h-30 w-25 cursor-pointer"
        onClick={handleFacePoked}
      >
      </div>

      {/*Window*/}
      <div
        ref={windowRef}
        className="absolute z-110 left-98 top-25 h-32 w-50 cursor-pointer"
        onClick={handleWindowClick}
      >
      </div>

      {/*Cinderblocks*/}
      {cinderblocks.map((block: Cinderblock) => (
        <DraggableCinderblock
          key={block.id}
          id={block.id}
          initialPosition={{ x: block.x, y: block.y }}
          onDelete={handleDeleteCinderblock}
          onDragStart={handleDragStartCinderblock}
          onDragStop={handleDragStopCinderblock}
        />
      ))}

      {/*background items and hitboxes*/}
      {theme === "dark" ? (<DarkModeBG
        plugIn={plugIn}
        onCableClick={handleCableClick}
        onPosterClick={() => { setMsgBoardOpen(!msgBoardOpen); if (tapAudio.current) { tapAudio.current.play() } }}
        achievements={achievements} // Pass achievements
        onUnlockAchievement={unlockAchievement} // Pass unlock function
      />) :

        (<LightModeBG handleCinderBlocksBoxClick={handleCinderBlockBoxClick} ref={cinderblocksBoxRef} />)}
      {/*Cabin visuals*/}
      <CabinBG
        blindsDown={blindsDown}
        windowBroken={windowBroken}
        willExpression={willExpression}
        currentTheme={theme as 'light' | 'dark'}
      />
    </div>
  );
}
