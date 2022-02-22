import { initializeApp, Firebase } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPu8UlqSEUPo1oNVa-Qi44CZtLPe-TGBA',
  authDomain: 'chatapp-b6126.firebaseapp.com',
  projectId: 'chatapp-b6126',
  storageBucket: 'chatapp-b6126.appspot.com',
  messagingSenderId: '830923624059',
  appId: '1:830923624059:web:5c2b6022adc96b8209dcde',
}

const app = initializeApp(firebaseConfig)
