require("dotenv").config();

module.exports = {
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
    }
}