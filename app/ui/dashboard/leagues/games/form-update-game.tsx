'use client'

import { GameWithTeamNames } from "@/app/lib/definitions";
import { updateGame } from "@/app/lib/actions";
import { useActionState } from "react";

export default function FormUpdateGame({ game, refreshGames, closeEdit }: { game: GameWithTeamNames, refreshGames: () => void, closeEdit: () => void }) {
    const updateGameBind = updateGame.bind(null, game);
    const [formState, formAction, isLoading] = useActionState(updateGameBind, "");
    const handleUpdate = (formData: FormData) => {
        formAction(formData);
        refreshGames();
        closeEdit();
    };

    return (
        <form action={handleUpdate}>
            <div className="flex font-bold text-lg text-red-400">
                <span className="w-10/12">
                    {game.home_team_name}
                </span>
                <input className="text-right w-2/12" type="number" name="home-score" id="home-score" defaultValue={game.home_score} />
            </div>
            <div className="flex font-bold text-lg text-blue-400 justify-between">
                <span className="w-10/12">
                    {game.away_team_name}
                </span>
                <input className="text-right w-2/12" type="number" name="away-score" id="away-score" defaultValue={game.away_score}/>
            </div>
            <select className="text-center font-bold text-sm w-full my-2" name="game-status" id="game-status" defaultValue={game.status}>
                <option value="scheduled">scheduled</option>
                <option value="completed">completed</option>
                <option value="canceled">canceled</option>
            </select>
            {
                isLoading ? 
                <button className="block mt-4 py-1 w-full bg-red-200 font-semibold text-white rounded-md" type="submit" disabled={true}>Save</button>
                : <button className="block mt-4 py-1 w-full bg-red-400 font-semibold text-white rounded-md" type="submit" disabled={false}>Save</button>

            }
            {
                isLoading ? <p>Loading...</p> : null
            }
            {
                formState === "" ? null : <p>{formState}</p>
            }
        </form>
    );
}