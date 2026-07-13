import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old WordPress slugs that changed in the rebrand.
    return [
      {
        source: "/medicare-insurance-prescription-drug-form-2",
        destination: "/medication-intake-form",
        permanent: true,
      },
      {
        source: "/dental-and-vision-insurance-2",
        destination: "/dental-and-vision-insurance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
