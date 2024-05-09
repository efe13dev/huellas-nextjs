import { Button } from '@/components/ui/button';
import KnowUs from '@/components/KnowUs';
import HelpUs from '@/components/HelpUs';
export default function Home(): JSX.Element {
  return (
    <main className='flex  flex-col items-center  px-24'>
      <h1>main content</h1>
      <KnowUs />
      <HelpUs />

      <Button variant='default'>Pulsar</Button>
    </main>
  );
}
