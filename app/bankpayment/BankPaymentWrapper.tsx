'use client';

import dynamic from 'next/dynamic';

const BankPaymentClient = dynamic(() => import('./BankPaymentClient'), {
  ssr: false,
});

export default function BankPaymentWrapper() {
  return <BankPaymentClient />;
}
