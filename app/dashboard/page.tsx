import type { Metadata } from 'next'
import LeaguesDisplay from '@/app/ui/dashboard/leagues-display';
import BracketsDisplay from '@/app/ui/dashboard/brackets-display';
import { getUserSession } from '@/app/lib/sessions';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Browse all of your leagues and brackets on the dashboard page. Explore and join new brackets and leagues as well!',
  }

export default async function Page() {
    const user = await getUserSession();

    return (
        <main className='w-4/5 bg-gray-200 m-auto'>
            <h1 className='text-2xl font-semibold mb-16'>The dashboard page</h1>
            
            <section className='mb-16'>
                <LeaguesDisplay user={user} />
            </section>

            <section>
                <BracketsDisplay user={user} />
            </section>

        </main>
    );
} 