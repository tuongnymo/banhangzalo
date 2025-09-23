'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/products/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector('input[name="query"]') as HTMLInputElement;
            const q = input.value.trim();
            if (q) {
              window.location.href = `/search?query=${encodeURIComponent(q)}`;
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Nhập tên sản phẩm..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-black"
          />
          <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* Kết quả tìm kiếm */}
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
                <p className="text-red-600 font-bold">
                  {Number(product.price).toLocaleString()}₫
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.
      Nhận tìm kiếm sản phẩm theo yêu cầu</p>
      )}
    </div>
  );
}
