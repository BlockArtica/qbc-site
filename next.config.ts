import { withNext } from 'next/config';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // If using React compiler
    reactRemoveProperties: true,
  },
};

export default nextConfig;

