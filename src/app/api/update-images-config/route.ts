import { NextRequest, NextResponse } from 'next/server'
import { updateImagesConfig } from '@/lib/images-config-updater'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { storageKey, fileUrl, isGallery } = body

    if (!storageKey || !fileUrl) {
      return NextResponse.json(
        { error: 'storageKey and fileUrl are required' },
        { status: 400 }
      )
    }

    const result = await updateImagesConfig(
      storageKey,
      fileUrl,
      isGallery || false
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      })
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in update-images-config API:', error)
    return NextResponse.json(
      { error: 'Failed to update images config' },
      { status: 500 }
    )
  }
}
