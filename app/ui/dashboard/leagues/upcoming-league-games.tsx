import { getUpcomingLeagueGames } from "@/app/lib/data"
import { Game } from "@/app/lib/definitions";
import UpcomingLeagueGameElement from "@/app/ui/dashboard/leagues/upcoming-league-game-element";

export default async function UpcomingLeagueGames({ league_id } : { league_id: string }) {
    const games: Game[] = await getUpcomingLeagueGames(league_id);
    
    if (games.length > 0) {
        return (
            <>
                <div className="h-32 w-full overflow-x-auto text-center border-b">
                    <ul className="flex min-w-full h-full p-2">
                        {games.map((game) => (
                            <UpcomingLeagueGameElement key={game.game_id} game={game}/>
                        ))}
                    </ul>
                </div>
            </>
        );
    } else {
        return (
            <div className="h-32 w-full flex items-center justify-center border-b">
                <span className="text-lg text-gray-700">No upcoming games</span>
            </div>
        );
    }
}