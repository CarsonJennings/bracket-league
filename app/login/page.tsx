import { Metadata } from "next";
import Login from "@/app/ui/login/login"
import LandingNavbar from "@/app/ui/landing-navbar";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to Bracket League to access your account',
    keywords: 'Login, Sign in, Authenticate',
  }

export default function Page() {
    return (
        <main className="flex flex-col items-center min-h-lvh">
            <LandingNavbar />
            <Login />
        </main>
    );
}