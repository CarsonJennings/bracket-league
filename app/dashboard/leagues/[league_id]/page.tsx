import { getLeagueData } from "@/app/lib/data";
import TableLeagueRanking from "@/app/ui/dashboard/leagues/table-league-ranking";
import TeamList from "@/app/ui/dashboard/leagues/team-list";
import UpcomingLeagueGames from "@/app/ui/dashboard/leagues/upcoming-league-games";

export default async function Page({
    params,
  }: {
    params: Promise<{ league_id: string }>
  }) {
    const { league_id } = await params;
    const rawLeagueData = await getLeagueData(league_id);

    if (!rawLeagueData) {
        return <div>An Unexpected error has occured</div>
    }
    return (
        <>
          <section className="py-8 bg-gray-200 flex justify-center">
            <div className="mx-4 max-w-xl flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-2">{rawLeagueData.name}</h1>
              <h4 className="text-lg font-semibold">{rawLeagueData.start_date.toDateString()} - {rawLeagueData.end_date.toDateString()}</h4>
              <h2 className="text-lg">{rawLeagueData.description}</h2>
            </div>
          </section>

          <section>
            <UpcomingLeagueGames league_id={rawLeagueData.league_id}/>
          </section>
          
          <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-4">
            <section className="overflow-x-auto p-2 lg:col-span-2">
              <div className="bg-gray-100 w-fit pb-2 rounded-md shadow-md">
                <TableLeagueRanking league_id={rawLeagueData.league_id} />
              </div>
            </section>
            
            <section className="overflow-x-auto p-2 lg:col-span-2">
              <div className="bg-gray-100 w-fit pb-2 rounded-md shadow-md">
                <TeamList league_id={rawLeagueData.league_id}/>
              </div>
            </section>
          </div>
        </>
    );
  }