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
  // pageExtensions: ['page.js']
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ]
  // }
}

module.exports = nextConfig

