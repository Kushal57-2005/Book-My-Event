import Skeleton from "../common/Skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="w-full h-48" />

      <div className="p-4 flex flex-col gap-3">
        {/* Category badge */}
        <Skeleton className="w-20 h-5 rounded-full" />

        {/* Title */}
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-3/4 h-6" />

        {/* Location & date */}
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/3 h-4" />

        {/* Button */}
        <Skeleton className="w-full h-10 mt-2" />
      </div>
    </div>
  );
}
