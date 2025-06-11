'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  status: string;
  total_price: number;
  created_at: string;
  email?: string;
  name?: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Ngày đặt</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.name || '-'}</td>
                <td className="p-2 border">{order.email || '-'}</td>
                <td className="p-2 border font-semibold">{order.status}</td>
                <td className="p-2 border text-right">{Number(order.total_price).toLocaleString()}₫</td>
                <td className="p-2 border">{new Date(order.created_at).toLocaleString()}</td>
                <td className="p-2 border text-center">
                  <button className="text-blue-600 hover:underline mr-2" disabled>Đổi trạng thái</button>
                  <button className="text-red-600 hover:underline" disabled>Huỷ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
