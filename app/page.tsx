import Link from "next/link"
import Steps from "@/app/ui/steps";
import WhyBracketLeague from "@/app/ui/why-bracket-league";
import LandingNavbar from "@/app/ui/landing-navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <LandingNavbar />

      <section>
        <h1 className="text-6xl text-center font-semibold p-6">
          Welcome to <span className="text-red-500">Bracket</span> <span className="text-blue-500">League</span>
        </h1>
        <h2 className="text-xl text-center text-gray-600">
          Easily keep track of all your sports leagues and tournaments in one place!
        </h2>
        <div className="flex justify-center mt-4">
          <Link href="/sign-up" className="bg-gradient-to-tr from-red-500 to-blue-500 text-white p-4 rounded-lg">
            Get Started
          </Link>
        </div>
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
      

    </main>
  );
}
