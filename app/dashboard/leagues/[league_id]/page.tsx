import { getLeagueData } from "@/app/lib/data";
import { getUserSession } from "@/app/lib/sessions";
import TableLeagueRanking from "@/app/ui/dashboard/leagues/table-league-ranking";
import TeamList from "@/app/ui/dashboard/leagues/team-list";
import UpcomingLeagueGames from "@/app/ui/dashboard/leagues/upcoming-league-games";

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
            <aside className="w-32 p-4 bg-gray-100">
                <nav className="">
                  <a href="#" className="block p-2 hover:bg-gray-200 rounded">Home</a>
                  <a href="#" className="block p-2 hover:bg-gray-200 rounded">Profile</a>
                  <a href="#" className="block p-2 hover:bg-gray-200 rounded">Settings</a>
                </nav>
            </aside>

            <div className="flex flex-col flex-1">
              <section className="overflow-x-auto p-2">
                <div className="bg-gray-100 w-full pb-2 rounded-md shadow-md">
                  <TableLeagueRanking league_id={rawLeagueData.league_id} />
                </div>
              </section>
              
              <section className="overflow-x-auto p-2">
                <div className="bg-gray-100 w-full pb-2 rounded-md shadow-md">
                  <TeamList user={user} league_id={rawLeagueData.league_id}/>
                </div>
              </section>
            </div>
          </div>
        </>
    );
  }