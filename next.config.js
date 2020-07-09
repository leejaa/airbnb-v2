require("dotenv").config();
const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
        // disable: process.env.NODE_ENV === 'development',
        dest: 'public'
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        //
        // This option is rarely needed, and should be reserved for advanced
        // setups. You may be looking for `ignoreDevErrors` instead.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    env: {
        SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
        ACCESS_TOKEN_SECRET: 'accessToken',
        REFRESH_TOKEN_SECRET: 'refreshToken',
        PRODUCTION_URL: process.env.PRODUCTION_URL,
        DEVELOPMENT_URL: process.env.DEVELOPMENT_URL,
        IS_PRODUCTION: process.env.IS_PRODUCTION,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_MAP_CLIENT_ID: process.env.GOOGLE_MAP_CLIENT_ID,
        NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
        NAVER_CALLBACK_URL: process.env.NAVER_CALLBACK_URL,
        KAKAO_KEY: process.env.KAKAO_KEY,
    }
})