import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

function AnimalCardSkeleton(): React.JSX.Element {
  return (
    <Card className='overflow-hidden flex flex-col h-[500px]'>
      <Skeleton className='h-64 w-full' />
      <CardContent className='p-6 flex-grow'>
        <Skeleton className='h-8 w-3/4 mb-4' />
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-2/3 mb-4' />
        <Skeleton className='h-6 w-1/3' />
      </CardContent>
      <CardFooter className='p-6'>
        <Skeleton className='h-10 w-full' />
      </CardFooter>
    </Card>
  );
}

export default AnimalCardSkeleton;
