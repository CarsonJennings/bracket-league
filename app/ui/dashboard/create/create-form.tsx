'use client'

import { useActionState } from "react";
import { CreateState } from "@/app/lib/definitions";
import { createBracketLeague } from '@/app/lib/actions';

const initialState: CreateState = {
    errors: {},
    message: null,
};

export default function CreateForm() {
    const [state, formAction] = useActionState(
        createBracketLeague,
        initialState,
    );
    
    return (
        <form action={formAction} className="flex flex-col text-center">            
            <label htmlFor="type" className="font-semibold mt-4">Select Type</label>
            <select name="type" id="type">
                <option value="league">League</option>
                <option value="bracket">Bracket</option>
            </select>
            
            <label htmlFor="name" className="font-semibold mt-4">Name</label>
            <input type="text" className="" id="name" name="name" autoComplete="off" required/>
            
            <label htmlFor="description" className="font-semibold mt-4">Description</label>
            <textarea name="description" id="description" rows={4} className="p-1"></textarea>
            
            <label htmlFor="start-date" className="font-semibold mt-4">Start date</label>
            <input type="date" className="" id="start-date" name="start-date" autoComplete="off" required/>
            
            <label htmlFor="end-date" className="font-semibold mt-4">End date</label>
            <input type="date" className="" id="end-date" name="end-date" autoComplete="off" required/>

            <button type="submit" className=" bg-blue-400 hover:bg-blue-500 duration-150 font-semibold text-white p-2 mt-5 rounded-lg">
                Create
            </button>


        </form>
    );
}