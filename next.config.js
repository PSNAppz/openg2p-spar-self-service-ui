/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

module.exports = withNextIntl(nextConfig);
