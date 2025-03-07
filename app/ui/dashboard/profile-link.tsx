'use client'

import { User } from "@/app/lib/definitions"
import Dropdown from "@/app/ui/dashboard/dropdown";
import { useState } from "react";

export default function ProfileLink({user}: {user: User}) {
    
    const [isVisible, setIsvisible] = useState(false);
    
    if (!user) {
        return;
    }

    const toggleIsVisible = () => {
        setIsvisible(!isVisible);
    };

    return (
    <>
        <button onClick={toggleIsVisible} className="flex w-full p-4 text-white text-base font-semibold" type="button">
            <span className="truncate">Hello {user.firstName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 flex-shrink-0 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

        </button>

        <Dropdown isVisible={isVisible}/>
        
    </>
    );
}