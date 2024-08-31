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
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}