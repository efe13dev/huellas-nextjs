import AnimalCardSkeleton from "./AnimalCardSkeleton";

function AnimalCardSkeletonGrid(): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <AnimalCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default AnimalCardSkeletonGrid;
