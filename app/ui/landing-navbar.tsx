import Link from "next/link"
import Image from 'next/image';

export default function LandingNavbar() {
    return (
        <nav className="flex-none flex p-4 items-center bg-gradient-to-r from-red-400 to-blue-400 w-full">
            <Link href='/' className="flex-none">
                <Image
                className='rounded-xl'
                src="/bracket-league.png"
                width={60}
                height={60}
                alt='bracket league logo'
                />                
            </Link>
            <ul className='flex items-center w-full justify-end'>
                    <li>
                        <Link href="/login" className='p-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/sign-up" className='p-4 text-white hover:text-red-100 duration-150 text-base font-semibold'>
                            Sign up
                        </Link>
                    </li>
                </ul>
        </nav>
    )
}