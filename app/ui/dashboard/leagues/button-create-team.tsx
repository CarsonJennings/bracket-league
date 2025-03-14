'use client'
import { useState } from "react";
import FormCreateTeam from "@/app/ui/dashboard/leagues/form-create-team";

export default function ButtonCreateTeam() {
    const [isVisible, setIsvisible] = useState(false);
    
    const toggleIsVisible = () => {
        setIsvisible(!isVisible);
    };

    return (
        <>
            <button onClick={toggleIsVisible} className=" p-0.5 rounded-full hover:ring-2 hover:ring-white hover:outline-hidden hover:ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            {isVisible ? 
            <div className="absolute z-10">
                <FormCreateTeam />
            </div>
            : null}
        </>
    );
}