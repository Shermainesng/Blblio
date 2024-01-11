/** @type {import('next').NextConfig} */

const nextAuthUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth"
    : "https://blblio-opls-shermainesng.vercel.app/api/auth";

console.log("NEXTAUTHURL", process.env.NODE_ENV);

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
