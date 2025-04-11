import { getLeagueData } from "@/app/lib/data";
import { getUserSession } from "@/app/lib/sessions";
import LeagueContentSideNav from "@/app/ui/dashboard/leagues/league-content-side-nav";
import UpcomingLeagueGames from "@/app/ui/dashboard/leagues/upcoming-league-games";
import GamesDisplay from "@/app/ui/dashboard/leagues/games/games-display";

export default async function Page({
    params,
  }: {
    params: Promise<{ league_id: string }>
  }) {
    const user = await getUserSession();
    if (!user) {
      return <div>ERROR 401: Unauthorized user</div>
    }
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
          
          <div className="flex overflow-auto">
            <LeagueContentSideNav league_id={league_id}/>

            <div className="flex flex-col flex-1">
              <GamesDisplay league_id={league_id}/>
            </div>
          </div>
        </>
    );
  }