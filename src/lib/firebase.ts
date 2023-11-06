import { FirebaseOptions, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { app, storage }