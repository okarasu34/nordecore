import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

export async function uploadImage(file: string, folder = 'Deconor/products') {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [
      { width: 1600, height: 1200, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
    ],
  })
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  }
}

export function getOptimizedUrl(publicId: string, width = 800) {
  return cloudinary.url(publicId, {
    width,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
  })
}
