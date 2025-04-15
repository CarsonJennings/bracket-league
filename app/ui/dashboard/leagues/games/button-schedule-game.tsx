'use client'

import { useState } from "react";
import FormScheduleGame from "./form-schedule-game";

export default function ButtonScheduleGame() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleClick = () => {setIsFormOpen(!isFormOpen)}

    return (
        <>
            <button onClick={handleClick} className="bg-red-400 hover:bg-red-500 p-2 mb-2 rounded-lg font-semibold text-white">Schedule new game</button>
        
            {isFormOpen ? <FormScheduleGame /> : null}
        </>
    );
}