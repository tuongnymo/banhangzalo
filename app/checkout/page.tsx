export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex justify-between">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">1</div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">2</div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>

          <form>
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <input id="phone" name="phone" className="w-full rounded-md border border-gray-300 p-2" required />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="mb-1 block text-sm font-medium">
                  Address
                </label>
                <input id="address" name="address" className="w-full rounded-md border border-gray-300 p-2" required />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm font-medium">
                    City
                  </label>
                  <input id="city" name="city" className="w-full rounded-md border border-gray-300 p-2" required />
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-1 block text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="mb-1 block text-sm font-medium">
                    Country
                  </label>
                  <select id="country" name="country" className="w-full rounded-md border border-gray-300 p-2" required>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
                  Continue to Payment
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto">
              {[1, 2].map((item) => (
                <div key={item} className="mb-4 flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <div className="h-full w-full bg-gray-200"></div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium">Product Name</p>
                    <p className="text-sm text-gray-500">Black / 42 / Qty: 1</p>
                    <p className="mt-auto font-medium">$129.99</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4 border-t border-gray-200" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>$259.98</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>$4.99</span>
              </div>

              <hr className="my-2 border-t border-gray-200" />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$264.97</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
