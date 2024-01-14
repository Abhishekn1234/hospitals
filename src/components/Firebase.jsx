
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ4YvPcaknci2zILCDrZ3ou4TN1s-Z_60',
  authDomain: 'fir-7da98.firebaseapp.com',
  projectId: 'fir-7da98',
  storageBucket: 'fir-7da98.appspot.com',
  messagingSenderId: '431084879010',
  appId: '1:431084879010:web:b6616c843e0db345c26bfb',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
