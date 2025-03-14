import { getLeagueTeams } from "@/app/lib/data";
import { Team } from "@/app/lib/definitions";
import TeamListElement from "@/app/ui/dashboard/leagues/team-list-element";
import ButtonCreateTeam from "@/app/ui/dashboard/leagues/button-create-team";

export default async function TeamList({ league_id } : { league_id: string }) {
    const teams = await getLeagueTeams(league_id);

    return (
        <>
            <div className="flex justify-between p-1 mb-2 rounded-t-lg bg-blue-400">
                <h3 className="text-gray-100 text-lg font-semibold">Teams</h3>
                <ButtonCreateTeam />

            </div>
            <ul>
                {teams.map((team) => (
                    <TeamListElement team={team} />
                ))} 
            </ul>
        </>
    );
}