export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-(--border-primary-dashboard)/40 ${className}`}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl border border-(--border-primary-dashboard) bg-white p-5 shadow-sm ${className}`}
    >
      <SkeletonLine className="mb-3 h-4 w-1/3" />
      <SkeletonLine className="mb-2 h-3 w-2/3" />
      <SkeletonLine className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-(--border-primary-dashboard)">
      <div className="bg-(--bg-primary-dashboard) p-4">
        <SkeletonLine className="h-4 w-1/4" />
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className={`flex items-center gap-4 border-t border-(--border-primary-dashboard) p-4 ${
            r % 2 === 0 ? "bg-white" : "bg-(--bg-primary-dashboard)/50"
          }`}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonLine
              key={c}
              className={`h-3 ${c === 0 ? "w-1/4" : "w-1/${cols + 1}"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-4 p-6">
      <SkeletonLine className="h-7 w-48" />
      <SkeletonLine className="h-4 w-96" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <SkeletonTable rows={6} cols={5} />
    </div>
  );
}
