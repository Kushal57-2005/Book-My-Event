import Skeleton from "../common/Skeleton";

export default function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="w-3/4 sm:w-1/2 h-5 mb-2" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-40 h-3 mt-2" />
      </div>
      <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 mt-3 sm:mt-0">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
    </div>
  );
}
