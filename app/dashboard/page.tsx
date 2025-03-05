import type { Metadata } from 'next'
import LeaguesDisplay from '@/app/ui/dashboard/leagues-display';
import BracketsDisplay from '@/app/ui/dashboard/brackets-display';
import { getUserSession } from '@/app/lib/sessions';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Browse all of your leagues and brackets on the dashboard page. Explore and join new brackets and leagues as well!',
    keywords: 'Dashboard, Home, My Profile, Leagues, Brackets, Tournaments',
  }

export default async function Page() {
    const user = await getUserSession();

    return (
        <main>
            <h1 className='text-4xl font-bold ml-2 sm:ml-16 my-8 px-2 w-fit border-b border-black'>Dashboard</h1>
            
            <section className='mb-16 max-w-screen-xl m-auto'>
                <LeaguesDisplay user={user} />
            </section>

            <section className='max-w-screen-xl m-auto'>
                <BracketsDisplay user={user} />
            </section>

        </main>
    );
} 