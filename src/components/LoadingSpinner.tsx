export default function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
    </div>
  )
}
