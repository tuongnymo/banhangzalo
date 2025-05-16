"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: "1",
    author: "Alex Johnson",
    rating: 5,
    date: "2023-11-15",
    title: "Excellent quality and comfort",
    content:
      "I'm extremely satisfied with this purchase. The quality is outstanding and they're very comfortable for all-day wear. Highly recommended!",
  },
  {
    id: "2",
    author: "Sam Taylor",
    rating: 4,
    date: "2023-11-10",
    title: "Great product, slight sizing issue",
    content:
      "The product is great overall. The only issue I had was with sizing - they run a bit small, so I'd recommend going up a size. Otherwise, very happy with my purchase.",
  },
  {
    id: "3",
    author: "Jamie Smith",
    rating: 5,
    date: "2023-11-05",
    title: "Perfect addition to my collection",
    content:
      "These are exactly what I was looking for. The design is sleek and modern, and the quality is top-notch. Will definitely be purchasing more in different colors.",
  },
]

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(sampleReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <div className="mr-2 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-5 w-5",
                  star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-lg font-medium">{averageRating.toFixed(1)} out of 5</span>
        </div>
        <span className="text-gray-500">Based on {reviews.length} reviews</span>
        <div className="flex-1 sm:text-right">
          <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>
      </div>

      {showReviewForm && (
        <div className="mb-8 rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 text-lg font-medium">Write Your Review</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="review-title" className="mb-1 block text-sm font-medium">
                Title
              </label>
              <Input id="review-title" type="text" placeholder="Give your review a title" />
            </div>
            <div>
              <label htmlFor="review-content" className="mb-1 block text-sm font-medium">
                Review
              </label>
              <Textarea id="review-content" rows={4} placeholder="Write your review here" />
            </div>
            <div>
              <span className="mb-1 block text-sm font-medium">Rating</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="h-6 w-6"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        (hoveredRating ? star <= hoveredRating : star <= rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400",
                      )}
                    />
                    <span className="sr-only">Rate {star} stars</span>
                  </button>
                ))}
              </div>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">Submit Review</Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg border border-gray-100 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{review.title}</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="mb-2 text-sm text-gray-600">
              By {review.author} on {new Date(review.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
