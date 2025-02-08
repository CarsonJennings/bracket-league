import StepsCard from "@/app/ui/steps-card";

export default function Steps() {
    return (
        <div className="flex flex-col sm:flex-row justify-center gap-5 py-10 px-5">
            <StepsCard header="1. Create or Join Leagues & Tournaments" text="Pick a sport and customize your league or tournament settings, or join an existing one!" borderColor="red"/>
            <StepsCard header="2. Invite Friends & Set Rules" text="Manage teams, game schedules, and rules." borderColor="blue"/>
            <StepsCard header="3. Keep Track of Stats & Compete" text="See real-time rankings, stats, and game results." borderColor="red"/>
        </div>
    );
}