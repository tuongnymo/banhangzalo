export default function PaymentStatusLoading() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        <p className="mt-4 text-lg font-medium">Đang tải thông tin thanh toán...</p>
      </div>
    </div>
  )
}
