/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm2.headlessbox.ru',
			},
		],
	},
}

export default nextConfig
