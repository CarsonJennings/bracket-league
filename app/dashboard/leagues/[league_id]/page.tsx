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
        <div>
            <div className="">
                <h1 className="text-3xl  font-semibold">{rawLeagueData.name}</h1>
            </div>
        </div>
    );
  }