import { MyCollapsible } from "./collapsible";


export function FaqTabCollapsible(){

    return (
        <div className={"bg-background h-full"} style={{cursor:'pointer' ,whiteSpace: 'pre-wrap', padding:10, textWrap:'wrap'}}>
            <MyCollapsible questionText="Programs I use?                                                     " 
            answerText= <>
            - Photoshop for most images and simple animations<br/>
            - Figma for designing UI<br/>
            - Blender for everything 3D      </>
            />
        </div>
    )
}