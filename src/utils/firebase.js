
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBI5UkmhskAars8fe7HAEek39_vyASLfQg",
  authDomain: "csr-project-ba9c3.firebaseapp.com",
  databaseURL: "https://csr-project-ba9c3-default-rtdb.firebaseio.com",
  projectId: "csr-project-ba9c3",
  storageBucket: "csr-project-ba9c3.appspot.com",
  messagingSenderId: "244908835927",
  appId: "1:244908835927:web:35f44d5de8f310c3ff4f12",
  measurementId: "G-4VSGF1RHGL"
};

const app = initializeApp(firebaseConfig);
export default app;
