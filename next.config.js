/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "i.dummyjson.com",
      "itbook.store",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;
