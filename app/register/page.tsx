import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join us to start shopping your favorite fashion items.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Create a password"
            />
            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long.</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="font-medium text-black hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-black hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-black hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
