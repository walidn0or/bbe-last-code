"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, Eye, X } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"
import { images, getImage } from "@/config/images"

export const dynamic = 'force-dynamic'

const workItems = [
  {
    key: "menstrualHygiene",
    title: "Breaking the Stereotypes",
    description: "Menstrual hygiene education and training program"
  },
  {
    key: "languageSkills",
    title: "Enhancing Language Skills",
    description: "Free virtual English classes and IELTS preparation"
  },
  {
    key: "orphanSupport",
    title: "Orphan Support Program",
    description: "Supporting children in orphanages"
  },
  {
    key: "scholarshipMentorship",
    title: "Scholarship and Mentorship Programs",
    description: "Scholarship guidance and mentorship sessions"
  },
  {
    key: "artClub",
    title: "Our Art Club",
    description: "Creative outlet and artistic expression classes"
  },
  {
    key: "healthSupport",
    title: "Our Health Support Program",
    description: "Free health camps and emergency medical support"
  }
]

export default function OurWorkUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({})
  const [galleryFiles, setGalleryFiles] = useState<{[key: string]: string[]}>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load saved images from localStorage
      workItems.forEach((item) => {
        const mainImg = localStorage.getItem(`our_work_${item.key}_image_url`)
        if (mainImg) {
          setUploadedFiles((prev) => ({ ...prev, [item.key]: mainImg }))
        }
        const galleryStr = localStorage.getItem(`our_work_${item.key}_gallery`)
        if (galleryStr) {
          try {
            const gallery = JSON.parse(galleryStr)
            setGalleryFiles((prev) => ({ ...prev, [item.key]: gallery }))
          } catch {}
        }
      })
    }
  }, [])

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
    if (typeof window !== "undefined") {
      localStorage.setItem(`our_work_${key}_image_url`, url)
    }
  }

  const handleGalleryUploaded = (key: string, url: string) => {
    const currentGallery = galleryFiles[key] || []
    const newGallery = [...currentGallery, url]
    setGalleryFiles(prev => ({
      ...prev,
      [key]: newGallery
    }))
    if (typeof window !== "undefined") {
      localStorage.setItem(`our_work_${key}_gallery`, JSON.stringify(newGallery))
    }
  }

  const removeGalleryImage = (key: string, index: number) => {
    const currentGallery = galleryFiles[key] || []
    const newGallery = currentGallery.filter((_, i) => i !== index)
    setGalleryFiles(prev => ({
      ...prev,
      [key]: newGallery
    }))
    if (typeof window !== "undefined") {
      localStorage.setItem(`our_work_${key}_gallery`, JSON.stringify(newGallery))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Image className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Work Section</h1>
              <p className="text-gray-600">Upload images for all Our Work program cards</p>
            </div>
          </div>
        </div>

        {/* Upload Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workItems.map((item) => {
            const mainImage = uploadedFiles[item.key] || getImage(images.ourWork[item.key], images.fallback.placeholder)
            const gallery = galleryFiles[item.key] || []

            return (
              <Card key={item.key} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.title}</span>
                    {uploadedFiles[item.key] && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Card Image (Required)
                    </label>
                    {mainImage && (
                      <div className="mb-4 relative group">
                        <img
                          src={getImage(mainImage, images.fallback.placeholder)}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(mainImage, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Size
                          </Button>
                        </div>
                      </div>
                    )}
                    <MediaUpload
                      onUploaded={(url) => {
                        handleFileUploaded(item.key, url)
                      }}
                      acceptedTypes="image/*"
                      maxSize="5MB"
                      label={`Upload ${item.title} Main Image`}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: 400x300px or larger, max 5MB
                    </p>
                  </div>

                  {/* Gallery Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gallery Images (Optional)
                    </label>
                    <div className="space-y-3">
                      {/* Existing Gallery Images */}
                      {gallery.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {gallery.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={getImage(img, images.fallback.placeholder)}
                                alt={`${item.title} gallery ${idx + 1}`}
                                className="w-full h-20 object-cover rounded border border-gray-200"
                              />
                              <button
                                onClick={() => removeGalleryImage(item.key, idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Add Gallery Image Button */}
                      <MediaUpload
                        onUploaded={(url) => {
                          handleGalleryUploaded(item.key, url)
                        }}
                        acceptedTypes="image/*"
                        maxSize="5MB"
                        label="Add Gallery Image"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Add multiple images to show in the gallery. Recommended: 400x300px, max 5MB each
                    </p>
                  </div>

                  {/* Preview Link */}
                  <div className="pt-2 border-t">
                    <a
                      href="/#our-work"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Preview on Home Page
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">📝 Instructions</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Main Card Image:</strong> This is the primary image displayed on each card. Required for all programs.</li>
              <li>• <strong>Gallery Images:</strong> Additional images that appear in the modal when users click on a card. You can add multiple images.</li>
              <li>• <strong>Image Requirements:</strong> JPG, PNG, or WebP format. Recommended size: 400x300px or larger. Max size: 5MB per image.</li>
              <li>• <strong>After Upload:</strong> Images are automatically saved and will appear on the home page immediately.</li>
              <li>• <strong>To Remove Gallery Images:</strong> Hover over a gallery image and click the X button.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
