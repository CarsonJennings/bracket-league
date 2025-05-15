'use client'

import { getBracketLeagueSearchResults } from "@/app/lib/data";
import { BracketLeagueSearchResult } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
    const [results, setResults] = useState<BracketLeagueSearchResult[]>([]);
    const searchParams = useSearchParams();
    
    let search = searchParams.get('q');
    if (!search) {
        search = " ";
    }

    useEffect(() => {
        const fetchResults = async () => {
            const newResults = await getBracketLeagueSearchResults(search);
            setResults(newResults);
        };

        fetchResults();
    }, [search]);

    return (
        <div>
            <h3 className="text-lg font-semibold text-blue-500">
                Results for: <span className="text-black">{search}</span>
            </h3>
            { results.length === 0 ? <div className="mt-8 text-center text-lg">No results matched your search</div> :
                <ul className="mt-4 mx-4">
                    {results.map((result) => (
                        <li key={result.id+result.type} className="flex flex-row  justify-between items-center border p-4 rounded-xl my-2">
                            <div className="flex flex-col">
                                <Link href={result.type === 'league' ? `/dashboard/leagues/${result.id}` : `/dashboard/brackets/${result.id}`}
                                    className="font-semibold hover:text-red-500 duration-100">
                                    {result.name}
                                </Link>
                                <p className="text-gray-500 text-sm">{result.description}</p>
                            </div>
                            {
                                result.type === "bracket" ? <span className="bg-red-400 h-min text-white w-min p-2 rounded-lg">Bracket</span> :
                                <span className="bg-blue-400 h-min text-white w-min p-2 rounded-lg">League</span>
                        
                            }
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}