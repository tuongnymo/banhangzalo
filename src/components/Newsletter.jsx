"use client"

import { useState } from "react"

function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="max-w-md mx-auto text-gray-600 mb-8">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
