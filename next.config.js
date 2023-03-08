/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify:true,
  images: {
    domains:[
      "https://books.google.com"
    ]
  }
}

module.exports = nextConfig
