import React, { useState } from 'react';

const PaymentProcessing: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setStatus('Payment successful!');
    setAmount('');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Payment Processing</h1>
      <form onSubmit={handlePayment} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Process Payment</button>
      </form>
      {status && <div className="mt-4 text-green-700 font-semibold">{status}</div>}
    </div>
  );
};

export default PaymentProcessing;
