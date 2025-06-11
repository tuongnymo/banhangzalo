// app/thankyou/page.tsx hoặc page.jsx
"use client";

import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
