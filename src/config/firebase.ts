import { Platform } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Chaves do projeto Firebase do Grupo 4 (grupofourappfinancas)
const firebaseConfig = {
  apiKey: 'AIzaSyAZF2Iht0Uhth3NJ5BEm6apI3bDjotmqBA',
  authDomain: 'grupofourappfinancas.firebaseapp.com',
  projectId: 'grupofourappfinancas',
  storageBucket: 'grupofourappfinancas.firebasestorage.app',
  messagingSenderId: '787692275339',
  appId: '1:787692275339:web:77f8a8cafbad0f05cd768e',
};

// Permite que a tela de login avise se as chaves ainda não foram configuradas
export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('COLE_AQUI');

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let auth: Auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  // No nativo, initializeAuth + AsyncStorage mantém o usuário logado entre aberturas do app.
  // getReactNativePersistence só existe no bundle react-native do firebase/auth,
  // por isso o require dinâmico em vez de import no topo.
  const { initializeAuth, getReactNativePersistence } = require('firebase/auth');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
}

export { auth };
