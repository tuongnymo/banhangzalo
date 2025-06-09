// app/bankpayment/page.tsx
"use client"

import { Suspense } from "react"
import BankPaymentClient from "./BankPaymentClient"

export default function BankPaymentPage() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <BankPaymentClient />
    </Suspense>
  )
}
