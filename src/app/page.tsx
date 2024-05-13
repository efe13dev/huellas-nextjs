import KnowUs from '@/components/KnowUs';
import HelpUs from '@/components/HelpUs';
export default function Home(): JSX.Element {
  console.log(process.env.TURSO_DATABASE_URL);
  return (
    <main className='flex  flex-col items-center  px-24'>
      <h1>main content</h1>
      <KnowUs />
      <HelpUs />
    </main>
  );
}
