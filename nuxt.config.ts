// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    FB_API_KEY: "YOUR_API_KEY",
    FB_AUTH_DOMAIN: "YOUR_AUTH_DOMAIN",
    FB_PROJECT_ID: "YOUR_PROJECT_ID",
    FB_STORAGE_BUCKET: "YOUR_STORAGE_BUCKET",
    FB_MESSAGING_SENDER_ID: "YOUR_MESSAGING_SENDER_ID",
    FB_APP_ID: "YOUR_APP_ID",
    MEASUREMENT_ID: "YOUR_MEASUREMENT_ID"
  },
  pages: true,
  plugins: [
    // ...
    { src: "~/plugins/firebase.ts", mode: "client" },
  ],
});
