import { Skeleton } from "@/components/ui/skeleton";

function AnimalCardSkeleton(): React.JSX.Element {
  return (
    <div className="card-gradient-border flex flex-col overflow-hidden rounded-2xl bg-background/80">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-auto h-4 w-1/3" />
      </div>
    </div>
  );
}

export default AnimalCardSkeleton;
