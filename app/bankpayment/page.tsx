import { Suspense } from "react"
import BankPaymentClient from "./BankPaymentClient"

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải trang thanh toán...</div>}>
      <BankPaymentClient />
    </Suspense>
  )
}
