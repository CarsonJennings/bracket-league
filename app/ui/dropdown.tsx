'use client'

import { logout } from "@/app/lib/auth";
import { useActionState } from "react";

export default function Dropdown({isVisible}: {isVisible: boolean}) {
    const [state, formAction] = useActionState(logout, null);
    
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
                <form action={formAction}>
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