export default function TableLeagueRankingElement({ rank, name, games_played, wins, losses, ties} : 
    { rank: number, name: string, games_played: number, wins: number, losses: number, ties: number }) {
    
    return (
        <>
            <tr className="text-center odd:bg-white even:bg-gray-200">
                <th scope="row" className="font-semibold px-2 border border-gray-700">{rank}</th>
                <td className="px-2 border border-gray-700">{name}</td>
                <td className="px-2 border border-gray-700">{games_played}</td>
                <td className="px-2 border border-gray-700">{wins}</td>
                <td className="px-2 border border-gray-700">{losses}</td>
                <td className="px-2 border border-gray-700">{ties}</td>
            </tr>
        </>
    );
}