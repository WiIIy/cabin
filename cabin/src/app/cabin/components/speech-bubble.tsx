
interface speechBubbleProps{
    text:React.ReactNode;
}

export function SpeechBubble({text} : speechBubbleProps){
    return (
    <div id="speech-bubble" className="absolute left-3/5 translate-x-1/5 top-10">
      <div id="bub-part-a"></div>
      <div id="bub-part-b"></div>
      <div id="bub-part-c"></div>
      <div id="speech-txt">{text}</div>
      <div id="bub-part-c"></div>
      <div id="bub-part-b"></div>
      <div id="bub-part-a"></div>

      <div id="speech-arrow">
        <div id="arrow-w"></div>
        <div id="arrow-x"></div>
        <div id="arrow-y"></div>
        <div id="arrow-z"></div>
      </div>
     </div>
    )
}