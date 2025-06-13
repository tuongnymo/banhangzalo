"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStatusInfo } from "@/lib/getStatusInfo"
import { supabase } from "@/lib/supabase"


export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  

  type Order = {
  id: string
  order_code: string | null
  total: number
  status: string
  created_at: string
  items: {
    name: string
    quantity: number
  }[]
}
const [orders, setOrders] = useState<Order[]>([])
const [loadingOrders, setLoadingOrders] = useState(true)
const [updateStatus, setUpdateStatus] = useState<null | 'success' | 'error'>(null)

// Khởi tạo state cho profile
const [profile, setProfile] = useState({
  full_name: '',
  phone: '',
  birthday: '',
  avatar_url: ''
})

const [avatarFile, setAvatarFile] = useState<File | null>(null);
const [avatarPreview, setAvatarPreview] = useState<string>('');

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Lỗi khi lấy profile')
      const data = await res.json()
    console.log("🎯 Avatar URL sau khi fetch:", data.avatar_url) // 👈 thêm dòng này
      setProfile({
        full_name: data.full_name || '',
        phone: data.phone || '',
        birthday: data.birthday || '',
        avatar_url: data.avatar_url || ''
      })
    } catch (err) {
      console.error('Lỗi khi load profile:', err)
    }
  }

  fetchProfile()
}, [])
//KẾT THÚC PHẦN Profile

// Hàm xử lý cập nhật thông tin cá nhân
const handleProfileUpdate = async (e: React.FormEvent) => {
  e.preventDefault()

  let uploadedUrl = profile.avatar_url;

  if (avatarFile && user?.id) {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`avatar-${user.id}`, avatarFile, {
      upsert: true,
      cacheControl: '3600',
      metadata: {
        owner: user.id  // 👈 Thêm dòng này
      }
    });

  if (error) {
    console.error('Upload lỗi:', error);
  } else {
    uploadedUrl = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path).data.publicUrl;
  }
}

  try {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...profile,
        avatar_url: uploadedUrl, // ✅ Gộp avatar vào đây
      })
    })

    if (!res.ok) throw new Error('Cập nhật thất bại')

    setUpdateStatus('success')
  } catch (err) {
    console.error(err)
    setUpdateStatus('error')
  }
}
// Kết thúc phần cập nhật thông tin cá nhân

//Hiển thị thông báo cập nhật
useEffect(() => {
  if (updateStatus) {
    const timer = setTimeout(() => setUpdateStatus(null), 3000)
    return () => clearTimeout(timer)
  }
}, [updateStatus])
//kết thúc phần thông báo cập nhật

const [addresses, setAddresses] = useState<any[]>([])
const [loadingAddresses, setLoadingAddresses] = useState(true)

const [newAddress, setNewAddress] = useState({
  full_name: '',
  phone: '',
  address: '',
  is_default: false,
})
const [adding, setAdding] = useState(false)

const handleAddAddress = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const session = await supabase.auth.getSession()
const accessToken = session.data.session?.access_token

const res = await fetch('/api/addresses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify(newAddress)
})

    if (!res.ok) throw new Error('Lỗi khi thêm địa chỉ')

    setNewAddress({ full_name: '', phone: '', address: '', is_default: false })
    setAdding(false)

    // gọi lại hàm load danh sách địa chỉ
    fetchAddresses()
  } catch (err) {
    console.error('Lỗi:', err)
  }
}


// Lấy danh sách địa chỉ
const fetchAddresses = async () => {
  try {
    // 👇 Lấy access token từ Supabase client
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token

    if (!token) {
      console.error("❌ Không có token Supabase.")
      return
    }

    // 👇 Gửi token vào Authorization header
    const res = await fetch('/api/addresses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Lỗi khi fetch địa chỉ')

    const data = await res.json()

    if (Array.isArray(data)) {
      setAddresses(data)
    } else {
      console.error('❌ Dữ liệu không phải mảng:', data)
      setAddresses([])
    }
  } catch (err) {
    console.error('Lỗi khi load địa chỉ:', err)
    setAddresses([])
  } finally {
    setLoadingAddresses(false)
  }
}



const handleDeleteAddress = async (id: string) => {
  if (!confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;

  try {
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token

    const res = await fetch(`/api/addresses?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Xóa thất bại")

    fetchAddresses(); // Gọi lại để load danh sách mới
  } catch (err) {
    console.error("Lỗi khi xóa:", err)
  }
}

const [editingAddress, setEditingAddress] = useState<any | null>(null)
const handleUpdateAddress = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const session = await supabase.auth.getSession()
    const accessToken = session.data.session?.access_token

    const res = await fetch('/api/addresses', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editingAddress),
    })

    if (!res.ok) throw new Error('Cập nhật thất bại')

    setEditingAddress(null)
    fetchAddresses()
  } catch (err) {
    console.error('Lỗi khi cập nhật địa chỉ:', err)
  }
}


// Lấy danh sách địa chỉ khi mount
useEffect(() => {
  fetchAddresses()
}, [])

// Kết thúc phần lấy địa chỉ

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/user")
      const data = await res.json()
      console.log("Dữ liệu từ API:", data)

      // Parse items nếu cần
      const parsedOrders = (Array.isArray(data) ? data : []).map((order) => {
  console.log("🛒 items trước xử lý:", order.items)

  return {
    ...order,
    items:
      typeof order.items === "string"
        ? JSON.parse(order.items)
        : Array.isArray(order.items)
        ? order.items
        : [],
  }
})

      setOrders(parsedOrders)
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err)
    } finally {
      setLoadingOrders(false)
    }
  }
  fetchOrders()
}, [])


  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Hiển thị loading khi đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu chưa đăng nhập, không hiển thị gì (sẽ được chuyển hướng bởi useEffect)
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản và đơn hàng của bạn</p>
        </div>
        <button onClick={logout} className="mt-4 inline-flex items-center text-red-600 hover:text-red-800 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Đăng xuất
        </button>
      </div>

      <div className="mb-8 flex items-center">
  <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
    {profile.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt={profile.full_name?.charAt(0).toUpperCase() || "?"}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-gray-300 text-xl font-bold text-gray-600">
        {profile.full_name?.charAt(0).toUpperCase() || "?"}
      </div>
    )}
  </div>
  <div>
    <h2 className="text-xl font-semibold">{profile.full_name || "Người dùng"}</h2>
    <p className="text-gray-600">{user.email}</p>
  </div>
</div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="addresses">Địa chỉ</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
  <h3 className="text-lg font-semibold">Đơn hàng của bạn</h3>

  {loadingOrders ? (
    <p>Đang tải đơn hàng...</p>
  ) : orders.length === 0 ? (
    <p>Chưa có đơn hàng nào.</p>
  ) : (
    orders.map((order) => {
      const { text, color } = getStatusInfo(order.status)

      return (
        <div
          key={order.id}
          className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Cột trái */}
            <div className="flex-[1.2] space-y-1 text-base text-black">
              <p>
                Mã đơn:{" "}
                <span className="font-semibold">{order.order_code}</span>
              </p>
              <p>Ngày đặt: {new Date(order.created_at).toLocaleDateString("vi-VN")}</p>
              <p>
                Tổng tiền:{" "}
                <span className="font-semibold">
                  {order.total.toLocaleString("vi-VN")}₫
                </span>
              </p>
            </div>

            {/* Cột giữa - danh sách sản phẩm */}
            <div className="flex-[1.9] text-base text-black font-medium break-words whitespace-pre-wrap px-2">
            <p className="font-bold">Tên sản phẩm:</p>
            {order.items?.map((item, index) => (
            <p key={index}>
            SP{index + 1}: {item.name}; SL: {item.quantity}
              </p>
            ))}
          </div>

            {/* Cột phải - trạng thái */}
            <div className="flex items-start">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${color}`}
              >
                {text}
              </span>
            </div>
          </div>
        </div>
      )
    })
  )}
</TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h3>
            <div>
  <label className="mb-1 block text-sm font-medium">Ảnh đại diện</label>

  {avatarPreview || profile.avatar_url ? (
    <img
      src={avatarPreview || profile.avatar_url}
      alt="avatar"
      className="mb-2 h-16 w-16 rounded-full object-cover"
    />
  ) : null}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }}
  />
</div>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              {updateStatus === 'success' && (
              <div className="rounded-md bg-green-100 px-4 py-2 text-green-700 text-sm">
              ✅ Cập nhật thành công!
              </div>
              )}
              {updateStatus === 'error' && (
              <div className="rounded-md bg-red-100 px-4 py-2 text-red-700 text-sm">
              ❌ Có lỗi xảy ra khi cập nhật.
              </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                    Họ và tên
                  </label>
                  <input
                    type="text" 
                    id="fullName"
                    value={profile.full_name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, full_name: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="birthday" className="mb-1 block text-sm font-medium">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    value={profile.birthday}
                    onChange={(e) => setProfile((prev) => ({ ...prev, birthday: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  />
                </div>
             
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
  <div className="rounded-lg border border-gray-200 p-6">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold">Địa chỉ của bạn</h3>
      <button
        onClick={() => {
          setAdding(!adding)
          setEditingAddress(null) // Đóng form sửa nếu đang mở
        }}
        className="text-sm font-medium text-black underline hover:text-gray-700"
      >
        {adding ? 'Đóng' : 'Thêm địa chỉ mới'}
      </button>
    </div>

    {/* Form THÊM */}
    {adding && (
      <form onSubmit={handleAddAddress} className="space-y-4 mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Họ và tên"
            value={newAddress.full_name}
            onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
        <textarea
          placeholder="Địa chỉ"
          value={newAddress.address}
          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newAddress.is_default}
            onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
            className="accent-black"
          />
          <span>Đặt làm địa chỉ mặc định</span>
        </label>
        <div className="text-right">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
            Lưu địa chỉ
          </button>
        </div>
      </form>
    )}

    {/* Form SỬA */}
    {editingAddress && (
      <form onSubmit={handleUpdateAddress} className="space-y-4 mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Họ và tên"
            value={editingAddress.full_name}
            onChange={(e) => setEditingAddress({ ...editingAddress, full_name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={editingAddress.phone}
            onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
        <textarea
          placeholder="Địa chỉ"
          value={editingAddress.address}
          onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={editingAddress.is_default}
            onChange={(e) => setEditingAddress({ ...editingAddress, is_default: e.target.checked })}
            className="accent-black"
          />
          <span>Đặt làm địa chỉ mặc định</span>
        </label>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setEditingAddress(null)}
            className="px-4 py-2 rounded-md bg-gray-200 text-black"
          >
            Huỷ
          </button>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
            Lưu thay đổi
          </button>
        </div>
      </form>
    )}

    {/* Danh sách địa chỉ */}
    {loadingAddresses ? (
      <p>Đang tải địa chỉ...</p>
    ) : addresses.length === 0 ? (
      <p>Chưa có địa chỉ nào.</p>
    ) : (
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="rounded border p-4 bg-white">
            <p className="text-base font-medium">
              {addr.full_name} - {addr.phone}
            </p>
            <p className="text-sm text-gray-600">{addr.address}</p>
            {addr.is_default && (
              <span className="inline-block mt-2 px-2 py-1 text-xs text-white bg-black rounded-full">
                Mặc định
              </span>
            )}
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => setEditingAddress(addr)}
                className="text-sm text-blue-600 hover:underline"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDeleteAddress(addr.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</TabsContent>


      </Tabs>
    </div>
  )
}
