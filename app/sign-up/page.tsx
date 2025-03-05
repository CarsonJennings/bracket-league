import { Metadata } from "next";
import SignUp from "@/app/ui/sign-up/sign-up";
import LandingNavbar from "@/app/ui/landing-navbar";

export const metadata: Metadata = {
    title: 'Sign up',
    description: 'Create an account and sign up for Bracket League to not miss out on a second of the action!',
    keywords: 'Sign up, Create Account',
  }

export default function Page() {
    return (
        <main className="flex flex-col items-center min-h-lvh">
            <LandingNavbar />
            <SignUp />
        </main>
    );
}