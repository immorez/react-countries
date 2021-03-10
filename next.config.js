const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const baseUrl = "";

module.exports = withBundleAnalyzer({
  images: {
    domains: ["restcountries.eu"]
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: baseUrl,
  env: {
    baseUrl: baseUrl
  }
});
