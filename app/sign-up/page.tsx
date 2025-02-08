import SignUp from "@/app/ui/sign-up/sign-up";
import LandingNavbar from "@/app/ui/landing-navbar";

export default function Page() {
    return (
        <main className="flex flex-col items-center min-h-lvh">
            <LandingNavbar />
            <SignUp />
        </main>
    );
}