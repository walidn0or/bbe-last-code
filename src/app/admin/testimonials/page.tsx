"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, X, Eye, MessageSquare, Quote } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export const dynamic = 'force-dynamic'

export default function TestimonialsUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    person1: "",
    person2: "",
    person3: ""
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const testimonialSlots = [
    {
      key: "person1",
      title: "Testimonial 1",
      name: "Sarah Johnson",
      role: "Education Program Graduate",
      quote: "The virtual education program changed my life completely. I now have the skills and confidence to pursue my dreams.",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "200x200px (square for circular display)",
      currentImage: uploadedFiles.person1
    },
    {
      key: "person2",
      title: "Testimonial 2", 
      name: "Ahmad Hassan",
      role: "Healthcare Program Beneficiary",
      quote: "The mobile health clinic brought essential medical care to our remote village. We are forever grateful for this support.",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "200x200px (square for circular display)",
      currentImage: uploadedFiles.person2
    },
    {
      key: "person3",
      title: "Testimonial 3",
      name: "Fatima Al-Zahra",
      role: "Entrepreneurship Program Participant", 
      quote: "Through the business training program, I started my own small business and now support my family independently.",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "200x200px (square for circular display)",
      currentImage: uploadedFiles.person3
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Testimonials Section Upload</h1>
            <p className="text-gray-600">Upload photos for testimonial speakers</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {testimonialSlots.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(uploadedFiles).filter(Boolean).length / testimonialSlots.length) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialSlots.map((testimonial) => (
            <Card key={testimonial.key} className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-pink-600" />
                      {testimonial.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{testimonial.name} - {testimonial.role}</p>
                  </div>
                  {uploadedFiles[testimonial.key] && (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Uploaded</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Image Preview */}
                {uploadedFiles[testimonial.key] && (
                  <div className="mb-6">
                    <div className="relative group">
                      <img 
                        src={uploadedFiles[testimonial.key]} 
                        alt={testimonial.name}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(uploadedFiles[testimonial.key], '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonial Quote */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <Quote className="h-6 w-6 text-pink-600 mb-2" />
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    {"\u201C"}{testimonial.quote}{"\u201D"}
                  </p>
                  <div className="mt-3 flex items-center space-x-3">
                    {uploadedFiles[testimonial.key] ? (
                      <img
                        src={uploadedFiles[testimonial.key]}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white shadow-md flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                {/* Upload Component */}
                <MediaUpload
                  onUploaded={(url) => handleFileUploaded(testimonial.key, url)}
                  acceptedTypes={testimonial.acceptedTypes}
                  maxSize={testimonial.maxSize}
                  label={`Upload ${testimonial.name} Photo`}
                />

                {/* Requirements */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• File types: {testimonial.acceptedTypes}</li>
                    <li>• Max size: {testimonial.maxSize}</li>
                    <li>• Recommended size: {testimonial.recommendedSize}</li>
                    <li>• Will be displayed as circular image</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <X className="h-4 w-4 mr-2" />
              Reset All
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
              disabled={Object.values(uploadedFiles).filter(Boolean).length === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {Object.values(uploadedFiles).filter(Boolean).length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Live Preview</CardTitle>
              <p className="text-gray-600">How your testimonials section will look on the website</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonialSlots.filter(testimonial => uploadedFiles[testimonial.key]).map((testimonial) => (
                  <div key={testimonial.key} className="border-0 shadow-xl bg-white relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="pt-6">
                      <Quote className="h-6 w-6 text-pink-600 mb-4" />
                      <p className="text-gray-700 mb-4 italic leading-relaxed text-sm">
                        {"\u201C"}{testimonial.quote}{"\u201D"}
                      </p>
                      <div className="flex items-center space-x-3">
                        <img
                          src={uploadedFiles[testimonial.key]}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                          <p className="text-xs text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-pink-50 to-rose-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-pink-600" />
              Tips for Great Testimonial Photos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Photo Guidelines:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use high-quality, well-lit photos</li>
                  <li>• Square format works best (1:1 ratio)</li>
                  <li>• Clear, professional-looking images</li>
                  <li>• Avoid busy backgrounds</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Best Practices:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Photos will be displayed as circles</li>
                  <li>• Center the person&apos;s face in the image</li>
                  <li>• Use consistent lighting across all photos</li>
                  <li>• Keep file sizes under 3MB for fast loading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
