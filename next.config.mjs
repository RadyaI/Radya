/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL('https://i.pinimg.com/**'),
      new URL('https://cataas.com/cat')
    ],
  },
};

export default nextConfig;
