export default function TableLeagueRankingElement({ rank, name, games_played, wins, losses, ties} : 
    { rank: number, name: string, games_played: number, wins: number, losses: number, ties: number }) {
    
    return (
        <>
            <tr className="text-center ">
                <th scope="row" className="font-semibold px-4 border-b border-gray-200">{rank}</th>
                <td className="px-4 border-b border-gray-200">{name}</td>
                <td className="px-4 border-b border-gray-200">{games_played}</td>
                <td className="px-4 border-b border-gray-200">{wins}</td>
                <td className="px-4 border-b border-gray-200">{losses}</td>
                <td className="px-4 border-b border-gray-200">{ties}</td>
            </tr>
        </>
    );
}