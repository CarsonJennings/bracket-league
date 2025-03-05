import Link from "next/link";

export default function BracketCard({ name, description, start, end } : { name: string, description: string, start: Date, end: Date }) {
    return (
        <li className="flex p-2 mb-4 justify-between bg-white rounded-md shadow-md">
            <Link href="#" className="basis-[25%] truncate hover:font-semibold">{name}</Link>
            <p className="basis-[25%] truncate">{description}</p>
            <p className="basis-[25%]">{start.toDateString()}</p>
            <p className="basis-[25%]">{end.toDateString()}</p>
        </li>
    );
}