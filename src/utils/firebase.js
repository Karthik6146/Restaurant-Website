const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const configured = Object.values(firebaseConfig).every(
  (value) => value && !value.startsWith("YOUR_"),
);
const app = configured
  ? await import("firebase/app").then(({ initializeApp }) =>
      initializeApp(firebaseConfig),
    )
  : null;
export const db = app
  ? await import("firebase/firestore").then(({ getFirestore }) =>
      getFirestore(app),
    )
  : null;
