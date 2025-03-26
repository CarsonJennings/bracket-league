'use client'

import { Team } from "@/app/lib/definitions";
import Link from "next/link";
import { joinLeagueTeam } from "@/app/lib/actions";

export default function TeamListElement({ team, user_id, can_join } : { team: Team, user_id: string, can_join: boolean}) {
    return (
        <li className="border-b flex justify-between p-1 gap-2 items-center">
            <Link href="#">
                {team.name}
            </Link>
            { can_join ?
            <button onClick={() => {joinLeagueTeam(user_id, team.team_id)}} className="p-2 bg-red-400 text-sm text-white rounded-md hover:bg-red-500">
                Join
            </button> : null}
        </li>
    );
}