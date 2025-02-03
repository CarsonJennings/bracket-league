'use client'

import { logout } from "@/app/lib/auth";

export default function Dropdown({isVisible}: {isVisible: boolean}) {
    
    return (
    <div>
        { isVisible ? (
            <ul className="absolute p-2 bg-gray-50 mt-[18px] w-full border-2">
            <li className="block">
                Profile
            </li>
            <li className="block">
                Settings
            </li>
            <li className="block">
                <form action={logout}>
                    <button type="submit">
                        Logout
                    </button>
                </form>
            </li>
            </ul>
            ) : null
        }
    </div>
    );
}