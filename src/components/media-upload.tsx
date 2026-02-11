"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, FileImage, Video, File, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  preview?: string
  status: 'uploading' | 'success' | 'error'
  progress: number
}

interface MediaUploadProps {
  onUploaded?: (url: string) => void;
  acceptedTypes?: string;
  maxSize?: string | number;
  label?: string;
  directory?: string;
  storageKey?: string;
}

export function MediaUpload({ 
  onUploaded,
  acceptedTypes = 'image/*,video/*',
  maxSize = 50 * 1024 * 1024,
  label = 'Upload Media',
  directory,
  storageKey,
}: MediaUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxFileSize = typeof maxSize === 'string' 
    ? parseInt(maxSize) * 1024 * 1024 
    : maxSize;

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.split(',').some(type => file.type.startsWith(type.replace('*', '')))) {
      return `File type not supported. Please upload: ${acceptedTypes}`
    }
    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is ${formatFileSize(maxFileSize)}.`
    }
    return null
  }

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else if (file.type.startsWith('video/')) {
        resolve('') // Placeholder for video
      } else {
        resolve('')
      }
    })
  }

  const uploadFile = async (file: File): Promise<void> => {
    const fileId = generateId()
    const error = validateFile(file)
    
    if (error) {
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'error',
        progress: 0
      }])
      return
    }

    const preview = await createFilePreview(file)
    
    setUploadedFiles(prev => [...prev, {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      preview,
      status: 'uploading',
      progress: 0
    }])

    const progressInterval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 90) } // Stop at 90% until success
          : f
      ))
    }, 200)

    try {
      const formData = new FormData()
      formData.append('files', file)
      if (directory) formData.append('directory', directory)
      if (storageKey) formData.append('storageKey', storageKey)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (response.ok) {
        const result = await response.json()
        const fileUrl = result.files[0]?.url
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'success', 
                progress: 100,
                url: fileUrl || f.url
              }
            : f
        ))
        if (onUploaded && fileUrl) {
          onUploaded(fileUrl)
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ))
      console.error('Upload error:', error)
    }
  }

  const handleFiles = useCallback((files: FileList) => {
    setIsUploading(true)
    Promise.all(Array.from(files).map(uploadFile)).finally(() => {
      setIsUploading(false)
    })
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="h-8 w-8 text-gray-500" />
    if (type.startsWith('video/')) return <Video className="h-8 w-8 text-gray-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {label}
        </h2>
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
            isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-semibold text-gray-700">Drag & drop files here</p>
            <p className="text-gray-500">or click to browse</p>
            <p className="text-xs text-gray-400 mt-2">
              {acceptedTypes}
            </p>
            <p className="text-xs text-gray-400">
              Maximum file size: {formatFileSize(maxFileSize)}
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Uploaded Files</h3>
            <ul className="space-y-4">
              {uploadedFiles.map(file => (
                <li key={file.id} className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="h-16 w-16 object-cover rounded-md" />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    
                    {file.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${file.progress}%` }}></div>
                      </div>
                    )}

                    {file.status === 'success' && (
                      <div className="flex items-center text-green-600 text-sm mt-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Upload complete</span>
                      </div>
                    )}

                    {file.status === 'error' && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>Upload failed</span>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X className="h-5 w-5 text-gray-500" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isUploading && (
          <div className="mt-4 text-center text-gray-600">
            <p>Uploading files, please wait...</p>
          </div>
        )}
      </div>
    </div>
  )
}