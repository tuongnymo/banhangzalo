export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-64 w-full rounded-lg bg-gray-300"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
      </div>
    </div>
  )
}
