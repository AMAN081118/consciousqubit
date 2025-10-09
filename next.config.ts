/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ... other options
  },
  images: {
    domains: [
      "placehold.co",
      "https://kduuxbyobjephuqskgxc.storage.supabase.co/storage/v1/s3",
    ], // replace with your actual bucket host
  },
};

module.exports = nextConfig;
