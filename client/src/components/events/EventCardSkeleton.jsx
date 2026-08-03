import Skeleton from "../common/Skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md">
      {/* Top half: Image Area */}
      <div className="relative h-[55%] bg-gray-50 border-b border-gray-100 p-3">
        {/* Type Badge */}
        <Skeleton className="absolute top-3 left-3 w-16 h-6 rounded-full" />
        
        {/* Heart Icon Button */}
        <Skeleton className="absolute top-3 right-3 w-8 h-8 rounded-full" />
        
        {/* Price Badge */}
        <Skeleton className="absolute bottom-3 right-3 w-14 h-7 rounded-full" />
      </div>

      {/* Bottom half: Content Area */}
      <div className="p-5 h-[45%] flex flex-col justify-between">
        <div>
          {/* Title */}
          <Skeleton className="w-full h-6 mb-2" />
          <Skeleton className="w-3/4 h-6 mb-3" />
          
          {/* Location */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full shrink-0" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex items-center gap-2 mt-2 w-fit">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
