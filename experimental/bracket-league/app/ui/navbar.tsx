import Image from 'next/image';
import Link from 'next/link';


export default function NavBar() {
    return (
        <nav className="flex p-4 items-center border-b-gray-200 border-b-2">
            <div className="">
                <ul className='flex items-center'>
                    <li className='mr-16'>
                        <Link href='/' className='py-4'>
                            <Image
                            src="/bracket-league.png"
                            width={60}
                            height={60}
                            alt='bracket league logo'
                            />                
                        </Link>
                    </li>
                    <li>
                        <Link href="/brackets" className='px-4 py-4 hover:text-red-500 duration-150 text-base font-semibold'>
                            Your Brackets
                        </Link>
                    </li>
                    <li>
                        <Link href="/leagues" className='px-4 py-4 hover:text-red-500 duration-150 text-base font-semibold'>
                            Your Leagues
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className='px-4 py-4 hover:text-red-500 duration-150 text-base font-semibold'>
                            Create
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Could put a profile button and some other buttons onto the navbar as necessary */}
        </nav>
    );
}