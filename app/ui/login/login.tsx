
export default function Login() {
    return (
        <form className="bg-gray-200 w-1/2 p-8 mt-32 rounded-md">
            <h3 className="text-2xl font-semibold py-[10px]">
                Login
            </h3>

            <label className="block py-[10px]" htmlFor="username">Username</label>
            <input className="block p-[5px]" type="text" placeholder="Username" id="username"/>

            <label className="block py-[10px]" htmlFor="password">Password</label>
            <input className="block p-[5px]" type="text" placeholder="Password" id="password"/>

            <button className="cursor-pointer p-[10px] mt-10 bg-blue-500 hover:bg-blue-600 rounded-md text-center text-white">
                Log in
            </button>

        </form>
    );
}