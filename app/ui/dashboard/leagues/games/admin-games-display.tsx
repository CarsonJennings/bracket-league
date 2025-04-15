'use client'

import { getLeagueGamesInRange } from "@/app/lib/data";
import { GameWithTeamNames } from "@/app/lib/definitions";
import GameCard from "@/app/ui/dashboard/leagues/games/game-card";
import { useEffect, useState } from "react";
import ButtonScheduleGame from "@/app/ui/dashboard/leagues/games/button-schedule-game";

export default function AdminGamesDisplay({ league_id }: { league_id: string }) {
    const cur_day = new Date();
    const default_start_date = new Date(cur_day.getTime() - 1000 * 60 * 60 * 24 * 2); // 2 days behind default
    const default_end_date = new Date(cur_day.getTime() + 1000 * 60 * 60 * 24 * 2); // 2 days ahead default
    const [start_date, set_start_date] = useState(default_start_date.toISOString().split('T')[0]);
    const [end_date, set_end_date] = useState(default_end_date.toISOString().split('T')[0]);
    const [games, setGames] = useState<GameWithTeamNames[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            const league_games = await getLeagueGamesInRange(league_id, new Date(start_date), new Date(end_date));
            setGames(league_games);
        };

        fetchGames();
    }, [start_date, end_date, league_id]);

    return (
        <div>
            <div className="bg-gray-200 p-2 flex justify-center">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <label htmlFor="start-date" className="font-semibold mt-4">Start date</label>
                        <input type="date"className="" id="start-date" name="start-date"
                            autoComplete="off" value={start_date} onChange={(val) => set_start_date(val.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <label htmlFor="end-date" className="font-semibold mt-4">End date</label>
                        <input type="date" className="" id="end-date" name="end-date"
                            autoComplete="off" value={end_date} onChange={(val) => set_end_date(val.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center my-4">
                <ButtonScheduleGame />
            </div>

            { games.length > 0 ?
                <ul className="grid lg:grid-cols-3 md:grid-cols-2">
                    {games.map((game) => (
                        <GameCard key={game.game_id} game={game}/>
                    ))}
                </ul> :
                <p className=" mt-4 text-center font-semibold">No games to display in this range</p>
            }
        </div>
    );
}