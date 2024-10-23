import { type JSX } from 'react';
import KnowUs from '@/components/KnowUs';
import HelpUs from '@/components/HelpUs';
export default function Component(): JSX.Element {
  return (
    <div className='min-h-screen bg-white'>
      <main className=' container mx-auto px-4 py-6 md:py-20'>
        <KnowUs />
        <HelpUs />
      </main>
    </div>
  );
}
