'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/products/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm: "{query}"</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải kết quả...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="relative h-64 w-full bg-gray-100">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                <p className="text-red-600 font-bold">{product.price.toLocaleString()}₫</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
}
