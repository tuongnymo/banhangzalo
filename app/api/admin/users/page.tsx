'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export type User = {
  id: string;
  full_name: string;
  phone: string;
  role: 'admin' | 'user';
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  const filteredUsers = users.filter(
    u => u.full_name.toLowerCase().includes(search.toLowerCase()) ||
         u.phone.toLowerCase().includes(search.toLowerCase())
  );

  async function changeRole(userId: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole })
    });

    if (res.ok) {
      toast.success(`Đã đổi quyền thành ${newRole}`);
      fetchUsers();
    } else {
      toast.error('Không thể cập nhật quyền');
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm('Bạn có chắc muốn xoá người dùng này?')) return;
    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (res.ok) {
      toast.success('Đã xoá người dùng');
      fetchUsers();
    } else {
      toast.error('Xoá thất bại');
    }
  }

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      <input
        type="text"
        className="border px-3 py-1 rounded mb-4 w-full md:w-1/2"
        placeholder="Tìm theo tên hoặc số điện thoại..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Đang tải người dùng...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Họ tên</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Quyền</th>
              <th className="p-2 border">Ngày tạo</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{user.full_name}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td className="p-2 border text-center">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => changeRole(user.id, user.role)}
                  >
                    Đổi quyền
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteUser(user.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
