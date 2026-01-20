/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://i.pinimg.com/736x/72/1f/cc/721fccffcb558397ac6af7f360d7fe4d.jpg')],
  },
};

export default nextConfig;
