import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">Về Chúng Tôi</h1>

      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image src="https://i.postimg.cc/MKdBjr9B/bannerm.png?height=400&width=800" alt="Our store" fill className="object-cover" />
        </div>

        <div className="space-y-6 text-gray-700">
          <p>
           Chào mừng bạn đến với FASHION, nơi phong cách gặp gỡ chất lượng. Chúng tôi là một nhà bán lẻ thời trang cao cấp, cam kết cung cấp cho khách hàng của mình bộ sưu tập quần áo, giày dép và phụ kiện tốt nhất.
          </p>

          <p>
            Hãy để Fullstore đồng hành cùng bạn trên hành trình khẳng định cá tính và phong cách sống riêng biệt.
            Chúng tôi không chỉ bán thời trang – chúng tôi mang đến cảm hứng và sự tự tin cho từng khách hàng.
          </p>

          <h2 className="mt-8 text-2xl font-bold">GIỚI THIỆU VỀ FULLSTORE FASHION</h2>
          <p>
            Fullstore Fashion là thương hiệu thời trang hiện đại, năng động và đầy cá tính, chuyên cung cấp ác sản phẩm quần áo, giày dép và phụ kiện dành cho giới trẻ.
            Với phương châm “Chất lượng tạo nên uy tín – Phong cách tạo nên khác biệt”, Fullstore Fashion luôn nỗ lực không ngừng để mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Sứ mệnh của chúng tôi</h2>
          <p>
            Chúng tôi mong muốn trở thành địa chỉ mua sắm tin cậy cho mọi khách hàng yêu thích thời trang.
            Mỗi sản phẩm tại Fullstore Fashion đều được lựa chọn kỹ lưỡng, bắt kịp xu hướng, phù hợp với nhiều phong cách khác nhau từ năng động, cá tính đến thanh lịch, tối giản.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Giá trị cốt lõi</h2>
          <p>
            - Chất lượng: Sản phẩm luôn được kiểm tra kỹ trước khi đến tay khách hàng.
            - Uy tín: Chúng tôi đặt trải nghiệm khách hàng làm trung tâm của mọi hoạt động.
            - Đổi mới: Luôn cập nhật những xu hướng thời trang mới nhất trong nước và quốc tế.
            - Giá cả hợp lý: Mang đến sự kết hợp hoàn hảo giữa chất lượng và giá thành.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Vì sao nên chọn Fullstore Fashion?</h2>
          <p>
            - Bộ sưu tập phong phú, đa dạng sản phẩm.
            - Hỗ trợ tư vấn nhiệt tình, chuyên nghiệp.
            - Chính sách đổi trả rõ ràng, nhanh chóng.
            - Giao hàng toàn quốc – nhanh, an toàn và đúng hẹn.
          </p>
          <h2 className="mt-8 text-2xl font-bold">Fullstore Fashion – Tôn vinh phong cách của bạn!</h2>
          <p className="mt-8">Thank you for choosing FASHION. We look forward to being part of your style journey.</p>
        </div>
      </div>
    </div>
  )
}
