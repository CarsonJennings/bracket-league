import { scheduleLeagueGame } from "@/app/lib/actions";
import { Team } from "@/app/lib/definitions";
import { useActionState } from "react";

export default function FormScheduleGame({ teams, league_id }: { teams: Team[], league_id: string}) {
    const initialState: string = "";
    const scheduleLeagueGameWithId = scheduleLeagueGame.bind(null, league_id);
    const [formState, formAction] = useActionState(
        scheduleLeagueGameWithId,
        initialState
    );
    
    return (
        <form action={formAction} className="bg-gray-100 p-8 rounded-xl border w-96 mt-2">
            <label htmlFor="game-time" className="block font-semibold">
                Game time
            </label>
            <input type="datetime-local" id="game-time" name="game-time" className="block mb-2 p-1 w-full"/>
            
            <label htmlFor="home-team" className="block font-semibold">
                Home team
            </label>
            <select id="home-team" name="home-team" className="block mb-2 p-1 w-full">
                {teams.map((team) => (
                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                ))}
            </select>

            <label htmlFor="away-team" className="block font-semibold">
                Away team
            </label>
            <select id="away-team" name="away-team" className="block mb-2 p-1 w-full">
                {teams.map((team) => (
                    <option key={team.team_id} value={team.team_id}>{team.name}</option>
                ))}
            </select>
            <button type="submit" className="w-full bg-red-400 hover:bg-red-500 p-1 mx-auto text-white font-semibold rounded-md">Schedule</button>

            
            {formState === 'Success' ? <span className="block rounded-md text-green-400 text-center">Team added successfully</span> : <span className="block rounded-md text-red-500 text-center">{formState}</span>}
            
        </form>
    )
}