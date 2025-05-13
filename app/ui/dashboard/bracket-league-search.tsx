export default function BracketLeagueSearch() {
    return (
        <form action="" className="p-4 flex flex-col items-center">

            <label htmlFor="search" className="text-3xl font-semibold">Search</label>
            <div className="flex max-w-[500px] w-full p-2 border rounded-xl">
                <input type="text" id="search" name="search" placeholder="Search teams..." maxLength={255} className="p-2 w-full focus:outline-none"/>
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </form>
        
    );
}