'use client';

import { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h1>

      {loading ? (
        <p>Đang tải danh sách sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow hover:shadow-md">
              <img src={product.images} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-red-600 font-bold">{Number(product.price).toLocaleString()}₫</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
