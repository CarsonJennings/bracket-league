'use client'

import { useActionState } from "react";
import { login } from "@/app/lib/auth";
import { LoginState } from '@/app/lib/definitions';
import LoginStatus from "@/app/ui/login/login-status";

const initialState: LoginState = {
    errors: {},
    message: null,
};

export default function Login() {
    const [state, formAction] = useActionState(login, initialState);
    
    return (
        <form action={formAction} className="bg-gray-200 w-1/2 p-8 mt-32 rounded-md">
            <h3 className="text-2xl font-semibold py-[10px]">
                Login
            </h3>

            <label className="block py-[10px]" htmlFor="email">Email</label>
            <input className="block p-[5px]" type="text" placeholder="Email" id="email" name="email" required/>

            <label className="block py-[10px]" htmlFor="password">Password</label>
            <input className="block p-[5px]" type="password" placeholder="Password" id="password" name="password" required/>

            <button type="submit" className="cursor-pointer p-[10px] mt-10 bg-blue-500 hover:bg-blue-600 rounded-md text-center text-white">
                Log in
            </button>

            <LoginStatus loginState={state}/>
        </form>
    );
}