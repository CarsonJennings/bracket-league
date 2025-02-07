import Link from "next/link"
import Steps from "@/app/ui/steps";
import WhyBracketLeague from "@/app/ui/why-bracket-league";

export default function Home() {
  return (
    <main className="flex flex-col p-6 items-center">
      <section>
        <h1 className="text-6xl text-center font-semibold p-6">
          Welcome to <span className="text-red-500">Bracket</span> <span className="text-blue-500">League</span>
        </h1>
        <h2 className="text-xl text-center text-gray-600">
          Easily keep track of all your sports leagues and tournaments in one place!
        </h2>
      </section>

      <div className="border-b-[1px] border-gray-300 w-3/4 my-10"></div>

      <section className="w-10/12">
        <Steps />
      </section>

      <div className="border-b-[1px] border-gray-300 w-3/4 my-10"></div>

      <section className="w-10/12">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-10">
            Why Bracket League?
          </h2>

          <WhyBracketLeague />
        </div>
      </section>

      <div className="border-b-[1px] border-gray-300 w-3/4 my-10"></div>

      <section>
        <h3 className="text-3xl mt-16 mb-12 text-center">
          Ready to join in on the action?
        </h3>
        <div className="flex flex-row justify-center">
          <Link href="/login" className="bg-red-500 p-4 mr-16 rounded-full text-white hover:bg-red-600 duration-150">
            Login
          </Link>
          <Link href="/sign-up" className="bg-blue-500 p-4 rounded-full text-white hover:bg-blue-600 duration-150">
            Sign up
          </Link>
        </div>
      </section>
      

    </main>
  );
}
