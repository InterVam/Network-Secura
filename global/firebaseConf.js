import { initializeApp } from 'firebase/app';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from "@env"

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
  };

export const app = initializeApp(firebaseConfig);
