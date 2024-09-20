import KnowUs from '@/components/KnowUs';
import HelpUs from '@/components/HelpUs';
export default function Home(): JSX.Element {
  return (
    <main className='flex  flex-col items-center  px-24 '>
      <KnowUs />
      <HelpUs />
    </main>
  );
}
