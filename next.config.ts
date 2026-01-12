/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If you want, you can enable SWC minify for faster builds
  swcMinify: true,
  images: {
    domains: [], // add your external image domains if needed
  },
};

export default nextConfig;

