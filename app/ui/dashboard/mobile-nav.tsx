'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/lib/auth";
import { User } from "@/app/lib/definitions";

export default function MobileNav({user} : {user: User}) {
    const [isVisible, setIsvisible] = useState(false);
    
    const toggleIsVisible = () => {
        setIsvisible(!isVisible);
    };
    
    return (
        <div className="sm:hidden w-full">
            <div className='flex justify-between'>
                <Link href='/dashboard'>
                    <Image
                    className='rounded-xl'
                    src="/bracket-league.png"
                    width={60}
                    height={60}
                    alt='bracket league logo'
                    />                
                </Link>
                
                <button onClick={toggleIsVisible} type='button' className="p-1 rounded-md focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={isVisible ? "size-10 hidden" : "size-10 block"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={isVisible ? "size-10 block" : "size-10 hidden"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {isVisible ? <ul className="mt-2">
                <li>
                    <Link href="/dashboard/brackets" className='text-white hover:text-red-100 duration-150 text-base font-semibold'>
                        Brackets
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/leagues" className='text-white hover:text-red-100 duration-150 text-base font-semibold'>
                        Leagues
                    </Link>
                </li>
                <li className="border-b pb-1">
                    <Link href="/dashboard/create" className='text-white hover:text-red-100 duration-150 text-base font-semibold'>
                        Create
                    </Link>
                </li>
                <li className="text-white text-base font-semibold my-1 truncate">
                    Hello {user.firstName},
                </li>
                <li className="text-white hover:text-red-100 duration-150 text-base font-semibold">
                    Profile
                </li>
                <li className="text-white hover:text-red-100 duration-150 text-base font-semibold">
                    Settings
                </li>
                <li className="text-white hover:text-red-100 duration-150 text-base font-semibold">
                    <form action={logout}>
                        <button type="submit">
                            Logout
                        </button>
                    </form>
                </li>
            </ul> : null}
        </div>
    );
}