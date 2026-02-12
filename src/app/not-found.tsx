'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-6 sm:mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            The page may have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 px-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/about" className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline">
              About Us
            </Link>
            <Link href="/programs" className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline">
              Our Programs
            </Link>
            <Link href="/impact" className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline">
              Our Impact
            </Link>
            <Link href="/donate" className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline">
              Donate
            </Link>
            <Link href="/contact" className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}