export default function FormScheduleGame() {
    return (
        <form action="" className="bg-gray-100 p-8 rounded-xl border mt-2">
            <label htmlFor="game-time" className="block font-semibold">
                Game time
            </label>
            <input type="datetime-local" id="game-time" name="game-time" className="block mb-2 p-1 w-full"/>
            
            <label htmlFor="home-team" className="block font-semibold">
                Home team
            </label>
            <input type="text" id="home-team" name="home-team" className="block mb-2 p-1 w-full"/>

            <label htmlFor="away-team" className="block font-semibold">
                Away team
            </label>
            <input type="text" id="away-team" name="away-team" className="block mb-8 p-1 w-full"/>
            <button type="submit" className="w-full bg-red-400 hover:bg-red-500 p-1 mx-auto text-white font-semibold rounded-md">Schedule</button>
        </form>
    )
}