import AnimalCardSkeleton from "./AnimalCardSkeleton";

function AnimalCardSkeletonGrid(): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {[...Array(6)].map((_, index) => (
        <AnimalCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default AnimalCardSkeletonGrid;
