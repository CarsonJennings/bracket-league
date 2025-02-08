'use client'

import { SignUpState } from '@/app/lib/definitions'
import { createUser } from '@/app/lib/actions';
import SignUpStatus from '@/app/ui/sign-up/sign-up-status';
import { useActionState } from 'react';

const initialState: SignUpState = {
    errors: {},
    message: null,
};

export default function SignUp() {
    const [state, formAction] = useActionState(
        createUser,
        initialState,
    );

    return (
        <div className="flex flex-col items-center relative top-16 bg-gray-200 w-full max-w-md p-8 rounded-md">
            <h3 className="flex-1 text-2xl font-semibold py-[10px] border-b border-black w-32 text-center">
                Sign Up
            </h3>
            <form action={formAction} className="flex-1 my-8 w-full">
                <div className="">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="First name" id="first-name" name='first-name' maxLength={30} autoComplete='on' required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="Last name" id="last-name" name='last-name' maxLength={30} autoComplete='on' required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="Email" id="email" name='email' autoComplete='on' required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="password" placeholder="Password" id="password" name='password' autoComplete='off' required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="password" placeholder="Confirm password" id="confirm-password" name='confirm-password' autoComplete='off' required/>
                </div>

                <button type="submit" className="cursor-pointer p-[10px] mt-10 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-center text-white">
                    Sign up
                </button>
                <SignUpStatus signUpState={state} />

            </form>
        </div>
    );
}