"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface InlineImageUploadProps {
  label?: string
  storageKey: string
  onUploaded: (url: string) => void
  children?: React.ReactNode
}

export function InlineImageUpload({ label = "Change Image", storageKey, onUploaded, children }: InlineImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append("files", file)
      const res = await fetch("/api/upload", { method: "POST", body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Upload failed")
      }
      const data = await res.json()
      const url = data.files?.[0]?.url
      if (url) {
        if (typeof window !== "undefined") localStorage.setItem(storageKey, url)
        onUploaded(url)
      } else {
        throw new Error("No URL returned")
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed"
      setError(message)
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <label className="cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={handlePickFile} disabled={uploading} />
        {children || (
          <Button size="sm" variant="outline" className="bg-white">
            {uploading ? "Uploading..." : label}
          </Button>
        )}
      </label>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
