export default function PaymentStatusLoading() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"></div>
        <p>Đang xử lý thanh toán...</p>
      </div>
    </div>
  )
}
