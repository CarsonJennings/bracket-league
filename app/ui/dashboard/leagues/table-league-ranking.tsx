import TableLeagueRankingElement from "@/app/ui/dashboard/leagues/table-league-ranking-element";
import { getLeagueTeams } from "@/app/lib/data";
import { Team } from "@/app/lib/definitions"

export default async function TableLeagueRanking({ league_id }: { league_id : string}) {
  const leagueTeams: Team[] = await getLeagueTeams(league_id);
  return (
        <>
            <table>
              <caption className="text-xl font-semibold mb-2">League rankings</caption>
              <thead>
                <tr>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Rank</th>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Team</th>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Games played</th>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Wins</th>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Losses</th>
                  <th scope="col" className="font-semibold border-b border-gray-700 px-4">Ties</th>
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