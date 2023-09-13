// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // FB_API_KEY: "AIzaSyCeCfGmPpA6L-dEeghwxftfmZxW5o_eGLo",
    // FB_AUTH_DOMAIN: "crud-nuxt3.firebaseapp.com",
    // FB_PROJECT_ID: "crud-nuxt3",
    // FB_STORAGE_BUCKET: "crud-nuxt3.appspot.com",
    // FB_MESSAGING_SENDER_ID: "331532972364",
    // FB_APP_ID: "1:331532972364:web:8806b66ae2a661cc8b9fe9",
    // FB_MEASUREMENT_ID: "G-EMM3GR94E1"

    // FB_API_KEY: "YOUR_API_KEY",
    // FB_AUTH_DOMAIN: "YOUR_DOMINIO.firebaseapp.com",
    // FB_PROJECT_ID: "YOUR_PROJECT_ID",
    // FB_STORAGE_BUCKET: "YOUR_STORAGE_BUCKET",
    // FB_MESSAGING_SENDER_ID: "YOUR_MESSAGING_SENDER_ID",
    // FB_APP_ID: "YOUR_APP_ID",
    // MEASUREMENT_ID: "YOUR_MEASUREMENT_ID",
  },
  pages: true,
  plugins: [
    // ...
    { src: "~/plugins/firebase.ts", mode: "client" },
  ],
});
