import Link from "next/link";
import { getUserBrackets } from "@/app/lib/data";
import { User, Bracket } from "@/app/lib/definitions";
import BracketCard from "@/app/ui/dashboard/bracket-card";


export default async function BracketsDisplay({ user } : {user: User | null}) {
    let rawBracketData : Bracket[] = [];
    if (user) {
        rawBracketData = await getUserBrackets(user);
    }
    
    return (
        <div className="mx-2 sm:mx-16 overflow-x-auto bg-gray-200 p-4 rounded-lg">
            <div className="flex justify-between p-2 bg-blue-400 text-white min-w-[30rem] rounded-t-md">
                <h2 className="text-lg font-semibold">Your Brackets</h2>

                <Link href="/dashboard/create">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>

            <ul className="w-full text-center max-h-96 min-w-[30rem] overflow-y-auto">
                    <li className="flex justify-between text-lg font-semibold p-2 mb-4 bg-gray-300">
                        <p className="basis-[25%]">Name</p>
                        <p className="basis-[25%]">Description</p>
                        <p className="basis-[25%]">Start Date</p>
                        <p className="basis-[25%]">End Date</p>
                    </li>

                    <div className="p-2">
                        { rawBracketData.map((bracket) => (
                            <BracketCard key={bracket.bracket_id} name={bracket.name} description={bracket.description} start={bracket.start_date} end={bracket.end_date} />
                        )) }
                    </div>
            </ul>
            
        </div>
    );
}