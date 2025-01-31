import Image from 'next/image';
import Link from 'next/link';
import ProfileLink from '@/app/ui/profile-link';
import { getSession } from "@/app/lib/sessions";
import { User } from "@/app/lib/definitions"


export default async function NavBar() {
    const session = await getSession();
    if (!session) {
        return;
    }
    const user: User = session.user;
    return (
        <nav className="flex p-4 items-center bg-gradient-to-r from-red-400 to-blue-400">
            <ul className='flex items-center w-full'>
                    <li className='mr-16'>
                        <Link href='/'>
                            <Image
                            className='rounded-xl'
                            src="/bracket-league.png"
                            width={60}
                            height={60}
                            alt='bracket league logo'
                            />                
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/brackets" className='p-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Your Brackets
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/leagues" className='p-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Your Leagues
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/create" className='p-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Create
                        </Link>
                    </li>
                    <li className='ml-auto'>
                        <ProfileLink user={user}/>
                    </li>
                </ul>
        </nav>
    );
}