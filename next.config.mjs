/** @type {import('next').NextConfig} */
import createNextPluginPreval from "next-plugin-preval/config.js";
const nextConfig = {};
const withNextPluginPreval = createNextPluginPreval(
  // Your Next.js config here
  nextConfig
);

export default withNextPluginPreval(nextConfig);
