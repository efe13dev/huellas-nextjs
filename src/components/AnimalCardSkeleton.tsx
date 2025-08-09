import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function AnimalCardSkeleton(): React.JSX.Element {
  return (
    <Card className="flex h-[500px] flex-col overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <CardContent className="flex-grow p-6">
        <Skeleton className="mb-4 h-8 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
      </CardContent>
      <CardFooter className="p-6">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export default AnimalCardSkeleton;
