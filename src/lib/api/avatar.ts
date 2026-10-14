import imageCompression from 'browser-image-compression'
import { supabase } from '@/lib/supabase'

const BUCKET = 'avatars'
const MAX_INPUT_SIZE = 15 * 1024 * 1024
const MAX_UPLOAD_SIZE = 2 * 1024 * 1024
const MAX_DIMENSION = 512

export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  if (file.size > MAX_INPUT_SIZE) {
    return { url: null, error: 'File is too large (max 15MB)' }
  }

  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'File must be an image' }
  }

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: MAX_UPLOAD_SIZE / (1024 * 1024),
      maxWidthOrHeight: MAX_DIMENSION,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.85,
    })

    const path = `${userId}/avatar.webp`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, compressed, {
        upsert: true,
        contentType: 'image/webp',
        cacheControl: '3600',
      })

    if (uploadError) {
      return { url: null, error: uploadError.message }
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path)

    const url = `${urlData.publicUrl}?t=${Date.now()}`

    return { url, error: null }
  } catch (err) {
    console.error('Compression failed:', err)
    return {
      url: null,
      error: 'Failed to process image. Please try another file.',
    }
  }
}

export async function removeAvatar(
  userId: string,
): Promise<{ error: string | null }> {
  const paths = [
    `${userId}/avatar.webp`,
    `${userId}/avatar.jpg`,
    `${userId}/avatar.jpeg`,
    `${userId}/avatar.png`,
  ]

  const { error } = await supabase.storage.from(BUCKET).remove(paths)

  if (error) {
    if (error.message.toLowerCase().includes('not found')) {
      return { error: null }
    }
    return { error: error.message }
  }

  return { error: null }
}