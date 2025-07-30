import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@radix-ui/react-collapsible"
import { useTheme } from "next-themes";
import { useState } from "react";


interface myCollapsibleProps {
    questionText:string,
    answerText:React.ReactNode
}

export function MyCollapsible({questionText,answerText}: myCollapsibleProps){
    const [isCollapsed, setCollapsed] = useState(false);
    const { resolvedTheme } = useTheme();

    return (
        <Collapsible className={`rounded-sm  ${resolvedTheme === "dark" ? 'bg-accent-dark' : 'bg-accent-light'} p-1`}>
            <CollapsibleTrigger onClick={()=>{setCollapsed(!isCollapsed)}} className="p-1 flex flex-row justify-between">{questionText}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" className={`lucide lucide-chevron-down-icon lucide-chevron-down ${isCollapsed ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg> </CollapsibleTrigger>
            <CollapsibleContent className="p-1">{answerText}</CollapsibleContent>
            </Collapsible>
    )
}