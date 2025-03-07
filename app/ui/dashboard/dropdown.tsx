'use client'

import { logout } from "@/app/lib/auth";

export default function Dropdown({isVisible}: {isVisible: boolean}) {
    
    return (
    <>
        { isVisible ? (
            <ul className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
            <li className="block px-4 py-1 text-sm text-gray-700">
                Profile
            </li>
            <li className="block px-4 py-1 text-sm text-gray-700">
                Settings
            </li>
            <li className="block px-4 py-1 text-sm text-gray-700">
                <form action={logout}>
                    <button type="submit">
                        Logout
                    </button>
                </form>
            </li>
            </ul>
            ) : null
        }
    </>
    );
}