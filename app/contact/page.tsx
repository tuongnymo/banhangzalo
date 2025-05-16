export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">Contact Us</h1>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold">Get in Touch</h2>
          <p className="mb-6 text-gray-700">
            We'd love to hear from you. Please fill out the form below or reach out to us using the contact information
            provided.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-gray-600">
                123 Fashion Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-600">
                info@fashionstore.com
                <br />
                support@fashionstore.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567
                <br />
                Mon-Fri: 9am - 6pm EST
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Follow Us</h3>
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
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Your name"
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
                placeholder="Your email"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Your message"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
