import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">About Us</h1>

      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image src="/placeholder.svg?height=400&width=800" alt="Our store" fill className="object-cover" />
        </div>

        <div className="space-y-6 text-gray-700">
          <p>
            Welcome to FASHION, where style meets quality. We are a premium fashion retailer dedicated to providing our
            customers with the finest selection of clothing, footwear, and accessories.
          </p>

          <p>
            Founded in 2010, our journey began with a simple vision: to create a shopping experience that combines
            contemporary design, exceptional quality, and accessible pricing. Over the years, we've grown from a small
            boutique to a recognized name in the fashion industry, but our commitment to our core values remains
            unchanged.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Our Mission</h2>
          <p>
            Our mission is to empower individuals to express their unique style through fashion. We believe that what
            you wear is a reflection of who you are, and we're here to help you make that statement with confidence.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Our Products</h2>
          <p>
            We carefully curate our collections to offer a diverse range of styles that cater to different tastes and
            occasions. From everyday essentials to statement pieces, our products are designed with attention to detail
            and crafted from high-quality materials to ensure longevity and comfort.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Our Commitment</h2>
          <p>
            We are committed to ethical practices and sustainability. We work with suppliers who share our values and
            are continuously exploring ways to reduce our environmental footprint. Our packaging is made from recycled
            materials, and we're transitioning towards more sustainable fabrics in our collections.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Join Our Community</h2>
          <p>
            We're more than just a fashion retailer; we're a community of style enthusiasts. Follow us on social media
            to stay updated on the latest trends, styling tips, and exclusive offers. We love seeing how you style our
            pieces, so don't forget to tag us in your posts!
          </p>

          <p className="mt-8">Thank you for choosing FASHION. We look forward to being part of your style journey.</p>
        </div>
      </div>
    </div>
  )
}
