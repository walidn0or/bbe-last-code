"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MediaUpload } from "@/components/media-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Check, 
  Eye, 
  Image as ImageIcon, 
  Video, 
  Users, 
  Newspaper,
  Heart,
  GraduationCap,
  Globe,
  FileText,
  Upload as UploadIcon
} from "lucide-react"

export default function AdminUploadsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string | string[]}>({})

  useEffect(() => {
    // Load saved files from localStorage
    if (typeof window !== "undefined") {
      const keys = [
        'hero_image_url',
        'success_story_barin_image',
        'success_story_wasiya_image',
        'success_story_moheba_image',
        'success_story_ozra_image',
      ]
      keys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          try {
            // Try to parse as JSON (for arrays)
            const parsed = JSON.parse(value)
            setUploadedFiles(prev => ({ ...prev, [key]: parsed }))
          } catch {
            // If not JSON, store as string
            setUploadedFiles(prev => ({ ...prev, [key]: value }))
          }
        }
      })
    }
  }, [])

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const handleGalleryUploaded = (key: string, url: string) => {
    const current = uploadedFiles[key] as string[] || []
    setUploadedFiles(prev => ({
      ...prev,
      [key]: [...current, url]
    }))
  }

  const sections = [
    {
      id: 'hero',
      title: 'Hero Section',
      icon: ImageIcon,
      color: 'from-blue-500 to-blue-600',
      description: 'Main hero images and background videos',
      uploads: [
        {
          key: 'hero_image_url',
          label: 'Main Hero Image',
          directory: 'hero',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'hero_image_url',
          description: 'The main image displayed in the hero section'
        },
        {
          key: 'hero_background_video',
          label: 'Background Video',
          directory: 'hero',
          acceptedTypes: 'video/*',
          maxSize: '50MB',
          storageKey: 'hero_background_video',
          description: 'Background video for hero section'
        }
      ]
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      description: 'Student photos and testimonials',
      uploads: [
        {
          key: 'success_story_barin_image',
          label: 'Barin Jebran Photo',
          directory: 'success-stories',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'success_story_barin_image',
          description: 'Profile photo for Barin Jebran'
        },
        {
          key: 'success_story_wasiya_image',
          label: 'Wasiya Safi Photo',
          directory: 'success-stories',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'success_story_wasiya_image',
          description: 'Profile photo for Wasiya Safi'
        },
        {
          key: 'success_story_moheba_image',
          label: 'Moheba Karimi Photo',
          directory: 'success-stories',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'success_story_moheba_image',
          description: 'Profile photo for Moheba Karimi'
        },
        {
          key: 'success_story_ozra_image',
          label: 'Ozra Penhan Photo',
          directory: 'success-stories',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'success_story_ozra_image',
          description: 'Profile photo for Ozra Penhan'
        }
      ]
    },
    {
      id: 'our-work',
      title: 'Our Work Section',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      description: 'Program images and galleries',
      uploads: [
        {
          key: 'our_work_menstrualHygiene_image_url',
          label: 'Menstrual Hygiene - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_menstrualHygiene_image_url',
          description: 'Main image for Menstrual Hygiene program'
        },
        {
          key: 'our_work_menstrualHygiene_gallery',
          label: 'Menstrual Hygiene - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_menstrualHygiene_gallery',
          description: 'Gallery images for Menstrual Hygiene program',
          isGallery: true
        },
        {
          key: 'our_work_languageSkills_image_url',
          label: 'Language Skills - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_languageSkills_image_url',
          description: 'Main image for Language Skills program'
        },
        {
          key: 'our_work_languageSkills_gallery',
          label: 'Language Skills - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_languageSkills_gallery',
          description: 'Gallery images for Language Skills program',
          isGallery: true
        },
        {
          key: 'our_work_orphanSupport_image_url',
          label: 'Orphan Support - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_orphanSupport_image_url',
          description: 'Main image for Orphan Support program'
        },
        {
          key: 'our_work_orphanSupport_gallery',
          label: 'Orphan Support - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_orphanSupport_gallery',
          description: 'Gallery images for Orphan Support program',
          isGallery: true
        },
        {
          key: 'our_work_scholarshipMentorship_image_url',
          label: 'Scholarship & Mentorship - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_scholarshipMentorship_image_url',
          description: 'Main image for Scholarship & Mentorship program'
        },
        {
          key: 'our_work_scholarshipMentorship_gallery',
          label: 'Scholarship & Mentorship - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_scholarshipMentorship_gallery',
          description: 'Gallery images for Scholarship & Mentorship program',
          isGallery: true
        },
        {
          key: 'our_work_artClub_image_url',
          label: 'Art Club - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_artClub_image_url',
          description: 'Main image for Art Club program'
        },
        {
          key: 'our_work_artClub_gallery',
          label: 'Art Club - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_artClub_gallery',
          description: 'Gallery images for Art Club program',
          isGallery: true
        },
        {
          key: 'our_work_healthSupport_image_url',
          label: 'Health Support - Main Image',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_healthSupport_image_url',
          description: 'Main image for Health Support program'
        },
        {
          key: 'our_work_healthSupport_gallery',
          label: 'Health Support - Gallery',
          directory: 'our-work',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'our_work_healthSupport_gallery',
          description: 'Gallery images for Health Support program',
          isGallery: true
        }
      ]
    },
    {
      id: 'impact-stories',
      title: 'Impact Stories Videos',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      description: 'Video testimonials and impact stories',
      uploads: [
        {
          key: 'impact_welcome',
          label: 'Welcome to BBE Video',
          directory: 'impact-stories',
          acceptedTypes: 'video/*',
          maxSize: '50MB',
          storageKey: 'impact_welcome',
          description: 'Welcome video for impact stories'
        },
        {
          key: 'impact_orphanageSupport',
          label: 'Orphanage Support Video',
          directory: 'impact-stories',
          acceptedTypes: 'video/*',
          maxSize: '50MB',
          storageKey: 'impact_orphanageSupport',
          description: 'Orphanage support impact video'
        },
        {
          key: 'impact_educationProgram',
          label: 'Education Program Video',
          directory: 'impact-stories',
          acceptedTypes: 'video/*',
          maxSize: '50MB',
          storageKey: 'impact_educationProgram',
          description: 'Education program impact video'
        },
        {
          key: 'impact_communityImpact',
          label: 'Community Impact Video',
          directory: 'impact-stories',
          acceptedTypes: 'video/*',
          maxSize: '50MB',
          storageKey: 'impact_communityImpact',
          description: 'Community impact video'
        }
      ]
    },
    {
      id: 'news',
      title: 'News Section',
      icon: Newspaper,
      color: 'from-orange-500 to-orange-600',
      description: 'News article images',
      uploads: [
        {
          key: 'news_featured',
          label: 'Featured Article Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_featured',
          description: 'Featured news article image'
        },
        {
          key: 'news_article1',
          label: 'Article 1 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article1',
          description: 'News article 1 image'
        },
        {
          key: 'news_article2',
          label: 'Article 2 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article2',
          description: 'News article 2 image'
        },
        {
          key: 'news_article3',
          label: 'Article 3 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article3',
          description: 'News article 3 image'
        },
        {
          key: 'news_article4',
          label: 'Article 4 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article4',
          description: 'News article 4 image'
        },
        {
          key: 'news_article5',
          label: 'Article 5 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article5',
          description: 'News article 5 image'
        },
        {
          key: 'news_article6',
          label: 'Article 6 Image',
          directory: 'news',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'news_article6',
          description: 'News article 6 image'
        }
      ]
    },
    {
      id: 'programs',
      title: 'Programs Section',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      description: 'Program category images',
      uploads: [
        {
          key: 'programs_education_image_url',
          label: 'Education Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_education_image_url',
          description: 'Education program category image'
        },
        {
          key: 'programs_economic_image_url',
          label: 'Economic Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_economic_image_url',
          description: 'Economic program category image'
        },
        {
          key: 'programs_orphans_image_url',
          label: 'Orphans Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_orphans_image_url',
          description: 'Orphans program category image'
        },
        {
          key: 'programs_rights_image_url',
          label: 'Rights Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_rights_image_url',
          description: 'Rights program category image'
        },
        {
          key: 'programs_emergency_image_url',
          label: 'Emergency Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_emergency_image_url',
          description: 'Emergency program category image'
        },
        {
          key: 'programs_refugeeSupport_image_url',
          label: 'Refugee Support Program Image',
          directory: 'programs',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'programs_refugeeSupport_image_url',
          description: 'Refugee Support program category image'
        }
      ]
    },
    {
      id: 'team',
      title: 'Team Section',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      description: 'Team member photos',
      uploads: [
        {
          key: 'team_member1',
          label: 'Team Member 1 Photo',
          directory: 'team',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'team_member1',
          description: 'Team member 1 profile photo'
        },
        {
          key: 'team_member2',
          label: 'Team Member 2 Photo',
          directory: 'team',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'team_member2',
          description: 'Team member 2 profile photo'
        },
        {
          key: 'team_member3',
          label: 'Team Member 3 Photo',
          directory: 'team',
          acceptedTypes: 'image/*',
          maxSize: '5MB',
          storageKey: 'team_member3',
          description: 'Team member 3 profile photo'
        }
      ]
    }
  ]

  const renderSection = (section: typeof sections[0]) => (
    <Card key={section.id} className="border-0 shadow-lg bg-white mb-6">
      <CardHeader className={`bg-gradient-to-r ${section.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <section.icon className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl font-bold">{section.title}</CardTitle>
              <p className="text-white/90 text-sm mt-1">{section.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          >
            {activeSection === section.id ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>
      {activeSection === section.id && (
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.uploads.map((upload) => {
              const currentValue = uploadedFiles[upload.storageKey]
              const isGallery = upload.isGallery
              const galleryArray = isGallery ? (Array.isArray(currentValue) ? currentValue : []) : []
              
              return (
                <div key={upload.key} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{upload.label}</h4>
                    {currentValue && !isGallery && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {isGallery && galleryArray.length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {galleryArray.length} images
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3">{upload.description}</p>
                  
                  {/* Preview */}
                  {!isGallery && currentValue && typeof currentValue === 'string' && (
                    <div className="mb-3">
                      {currentValue.includes('video') || currentValue.endsWith('.mp4') || currentValue.endsWith('.mov') ? (
                        <video 
                          src={currentValue} 
                          className="w-full h-32 object-cover rounded border"
                          controls
                        />
                      ) : (
                        <img 
                          src={currentValue} 
                          alt={upload.label}
                          className="w-full h-32 object-cover rounded border"
                        />
                      )}
                    </div>
                  )}
                  
                  {isGallery && galleryArray.length > 0 && (
                    <div className="mb-3 grid grid-cols-3 gap-2">
                      {galleryArray.slice(0, 6).map((url, idx) => (
                        <img 
                          key={idx}
                          src={url} 
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                  
                  <MediaUpload
                    onUploaded={(url) => {
                      if (isGallery) {
                        handleGalleryUploaded(upload.storageKey, url)
                      } else {
                        handleFileUploaded(upload.storageKey, url)
                      }
                    }}
                    acceptedTypes={upload.acceptedTypes}
                    maxSize={upload.maxSize}
                    label={`Upload ${upload.label}`}
                    directory={upload.directory}
                    storageKey={upload.storageKey}
                  />
                  
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Directory: <code className="bg-gray-200 px-1 rounded">{upload.directory}</code></p>
                    <p>Storage Key: <code className="bg-gray-200 px-1 rounded">{upload.storageKey}</code></p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      )}
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Upload Center</h1>
            <p className="text-gray-600">Upload and manage media files for all website sections</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Instructions */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <UploadIcon className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">How to Use</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Click on any section to expand and see upload options</li>
                  <li>• Each upload has a specific directory and storage key</li>
                  <li>• Files are automatically saved to localStorage with the correct keys</li>
                  <li>• Gallery uploads allow multiple images per program</li>
                  <li>• All uploaded files are organized by directory for easy management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map(renderSection)}
        </div>

        {/* Summary */}
        <Card className="mt-8 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Upload Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.map(section => {
                const sectionUploads = section.uploads.filter(u => {
                  const value = uploadedFiles[u.storageKey]
                  if (u.isGallery) {
                    return Array.isArray(value) && value.length > 0
                  }
                  return value && typeof value === 'string'
                })
                return (
                  <div key={section.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <section.icon className={`h-8 w-8 mx-auto mb-2 text-${section.color.split(' ')[1]}`} />
                    <div className="text-2xl font-bold text-gray-900">{sectionUploads.length}</div>
                    <div className="text-sm text-gray-600">/{section.uploads.length}</div>
                    <div className="text-xs text-gray-500 mt-1">{section.title}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
