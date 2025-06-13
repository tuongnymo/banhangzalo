'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
  };
};

type Order = {
  id: string;
  status: string;
  total_price: number;
  created_at: string;
  email?: string;
  name?: string;
  order_items?: OrderItem[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/orders?status=${filterStatus}`)
      .then(res => res.json())
      .then(data => {
        const sorted = [...(data.orders || [])].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setOrders(sorted);
      })
      .finally(() => setLoading(false));
  }, [filterStatus]);

  async function handleViewDetail(orderId: string) {
    setModalLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const data = await res.json();
      setSelectedOrder(data.order);
      setShowModal(true);
    } catch (err) {
      toast.error('Lỗi khi tải chi tiết đơn hàng');
    } finally {
      setModalLoading(false);
    }
  }

  async function handleUpdateStatus(orderId: string) {
    const newStatus = prompt('Nhập trạng thái mới (pending, shipping, completed, cancelled):');
    if (!newStatus) return;
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, newStatus })
    });
    if (res.ok) {
      toast.success('Cập nhật thành công');
      location.reload();
    } else {
      const err = await res.json();
      toast.error('Lỗi: ' + err.error);
    }
  }

  async function handleCancel(orderId: string) {
    if (!confirm('Bạn có chắc muốn huỷ đơn này?')) return;
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, newStatus: 'cancelled' })
    });
    if (res.ok) {
      toast.success('Đã huỷ đơn');
      location.reload();
    } else {
      const err = await res.json();
      toast.error('Lỗi: ' + err.error);
    }
  }

  return (
    <div className="p-6">
      <Toaster />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <select
          className="border px-3 py-1 rounded text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã huỷ</option>
        </select>
      </div>

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
                <td
                  className="p-2 border text-blue-600 hover:underline cursor-pointer"
                  onClick={() => handleViewDetail(order.id)}
                >
                  {order.id}
                </td>
                <td className="p-2 border">{order.name || '-'}</td>
                <td className="p-2 border">{order.email || '-'}</td>
                <td className="p-2 border font-semibold">{order.status}</td>
                <td className="p-2 border text-right">
                  {Number(order.total_price).toLocaleString()}₫
                </td>
                <td className="p-2 border">
                  {new Date(order.created_at).toLocaleString()}
                </td>
                <td className="p-2 border text-center">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    Đổi trạng thái
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleCancel(order.id)}
                  >
                    Huỷ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
            {modalLoading ? (
              <p className="text-center">Đang tải chi tiết đơn hàng...</p>
            ) : (
              selectedOrder && (
                <>
                  <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
                  <p>
                    <strong>Mã đơn:</strong> {selectedOrder.id}
                  </p>
                  <p>
                    <strong>Khách:</strong> {selectedOrder.name} - {selectedOrder.email}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Ngày đặt:</strong> {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                  <hr className="my-4" />
                  <h3 className="font-semibold">Sản phẩm:</h3>
                  <ul className="mb-4">
                    {selectedOrder.order_items?.map((item) => (
                      <li key={item.id} className="text-sm">
                        {item.product?.name || 'Sản phẩm đã xoá'} - SL: {item.quantity} - Giá: {Number(item.price).toLocaleString()}₫
                      </li>
                    ))}
                  </ul>
                  <p className="text-right font-semibold">
                    Tổng cộng: {Number(selectedOrder.total_price).toLocaleString()}₫
                  </p>
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
