import { getLeagueData } from "@/app/lib/data";

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
          <section className="py-8 bg-slate-200 flex justify-center">
            <div className="mx-4 max-w-xl flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-2">{rawLeagueData.name}</h1>
              <h3 className="text-lg font-semibold">{rawLeagueData.start_date.toDateString()} - {rawLeagueData.end_date.toDateString()}</h3>
              <h2 className="text-lg">{rawLeagueData.description}</h2>
            </div>
          
          </section>
          <section>leaderboard with teams and scoring</section>
          <section>Upcoming games</section>
        </>
    );
  }