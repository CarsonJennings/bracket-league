import Image from 'next/image';
import Link from 'next/link';


export default function NavBar() {
    return (
        <nav className="flex p-4 items-center bg-gradient-to-r from-red-400 to-blue-400">
            <div className="">
                <ul className='flex items-center'>
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
                        <Link href="/brackets" className='px-4 py-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Your Brackets
                        </Link>
                    </li>
                    <li>
                        <Link href="/leagues" className='px-4 py-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Your Leagues
                        </Link>
                    </li>
                    <li>
                        <Link href="/create" className='px-4 py-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Create
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Could put a profile button and some other buttons onto the navbar as necessary */}
        </nav>
    );
}