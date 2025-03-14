import { Game, Team } from "@/app/lib/definitions";
import { getTeamData } from "@/app/lib/data";

function dateTimeString(date: Date) {
    return `${date.toString().slice(0,24)}`;
}

export default async function UpcomingLeagueGameElement({ game }: { game: Game }) {
    const home_team: Team | null = await getTeamData(game.home_team_id);
    const away_team: Team | null = await getTeamData(game.away_team_id);

    if (!home_team || !away_team) {
        return null;
    }
    
    return (
        <li className="flex-shrink-0 border-l px-2 w-48">
            <div className="grid grid-cols-2 h-full items-center">
                <span className="bg-red-400 rounded-md p-1 text-left text-sm col-span-2 truncate">{home_team.name}</span>
                <span className="bg-blue-400 rounded-md p-1 text-left text-sm col-span-2 truncate">{away_team.name}</span>
                <span className="text-sm text-gray-500 col-span-2">{dateTimeString(game.game_time)}</span>
            </div>
        </li>
    );
}
