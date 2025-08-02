import { useState } from "react";
import MsgBoard from "./anonymous-msg-board";

interface darkModeBGProps {
    onPosterClick: ()=>void;
}

export function DarkModeBG({onPosterClick}: darkModeBGProps){
    return (
        <>

        {/*wood pile*/}
        <div className="absolute bg-accent-dark z-112 left-120 top-89 h-16 w-42 border-white border-2 cursor-pointer">wood pile</div>

        {/*msg board*/}
        <div className="absolute bg-accent-dark z-112 left-20 top-32 h-46 w-42 border-white border-2 cursor-pointer"
        onClick={onPosterClick}
        >msg board</div>

        {/*globe*/}
        <div className="absolute bg-accent-dark z-112 left-68 bottom-0 h-46 w-46 border-white border-2 cursor-pointer"> </div>

        {/*picture*/}
        <div className="absolute bg-accent-dark z-112 left-66 bottom-90 h-26 w-26 border-white border-2 cursor-pointer"></div>

        {/*fire*/}
        <div className="absolute bg-accent-dark z-112 left-175 top-78 h-26 w-32 border-white border-2 cursor-pointer"></div>

        {/*laptop*/}
        <div className="absolute bg-accent-dark z-112 left-17 top-98 h-32 w-36 border-white border-2 cursor-pointer"></div>
        </>
    )
}