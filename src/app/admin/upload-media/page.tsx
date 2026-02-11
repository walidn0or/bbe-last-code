"use client"

import { useState } from "react"
import Link from "next/link"
import { MediaUpload } from "@/components/media-upload"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image as ImageIcon, Video, FileText, Heart, Home } from "lucide-react"
import { images } from "@/config/images"

export default function UploadMediaPage() {
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: string}>({})

  const handleUploaded = (key: string, url: string) => {
    setUploadStatus(prev => ({ ...prev, [key]: `✅ Uploaded: ${url}` }))
    setTimeout(() => {
      setUploadStatus(prev => {
        const newStatus = { ...prev }
        delete newStatus[key]
        return newStatus
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Media Files</h1>
          <p className="text-gray-600">
            Upload images and videos. Files will be automatically added to <code className="bg-gray-200 px-2 py-1 rounded">src/config/images.ts</code>
          </p>
        </div>

        {/* Upload Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Home Page Gallery */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-5 w-5" />
                <CardTitle>Home Page Gallery</CardTitle>
              </div>
              <CardDescription className="text-white/90">
                Images and videos for the home page gallery
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <MediaUpload
                onUploaded={(url) => handleUploaded('home_gallery', url)}
                acceptedTypes="image/*,video/*"
                maxSize={50 * 1024 * 1024}
                label="Upload to Gallery"
                directory="content"
                storageKey="home_media_gallery"
              />
              <p className="text-xs text-gray-500 mt-2">
                Supports: JPG, PNG, MP4, MOV (max 50MB)
              </p>
              {uploadStatus['home_gallery'] && (
                <p className="text-sm text-green-600 mt-2">{uploadStatus['home_gallery']}</p>
              )}
            </CardContent>
          </Card>

          {/* Our Work Section */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Our Work</CardTitle>
              </div>
              <CardDescription className="text-white/90">
                Images for Our Work programs
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Menstrual Hygiene */}
              <div>
                <label className="text-sm font-medium mb-2 block">Menstrual Hygiene</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_menstrualHygiene', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_menstrualHygiene_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_menstrualHygiene_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_menstrualHygiene_gallery"
                />
              </div>

              {/* Language Skills */}
              <div>
                <label className="text-sm font-medium mb-2 block">Language Skills</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_languageSkills', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_languageSkills_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_languageSkills_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_languageSkills_gallery"
                />
              </div>

              {/* Orphan Support */}
              <div>
                <label className="text-sm font-medium mb-2 block">Orphan Support</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_orphanSupport', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_orphanSupport_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_orphanSupport_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_orphanSupport_gallery"
                />
              </div>

              {/* Scholarship & Mentorship */}
              <div>
                <label className="text-sm font-medium mb-2 block">Scholarship & Mentorship</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_scholarshipMentorship', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_scholarshipMentorship_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_scholarshipMentorship_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_scholarshipMentorship_gallery"
                />
              </div>

              {/* Art Club */}
              <div>
                <label className="text-sm font-medium mb-2 block">Art Club</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_artClub', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_artClub_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_artClub_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_artClub_gallery"
                />
              </div>

              {/* Health Support */}
              <div>
                <label className="text-sm font-medium mb-2 block">Health Support</label>
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_healthSupport', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Main Image"
                  directory="our-work"
                  storageKey="our_work_healthSupport_image_url"
                />
                <MediaUpload
                  onUploaded={(url) => handleUploaded('our_work_healthSupport_gallery', url)}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024}
                  label="Gallery Image"
                  directory="our-work"
                  storageKey="our_work_healthSupport_gallery"
                />
              </div>
            </CardContent>
          </Card>

          {/* Success Stories & Feedback */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5" />
                <CardTitle>Success Stories & Feedback</CardTitle>
              </div>
              <CardDescription className="text-white/90">
                Images and videos for Success Stories and Feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Success Stories Images */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700">Student Photos</h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Barin Jebran</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_barin', url)}
                      acceptedTypes="image/*"
                      maxSize={5 * 1024 * 1024}
                      label="Upload Photo"
                      directory="success-stories"
                      storageKey="success_story_barin_image"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">Wasiya Safi</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_wasiya', url)}
                      acceptedTypes="image/*"
                      maxSize={5 * 1024 * 1024}
                      label="Upload Photo"
                      directory="success-stories"
                      storageKey="success_story_wasiya_image"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">Moheba Karimi</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_moheba', url)}
                      acceptedTypes="image/*"
                      maxSize={5 * 1024 * 1024}
                      label="Upload Photo"
                      directory="success-stories"
                      storageKey="success_story_moheba_image"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">Ozra Penhan</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_ozra', url)}
                      acceptedTypes="image/*"
                      maxSize={5 * 1024 * 1024}
                      label="Upload Photo"
                      directory="success-stories"
                      storageKey="success_story_ozra_image"
                    />
                  </div>
                </div>
              </div>

              {/* Success Stories Videos / Feedback Videos */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">Feedback Videos</h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Video 1</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_video1', url)}
                      acceptedTypes="video/*"
                      maxSize={50 * 1024 * 1024}
                      label="Upload Video"
                      directory="testimonials"
                      storageKey="success_story_video1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">Video 2</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_video2', url)}
                      acceptedTypes="video/*"
                      maxSize={50 * 1024 * 1024}
                      label="Upload Video"
                      directory="testimonials"
                      storageKey="success_story_video2"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">Video 3</label>
                    <MediaUpload
                      onUploaded={(url) => handleUploaded('success_story_video3', url)}
                      acceptedTypes="video/*"
                      maxSize={50 * 1024 * 1024}
                      label="Upload Video"
                      directory="testimonials"
                      storageKey="success_story_video3"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Supports: MP4, MOV, AVI, WebM (max 50MB)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">📝 How It Works</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Upload files using the buttons above</li>
              <li>Files are saved to <code className="bg-blue-100 px-1 rounded">public/images/</code> directories</li>
              <li>Paths are automatically added to <code className="bg-blue-100 px-1 rounded">src/config/images.ts</code></li>
              <li>Refresh your page to see the changes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
