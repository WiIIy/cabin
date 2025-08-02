// timeout.tsx
import Image from "next/image";
import { useState, useEffect } from "react";

export function Timeout({onTimeoutEnd, timeoutEndTime}: {onTimeoutEnd: ()=>void, timeoutEndTime: number | null}){
    const [seconds, setSeconds] = useState<number>(60);

    useEffect(() => {
        if (!timeoutEndTime) return;

        const calculateRemainingTime = () => {
            const remaining = Math.max(0, Math.floor((timeoutEndTime - Date.now()) / 1000));
            setSeconds(remaining);
        };
        
        calculateRemainingTime(); // Initial calculation

        const intervalId = setInterval(() => {
            calculateRemainingTime();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeoutEndTime]);
    
    useEffect(() => {
        if (seconds <= 0 && timeoutEndTime !== null) {
            onTimeoutEnd();
        }
    }, [seconds, timeoutEndTime, onTimeoutEnd]);

    // Format the time to MM:SS
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className="absolute h-full w-full bg-accent-dark z-200">
            <p className="absolute font-pixel bottom-0 h-1/2 w-full text-center">You are on a timeout!</p>
            <p className="absolute font-pixel top-1 h-1/2 w-full text-center">{formatTime(seconds)}</p>
            {/* <Image src=/> */}
        </div>
    )
}