'use client'

import { useState } from "react";
import FormScheduleGame from "./form-schedule-game";
import { Team } from "@/app/lib/definitions";

export default function ButtonScheduleGame({ teams, league_id }: { teams: Team[], league_id: string}) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleClick = () => {setIsFormOpen(!isFormOpen)}

    return (
        <>
            <button onClick={handleClick} className="bg-red-400 hover:bg-red-500 p-2 mb-2 rounded-lg font-semibold text-white">Schedule new game</button>
        
            {isFormOpen ? <FormScheduleGame teams={teams} league_id={league_id}/> : null}
        </>
    );
}