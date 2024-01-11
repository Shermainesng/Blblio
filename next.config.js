/** @type {import('next').NextConfig} */

const nextAuthUrl =
  process.env.NODE_ENV === "production"
    ? // ? "https://blblio-xhl7.vercel.app/api/auth"
      "https://blblio-opls.vercel.app/api/auth"
    : "http://localhost:3000/api/auth";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/books",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "books.google.com",
      // "st4.depositphotos.com",
      "depositphotos.com",
      "as1.ftcdn.net",
    ],
  },
  env: { NEXTAUTH_URL: nextAuthUrl },
  // pageExtensions: ['page.js']
};

module.exports = nextConfig;
