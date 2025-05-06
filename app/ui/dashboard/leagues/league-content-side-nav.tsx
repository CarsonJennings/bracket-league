import Link from "next/link";

export default function LeagueContentSideNav({ league_id }: {league_id: string}) {
    return (
        <aside className="w-32 p-4 bg-gray-100">
            <nav className="">
                <Link href={`/dashboard/leagues/${encodeURIComponent(league_id)}/`} className="block p-2 hover:bg-gray-200 rounded">Home</Link>
                <Link href={`/dashboard/leagues/${encodeURIComponent(league_id)}/games`} className="block p-2 hover:bg-gray-200 rounded">Games</Link>
            </nav>
        </aside>
    );
}