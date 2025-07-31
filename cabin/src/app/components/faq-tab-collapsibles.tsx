import { MyCollapsible } from "./collapsible";


export function FaqTabCollapsible(){

    return (
        <div className={"bg-background h-full"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
            <MyCollapsible questionText="Programs I use?                                                     " 
            answerText= <>
            &#x2022; Photoshop for most images and simple animations<br/>
            &#x2022; Figma for designing UI<br/>
            &#x2022; Blender for everything 3D      </>
            />
            <MyCollapsible questionText="Tools used for this site?                                          " 
            answerText= <>
            &#x2022; React-NextJS <br/>
            &#x2022; TailwindCSS <br/>
            &#x2022; shadcn (for components) <br/>
            &#x2022; lucide (for icons) <br/>
            &#x2022; Google Gemini (for help) <br/>
            <br/>
            Packages: <br/>
            &#x2022; react-draggable <br/>
                 </>
            />
        </div>
    )
}