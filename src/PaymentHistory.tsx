import React, { useEffect, useState } from 'react';

const PAYMENTS_KEY = 'sharedPayments';

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPayments = () => {
      const paymentsRaw = localStorage.getItem(PAYMENTS_KEY);
      setPayments(paymentsRaw ? JSON.parse(paymentsRaw) : []);
    };
    fetchPayments();
    // Real-time sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === PAYMENTS_KEY) fetchPayments();
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(fetchPayments, 1000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Payment ID</th>
            <th className="p-2">Order ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Time</th>
            <th className="p-2">Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id} className="border-t">
              <td className="p-2">{payment.id}</td>
              <td className="p-2">{payment.orderId}</td>
              <td className="p-2">${payment.amount}</td>
              <td className="p-2">{new Date(payment.timestamp || payment.time).toLocaleString()}</td>
              <td className="p-2">{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
