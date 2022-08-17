/** @type {import('next').NextConfig} */
const path = require("path");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  frame-ancestors 'self' app.peppergaming.com localhost:3000; 
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/login",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
      {
        source: "/oauth",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
      {
        key: "X-Frame-Options",
        value: "allow-from app.peppergaming.com",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: false,
  swcMinify: false,
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
