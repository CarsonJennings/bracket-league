import TableLeagueRankingElement from "@/app/ui/dashboard/leagues/table-league-ranking-element";
import { getLeagueTeams } from "@/app/lib/data";
import { Team } from "@/app/lib/definitions"

export default async function TableLeagueRanking({ league_id }: { league_id : string}) {
  const leagueTeams: Team[] = await getLeagueTeams(league_id);
  return (
        <>
            <table className="border-2 border-gray-700">
              <caption className="text-xl font-semibold mb-2">League rankings</caption>
              <thead>
                <tr>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Rank</th>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Team</th>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Games played</th>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Wins</th>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Losses</th>
                  <th scope="col" className="font-semibold border border-gray-700 px-2">Ties</th>
                </tr>
              </thead>
              <tbody>
                { 
                leagueTeams.map((team, index) => (
                    <TableLeagueRankingElement key={team.team_id} rank={index + 1} name={team.name} games_played={team.games_played}
                    wins={team.wins} losses={team.losses} ties={team.ties} />
                )) }
              </tbody>
            </table>
        </>
    );
}