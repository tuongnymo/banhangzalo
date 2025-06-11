"use client";
export const dynamic = "force-dynamic"; // ép client-side rendering

import { Suspense } from "react";
import dynamicImport from "next/dynamic"; // ✅ Đổi tên biến import

const BankPaymentClient = dynamicImport(() => import("./BankPaymentClient"), {
  ssr: false,
});

export default function BankPaymentPage() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <BankPaymentClient />
    </Suspense>
  );
}
