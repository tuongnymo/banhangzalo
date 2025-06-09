export function getStatusInfo(status: string) {
  switch (status) {
    case "pending":
      return { text: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" }
    case "confirmed":
      return { text: "Đã xác nhận", color: "bg-blue-100 text-blue-800" }
    case "processing":
      return { text: "Đang xử lý", color: "bg-purple-100 text-purple-800" }
    case "shipped":
      return { text: "Đang giao hàng", color: "bg-indigo-100 text-indigo-800" }
    case "delivered":
      return { text: "Đã giao hàng", color: "bg-green-100 text-green-800" }
    case "cancelled":
      return { text: "Đã huỷ", color: "bg-red-100 text-red-800" }
    case "refunded":
      return { text: "Hoàn tiền", color: "bg-gray-200 text-gray-700" }
    default:
      return { text: status, color: "bg-gray-100 text-gray-800" }
  }
}
