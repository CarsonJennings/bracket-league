import Link from "next/link";

export default function BracketsDisplay() {
    return (
        <div className="w-3/5 ml-16 p-2 bg-blue-400">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Your Brackets</h2>
                
                <Link href="/dashboard/create">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}