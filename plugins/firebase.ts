import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyCeCfGmPpA6L-dEeghwxftfmZxW5o_eGLo",
    authDomain: "crud-nuxt3.firebaseapp.com",
    projectId: "crud-nuxt3",
    storageBucket: "crud-nuxt3.appspot.com",
    messagingSenderId: "331532972364",
    appId: "1:331532972364:web:8806b66ae2a661cc8b9fe9",
    measurementId: "G-EMM3GR94E1",

    // apiKey: config.FB_API_KEY,
    // authDomain: config.FB_AUTH_DOMAIN,
    // projectId: config.FB_PROJECT_ID,
    // storageBucket: config.FB_STORAGE_BUCKET,
    // messagingSenderId: config.FB_MESSAGING_SENDER_ID,
    // appId: config.FB_APP_ID,
    // measurementId: config.FB_MESSAGING_SENDER_ID
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
});
