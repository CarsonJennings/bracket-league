import { getLeagueTeams, isUserInLeague } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import TeamListElement from "@/app/ui/dashboard/leagues/team-list-element";
import ButtonCreateTeam from "@/app/ui/dashboard/leagues/button-create-team";

export default async function TeamList({ user, league_id } : { user: User, league_id: string }) {
    const teams = await getLeagueTeams(league_id);

    // Do some checking if player is already on team in the league
    const userInLeague = await isUserInLeague(user.id, league_id);

    return (
        <>
            <div className="flex justify-between p-1 mb-2 rounded-t-lg bg-blue-400">
                <h3 className="text-gray-100 text-lg font-semibold">Teams</h3>
                {userInLeague ? null : <ButtonCreateTeam user={user} league_id={league_id} />}

            </div>
            <ul>
                {teams.map((team) => (
                    <TeamListElement key={team.team_id} team={team} user_id={user.id} can_join={userInLeague ? false : true}/>
                ))} 
            </ul>
        </>
    );
}