import StepsCard from "@/app/ui/steps-card";

export default function Steps() {
    return (
        <div className="flex justify-center gap-5 py-10 px-5">
            <StepsCard header="1. Create or Join Leagues & Tournaments" text="Pick a sport and customize your leauge and tournament settings, or join an existing one!"/>
            <StepsCard header="2. Invite Friends & Set Rules" text="Manage teams, game schedules, and rules."/>
            <StepsCard header="3. Keep Track of Stats & Compete" text="See real-time rankings, stats, and game results."/>
        </div>
    );
}