// import { createBracket, createLeague } from "@/app/lib/data";

export default function CreateForm() {
    return (
        <form action="" className="flex flex-col text-center">            
            <label htmlFor="type" className="font-semibold mt-4">Select Type</label>
            <select name="type" id="type">
                <option value="league">League</option>
                <option value="bracket">Bracket</option>
            </select>
            
            <label htmlFor="name" className="font-semibold mt-4">Name</label>
            <input type="text" className="" required/>
            
            <label htmlFor="description" className="font-semibold mt-4">Description</label>
            <textarea name="description" id="description" rows={4} className="p-1"></textarea>
            
            <label htmlFor="start-date" className="font-semibold mt-4">Start date</label>
            <input type="date" className="" required/>
            
            <label htmlFor="end-date" className="font-semibold mt-4">End date</label>
            <input type="date" className="" required/>

            <button type="submit" className=" bg-blue-400 hover:bg-blue-500 duration-150 font-semibold text-white p-2 mt-5 rounded-lg">
                Create
            </button>


        </form>
    );
}