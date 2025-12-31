import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIr6yeCMrMMLswHRex_piykGzBTPN2LCg",
  authDomain: "hp-fan-club-lk.firebaseapp.com",
  projectId: "hp-fan-club-lk",
  storageBucket: "hp-fan-club-lk.firebasestorage.app",
  messagingSenderId: "932980621782",
  appId: "1:932980621782:web:a8fde8bbe700b97e29a477"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);