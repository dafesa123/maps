import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Replace these values with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyJ0kjzbvVhGYUQC_u4Ab8tpd-WEwBp_k",
  authDomain: "aidailyplanner.firebaseapp.com",
  projectId: "aidailyplanner",
  storageBucket: "aidailyplanner.firebasestorage.app",
  messagingSenderId: "1070967105278",
  appId: "1:1070967105278:web:518eac25ea0ce02d6e27af",
  measurementId: "G-HZ8WYMD8CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 