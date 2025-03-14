export default function FormCreateTeam() {
    return (
        <div className="flex flex-col items-center p-8 bg-gray-200 border border-gray-400 rounded-md gap-4">
            <h4 className="text-xl font-semibold">Create a new team</h4>
            <div>
                <label htmlFor="team-name" className="block">Team name </label>
                <input type="text" id="team-name" name="team-name" className="block" />
            </div>

            <button className="bg-red-400 p-1 rounded-lg hover: text-white font-semibold hover:bg-red-500">
                Create team
            </button>

        </div>
    );
}