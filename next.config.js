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
  pageExtensions: ['page.js']
}

module.exports = nextConfig

