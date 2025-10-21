import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);