/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
               {
                   source: '/',
                   destination: '/books',
                   permanent: true,
                },
           ]
   },
  reactStrictMode: false,
  swcMinify:true,
  images: {
    domains:[
      "books.google.com",
      "st4.depositphotos.com", 
      "depositphotos.com"
    ]
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}

module.exports = nextConfig

