import { useActionState } from "react";
import { createLeagueTeam } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

export default function FormCreateTeam({ user, league_id} : { user: User, league_id: string }) {
    const initialState: string = "";
    const createTeamWithUser = createLeagueTeam.bind(null, user, league_id);
    const [stateMessage, createTeamAction] = useActionState(createTeamWithUser, initialState);


    return (
        <form action={createTeamAction} className="flex flex-col items-center p-8 bg-gray-200 border border-gray-400 rounded-md gap-4">
            <h4 className="text-xl font-semibold">Create a new team</h4>
            <div>
                <label htmlFor="team-name" className="block">Team name </label>
                <input type="text" id="team-name" name="team-name" autoComplete="off" className="block" maxLength={255}/>
            </div>

            <button className="bg-red-400 p-1 rounded-lg hover: text-white font-semibold hover:bg-red-500">
                Create team
            </button>

            {stateMessage === 'Success' ? <span className="w-full rounded-md text-green-400 text-center">Team added successfully</span> : <span className="w-full rounded-md text-red-500 text-center">{stateMessage}</span>}

        </form>
    );
}