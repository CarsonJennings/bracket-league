import { GameWithTeamNames } from "@/app/lib/definitions";

export default function GameCard({ game }: { game: GameWithTeamNames }) {
    return (
        <li className="flex flex-col p-4 border rounded-lg m-1">
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
        </li>
    );
}