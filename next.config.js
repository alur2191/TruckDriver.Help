module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.truckdriver.help/:path*',
      },
    ]
  },
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? { source: "/((?!comingsoon)(?!_next)(?!static).*)", destination: "/comingsoon", permanent: false }
        : null,
    ].filter(Boolean);
  }
}
