import { useRef, useState, useEffect } from "react"
import Draggable from "react-draggable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

// Define the badge interface
export interface Badge {
    name: string,
    description: string,
    obtained: boolean,
    secret: boolean // New property for secret badges
}

interface LaptopWindowProps {
    isOpen: boolean;
    onClose: () => void;
    // Prop to receive and display achievements
    achievements: Badge[];
    // Prop to call when an achievement is unlocked
    onUnlockAchievement: (name: string) => void;
}

export function LaptopWindow({ isOpen, onClose, achievements, onUnlockAchievement }: LaptopWindowProps) {
    const [selectedTab, setSelectedTab] = useState<string>("badges");
    // State to hold the values of the flag input fields
    const [flag1, setFlag1] = useState<string>('');
    const [flag2, setFlag2] = useState<string>('');
    const [flag3, setFlag3] = useState<string>('');
    // State for individual flag feedback messages
    const [flag1Feedback, setFlag1Feedback] = useState<string | null>(null);
    const [flag2Feedback, setFlag2Feedback] = useState<string | null>(null);
    const [flag3Feedback, setFlag3Feedback] = useState<string | null>(null);
    // State for overall submission message
    const [overallSubmitMessage, setOverallSubmitMessage] = useState<string | null>(null);


    const myRef = useRef(null);
    const tapAudio = useRef<HTMLAudioElement>(null);

    // Correct flags
    const correctFlags = {
        flag1: "flag_{n0w_u_s33_m3_4pF@3}",
        flag2: "flag_{enum3r4t10n_@1xsqw}",
        flag3: "flag_{oink_bee6f0ur_5r*s}",
    };

    // Calculate achieved badges based on the passed achievements prop
    const achievedBadgesCount = achievements.filter(badge => badge.obtained).length;
    const totalBadgesCount = achievements.length;

    function playTap() {
        if (tapAudio.current) {
            tapAudio.current.play();
        }
    }

    // Handle flag submission
    const handleFlagSubmission = () => {
        let correctCount = 0;
        let allFlagsFound = true;

        // Check each flag and set individual feedback
        if (flag1 === correctFlags.flag1) {
            correctCount++;
            setFlag1Feedback("Correct!");
        } else {
            allFlagsFound = false;
            setFlag1Feedback("Incorrect.");
        }
        if (flag2 === correctFlags.flag2) {
            correctCount++;
            setFlag2Feedback("Correct!");
        } else {
            allFlagsFound = false;
            setFlag2Feedback("Incorrect.");
        }
        if (flag3 === correctFlags.flag3) {
            correctCount++;
            setFlag3Feedback("Correct!");
        } else {
            allFlagsFound = false;
            setFlag3Feedback("Incorrect.");
        }

        if (correctCount === 3) {
            onUnlockAchievement("big time nerd");
            setOverallSubmitMessage("All flags submitted! Achievement Unlocked!");
        } else if (correctCount > 0) {
            setOverallSubmitMessage(`You found ${correctCount} out of 3 flags.`);
        } else {
            setOverallSubmitMessage("No flags found. Keep looking!");
        }
    };

    // Effect to clear feedback messages after a few seconds
    useEffect(() => {
        if (overallSubmitMessage || flag1Feedback || flag2Feedback || flag3Feedback) {
            const timer = setTimeout(() => {
                setOverallSubmitMessage(null);
                setFlag1Feedback(null);
                setFlag2Feedback(null);
                setFlag3Feedback(null);
            }, 3000); // Messages disappear after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [overallSubmitMessage, flag1Feedback, flag2Feedback, flag3Feedback]);

    // Sort achievements so obtained ones are on top
    const sortedAchievements = [...achievements].sort((a, b) => {
        if (a.obtained && !b.obtained) {
            return -1; // a comes before b if a is obtained and b is not
        }
        if (!a.obtained && b.obtained) {
            return 1; // b comes before a if b is obtained and a is not
        }
        return 0; // maintain relative order if both are obtained or both are not
    });

    return (
        <Draggable nodeRef={myRef} cancel=".no-drag">
            <Tabs ref={myRef} className={`absolute z-112 bg-accent-light rounded-lg h-80 w-100 ${isOpen ? "visible" : "hidden"}`}>
                <TabsList className="absolute bg-background p-1 h-8 w-full rounded-t-lg">
                    <div onClick={onClose} className="absolute right-3 cursor-pointer no-drag">[x]</div>
                    <TabsTrigger className={`no-drag px-2 rounded-lg h-full ${selectedTab === "badges" ? 'bg-background-darkened' : 'bg-background'}`} onClick={() => { setSelectedTab("badges"); playTap() }} value="badges">badges</TabsTrigger>
                    <TabsTrigger className={`no-drag px-2 rounded-lg h-full  ${selectedTab === "flags" ? 'bg-background-darkened' : 'bg-background'}`} onClick={() => { setSelectedTab("flags"); playTap() }} value="flags">flags</TabsTrigger>
                </TabsList>
                <TabsContent value="badges" className="p-2 absolute top-8 w-full text-black no-drag">
                    <div className="overflow-scroll overscroll-none h-full max-h-70">
                        <p className="text-lg font-bold mb-2">{achievedBadgesCount}/{totalBadgesCount} Badges Achieved</p>
                        {sortedAchievements.map((badge) => ( // Use sortedAchievements here
                            // Conditionally render secret badges only if obtained
                            (badge.secret && !badge.obtained) ? null : (
                                <div key={badge.name} className={`mb-2 p-2 rounded-md text-white ${badge.obtained ? 'bg-background' : 'bg-background opacity-30'}`}>
                                    <h3 className="font-semibold">{badge.name} {badge.obtained}</h3>
                                    <p className="text-sm">{badge.description}</p>
                                </div>
                            )
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="flags" className="p-2 absolute top-8 h-full w-full text-black no-drag">
                    <div className="overflow-scroll overscroll-none h-full max-h-67">
                        <p className="mb-2">Keep in mind all flags are within the main page, none are in the cabin!</p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <input
                                    type="text"
                                    value={flag1}
                                    onChange={(e) => setFlag1(e.target.value)}
                                    placeholder="first flag"
                                    className="w-full px-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag"
                                />
                                {flag1Feedback && (
                                    <p className={`text-xs mt-1 ${flag1Feedback === "Correct!" ? "text-green-600" : "text-red-600"}`}>
                                        {flag1Feedback}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={flag2}
                                    onChange={(e) => setFlag2(e.target.value)}
                                    placeholder="second flag"
                                    className="w-full px-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag"
                                />
                                {flag2Feedback && (
                                    <p className={`text-xs mt-1 ${flag2Feedback === "Correct!" ? "text-green-600" : "text-red-600"}`}>
                                        {flag2Feedback}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={flag3}
                                    onChange={(e) => setFlag3(e.target.value)}
                                    placeholder="third flag"
                                    className="w-full px-2 py-1 border border-black rounded-md sm:text-base transition duration-150 ease-in-out no-drag"
                                />
                                {flag3Feedback && (
                                    <p className={`text-xs mt-1 ${flag3Feedback === "Correct!" ? "text-green-600" : "text-red-600"}`}>
                                        {flag3Feedback}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleFlagSubmission}
                                className="mt-1 px-4 py-2 bg-background text-white rounded-md hover:bg-background-darkened transition duration-150 ease-in-out no-drag"
                            >
                                Submit Flags
                            </button>
                            {overallSubmitMessage && (
                                <p className="mt-2 text-center text-sm font-medium text-red-600">{overallSubmitMessage}</p>
                            )}
                            <div className="text-sm mt-4">
                                And careful with refreshing, I dont keep your data so you might have to re-enter it
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <audio src="https://wiiiy.github.io/cabin/sounds/tap.mp3" ref={tapAudio} preload="auto" />
            </Tabs>
        </Draggable>
    )
}
