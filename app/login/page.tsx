import Login from "@/app/ui/login/login"
import LandingNavbar from "@/app/ui/landing-navbar";

export default function Page() {
    return (
        <main className="flex flex-col items-center min-h-lvh">
            <LandingNavbar />
            <Login />
        </main>
    );
}