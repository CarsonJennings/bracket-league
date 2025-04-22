'use client'

import { GameWithTeamNames } from "@/app/lib/definitions";
import FormUpdateGame from "@/app/ui/dashboard/leagues/games/form-update-game";
import { useState } from "react";

export default function AdminGamesCard({ game }: { game: GameWithTeamNames }) {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {setIsEditing(!isEditing);}
    
    return (
        <li className="flex flex-col p-4 border rounded-lg m-1">
            { isEditing ?
                <>
                    <button className="flex justify-end" onClick={handleEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="text-center">
                        {game.game_time.toString().slice(4,25)}
                    </div>
                    <FormUpdateGame game={game}/>
                </>
                :
                <>
                    <button className="flex justify-end" onClick={handleEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <div className="text-center">
                        {game.game_time.toString().slice(4,25)}
                    </div>
                    <div className="flex font-bold text-lg text-red-400 justify-between">   
                        <span>
                            {game.home_team_name}
                        </span>
                        <span>
                            {game.status=='completed' ? game.home_score : '-'}
                        </span>
                    </div>
                    <div className="flex font-bold text-lg text-blue-400 justify-between">
                        <span>
                            {game.away_team_name}
                        </span>
                        <span>
                            {game.status=='completed' ? game.away_score : '-'}
                        </span>
                    </div>
                    <div className="text-center font-bold text-sm">
                        {game.status}
                    </div>
                </>
            }
        </li>
    );
}