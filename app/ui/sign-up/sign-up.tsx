export default function SignUp() {
    return (
        <div className="flex flex-col items-center relative top-16 bg-gray-200 w-full max-w-md p-8 rounded-md">
            <h3 className="flex-1 text-2xl font-semibold py-[10px] border-b border-black w-32 text-center">
                Sign Up
            </h3>
            <form className="flex-1 my-8 w-full">
                <div className="">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="First name" id="first-name" required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="Last name" id="last-name" required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="text" placeholder="Email" id="email" required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="password" placeholder="Password" id="password" required/>
                </div>

                <div className="my-4">
                    <input className="p-[5px] rounded-sm w-full" type="password" placeholder="Confirm password" id="confirm-password" required/>
                </div>

                <button type="submit" className="cursor-pointer p-[10px] mt-10 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-center text-white">
                    Sign up
                </button>

            </form>
        </div>
    );
}