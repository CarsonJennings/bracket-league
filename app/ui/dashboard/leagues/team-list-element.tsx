import { Team } from "@/app/lib/definitions";
import Link from "next/link";

export default function TeamListElement({ team } : { team: Team}) {
    return (
        <li className="border-b flex justify-between p-1 gap-2 items-center">
            <Link href="#">
                {team.name}
            </Link>
            <button className="p-2 bg-red-400 text-sm text-white rounded-md hover:bg-red-500">
                Join
            </button>
        </li>
    );
}