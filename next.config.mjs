/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
        pathname: "/**",
      },
      ...(process.env.NEXT_PUBLIC_CDN_HOSTNAME ?
        [
          {
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME,
            pathname: "/**",
          },
        ] :
        []
      ),
    ],
  },
};

export default nextConfig;
