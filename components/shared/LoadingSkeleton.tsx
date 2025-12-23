
import { Skeleton } from "@/components/ui/skeleton";

export function DesktopLoadingSkeleton() {
  return (
    <div className="hidden lg:block">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6">
            <Skeleton className="h-80 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-48 rounded-3xl" />
            <Skeleton className="h-48 rounded-3xl" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-96 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileLoadingSkeleton() {
  return (
    <div className="lg:hidden">
      <div className="mobile-container relative">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-5 w-32 mb-4" />

          <div className="mb-6">
            <Skeleton className="h-56 rounded-3xl" />
          </div>

          <Skeleton className="h-32 w-full rounded-3xl mb-6" />

          <div className="flex gap-3 mb-6">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>

          <Skeleton className="h-80 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <DesktopLoadingSkeleton />
      <MobileLoadingSkeleton />
    </main>
  );
}
