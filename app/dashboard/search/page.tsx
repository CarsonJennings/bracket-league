'use client'

import BracketLeagueSearch from "@/app/ui/dashboard/bracket-league-search";
import SearchResults from "@/app/ui/dashboard/search/search-results";
import { Suspense } from "react";

export default function Page() {
    return (
    <div className="max-w-screen-xl m-auto">
        <h2 className='text-4xl font-bold ml-2 my-8 px-2 w-fit border-b border-black'>Results</h2>
        <BracketLeagueSearch />
        <Suspense>
            <SearchResults />
        </Suspense>
    </div>
  );
}