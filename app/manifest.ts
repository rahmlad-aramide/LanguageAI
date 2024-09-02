import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LanguageAI - Texts and Documents Translator.',
    short_name: 'LanguageAI',
    description: 'LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icons/icon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/icon-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icons/icon-64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}