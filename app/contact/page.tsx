export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">Liên Hệ</h1>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold">Liên hệ với chúng tôi</h2>
          <p className="mb-6 text-gray-700">
            Chúng tôi rất mong nhận được phản hồi từ bạn. Vui lòng điền vào mẫu dưới đây hoặc liên hệ với chúng tôi qua thông tin liên lạc được cung cấp.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Địa Chỉ</h3>
              <p className="text-gray-600">
                
                <br />
                
                <br />
                TP. Hà Nội
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-600">
                info@thoitrangnew.com
                <br />
                support@thoitrangnew.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-gray-600">
                09xx.xxx.xxx
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Theo dõi chúng tôi</h3>
              <div className="mt-2 flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="space-y-4 rounded-lg border border-gray-200 p-6">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Họ và Tên"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Email của bạn"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                Chủ Đề
              </label>
              <input
                type="text"
                id="subject"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Nội dung chủ đề"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Tin nhắn
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Nội dung tin nhắn"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Gửi phản hồi
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
