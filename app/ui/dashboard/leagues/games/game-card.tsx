import { GameWithTeamNames } from "@/app/lib/definitions";

export default function GameCard({ game }: { game: GameWithTeamNames }) {
    return (
        <div>
            {game.home_team_name} vs {game.away_team_name}
        </div>
    );
}