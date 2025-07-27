'use client';

import { useEffect, useState } from 'react';
import { createClientSide } from '@/src/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string;
  sizes: string;
  colors: any;
  category: string;
  discount: number;
  created_at: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    images: '',
    sizes: '',
    colors: '[]',
    category: '',
    discount: '',
  });

  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const supabase = createClientSide();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return router.push('/login');

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || data?.role !== 'admin') router.push('/');
      else setAuthChecking(false);
    }

    checkAdmin();
  }, []);

  useEffect(() => {
    if (!authChecking) fetchProducts();
  }, [authChecking]);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }

  async function handleAddProduct() {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Đã thêm sản phẩm!');
        setForm({
          name: '',
          price: '',
          description: '',
          images: '',
          sizes: '',
          colors: '[]',
          category: '',
          discount: '',
        });
        fetchProducts();
      } else {
        toast.error('Thêm thất bại!');
      }
    } catch (err) {
      toast.error('Lỗi mạng!');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Xoá sản phẩm này?')) return;
    const res = await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success('Đã xoá');
      fetchProducts();
    } else {
      toast.error('Xoá thất bại');
    }
  }

  if (authChecking) return <div className="p-6">Đang kiểm tra quyền admin...</div>;

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <div className="grid gap-2 md:grid-cols-3 mb-6">
        {['name', 'price', 'description', 'images', 'sizes', 'colors', 'category', 'discount'].map(key => (
          <input
            key={key}
            className="border px-3 py-2 rounded text-sm"
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
      </div>

      <button
        onClick={handleAddProduct}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Thêm sản phẩm
      </button>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Danh mục</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{Number(p.price).toLocaleString()}₫</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
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
