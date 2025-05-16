"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface FilterSection {
  title: string
  options: { id: string; label: string }[]
}

const filterSections: FilterSection[] = [
  {
    title: "Price",
    options: [
      { id: "price-under-50", label: "Under $50" },
      { id: "price-50-100", label: "$50 - $100" },
      { id: "price-100-150", label: "$100 - $150" },
      { id: "price-over-150", label: "Over $150" },
    ],
  },
  {
    title: "Color",
    options: [
      { id: "color-black", label: "Black" },
      { id: "color-white", label: "White" },
      { id: "color-blue", label: "Blue" },
      { id: "color-red", label: "Red" },
      { id: "color-green", label: "Green" },
    ],
  },
  {
    title: "Size",
    options: [
      { id: "size-s", label: "S" },
      { id: "size-m", label: "M" },
      { id: "size-l", label: "L" },
      { id: "size-xl", label: "XL" },
      { id: "size-xxl", label: "XXL" },
    ],
  },
]

export default function CategoryFilters() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(filterSections.map((section) => [section.title, true])),
  )
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            className="h-auto p-0 text-sm text-gray-500 hover:text-gray-900"
            onClick={() => setSelectedFilters([])}
          >
            Clear All
          </Button>
        )}
      </div>

      {filterSections.map((section) => (
        <div key={section.title} className="border-b border-gray-200 pb-4">
          <button
            className="flex w-full items-center justify-between py-2 text-left text-sm font-medium"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expandedSections[section.title] ? "rotate-180" : "")}
            />
          </button>

          {expandedSections[section.title] && (
            <div className="mt-2 space-y-1">
              {section.options.map((option) => (
                <label key={option.id} className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    checked={selectedFilters.includes(option.id)}
                    onChange={() => toggleFilter(option.id)}
                  />
                  <span className="ml-2 text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <Button className="w-full bg-black text-white hover:bg-gray-800">Apply Filters</Button>
    </div>
  )
}
