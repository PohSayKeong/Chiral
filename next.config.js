const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: prod ? false : true,
    },
    future: { webpack5: true }, //needed only by earlier next.js versions (<= 10)
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
});
