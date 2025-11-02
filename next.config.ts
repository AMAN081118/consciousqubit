/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kduuxbyobjephuqskgxc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: ["placehold.co"], // keep other static domains if needed
  },
};

module.exports = nextConfig;
