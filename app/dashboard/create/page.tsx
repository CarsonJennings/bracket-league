import type { Metadata } from 'next'
import CreateForm from '@/app/ui/dashboard/create/create-form' 

export const metadata: Metadata = {
  title: 'Create',
  description: 'Create new tournament brackets and leagues',
}

export default function Page() {
    return (
        <main className='flex flex-col items-center'>
            <div className=' bg-gray-200 p-8 shadow-md my-32 rounded-md'>
                <h2 className="text-2xl font-bold text-center">
                    Create a league or bracket
                </h2>
                <CreateForm />
            </div>
        </main>
    )
}