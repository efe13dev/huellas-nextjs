import { type JSX } from 'react';
import KnowUs from '@/components/KnowUs';
import HelpUs from '@/components/HelpUs';

export default function Component(): JSX.Element {
  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10'>
      <main className='container mx-auto px-6 py-12 md:py-24 space-y-16'>
        <KnowUs />
        <HelpUs />
      </main>
    </div>
  );
}
