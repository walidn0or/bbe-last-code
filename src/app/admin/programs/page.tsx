"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, X, Eye, GraduationCap, Users, Heart, Globe, Award } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export const dynamic = 'force-dynamic'

export default function ProgramsUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    education: "",
    economic: "",
    orphans: "",
    rights: "",
    emergency: "",
    refugeeSupport: "",
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const programSlots = [
    {
      key: "education",
      title: "Education Program",
      description: "Virtual classes, on-ground schools, STEM education, certified programs",
      icon: GraduationCap,
      color: "blue",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.education
    },
    {
      key: "economic",
      title: "Economic Empowerment",
      description: "Business training, microfinance access, freelance platforms, technical skills",
      icon: Users,
      color: "purple",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.economic
    },
    {
      key: "orphans",
      title: "Orphans Support",
      description: "Educational support, nutritional programs, skills training, emotional support",
      icon: Heart,
      color: "red",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.orphans
    },
    {
      key: "rights",
      title: "Human Rights",
      description: "Rights workshops, documentation efforts, community advocacy, policy research",
      icon: Globe,
      color: "orange",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.rights
    },
    {
      key: "emergency",
      title: "Emergency Response",
      description: "Food & shelter, medical supplies, disaster response, recovery planning",
      icon: Award,
      color: "yellow",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.emergency
    },
    {
      key: "refugeeSupport",
      title: "Refugee Support Program",
      description: "Community gatherings and empowerment sessions in the UK",
      icon: Users,
      color: "green",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.refugeeSupport
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      red: "from-red-500 to-red-600",
      orange: "from-orange-500 to-orange-600",
      yellow: "from-yellow-500 to-yellow-600"
    }
    return colors[color as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Programs Section Upload</h1>
            <p className="text-gray-600">Upload images for all programs</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {programSlots.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(uploadedFiles).filter(Boolean).length / programSlots.length) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programSlots.map((program) => (
            <Card key={program.key} className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className={`h-2 bg-gradient-to-r ${getColorClasses(program.color)}`}></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(program.color)} text-white`}>
                      <program.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {program.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{program.description}</p>
                    </div>
                  </div>
                  {uploadedFiles[program.key] && (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Done</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Image Preview */}
                {uploadedFiles[program.key] && (
                  <div className="mb-6">
                    <div className="relative group">
                      <img 
                        src={uploadedFiles[program.key]} 
                        alt={program.title}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(uploadedFiles[program.key], '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Component */}
                <MediaUpload
                  onUploaded={(url) => handleFileUploaded(program.key, url)}
                  acceptedTypes={program.acceptedTypes}
                  maxSize={program.maxSize}
                  label={`Upload ${program.title} Image`}
                />

                {/* Requirements */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• File types: {program.acceptedTypes}</li>
                    <li>• Max size: {program.maxSize}</li>
                    <li>• Recommended size: {program.recommendedSize}</li>
                    {program.required && <li>• <span className="text-red-600 font-medium">Required</span></li>}
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
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
              <p className="text-gray-600">How your programs section will look on the website</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programSlots.filter(program => uploadedFiles[program.key]).map((program) => (
                  <div key={program.key} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img
                        src={uploadedFiles[program.key]}
                        alt={program.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-r ${getColorClasses(program.color)}`}>
                        <program.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">{program.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{program.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
