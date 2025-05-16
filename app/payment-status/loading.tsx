export default function PaymentStatusLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-gray-200"></div>
        <div className="mt-6 h-8 w-1/2 animate-pulse rounded bg-gray-200 mx-auto"></div>
        <div className="mt-4 h-16 animate-pulse rounded-md bg-gray-200"></div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        <div className="mt-8 h-10 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  )
}
