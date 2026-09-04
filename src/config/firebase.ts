import { Platform } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// ⚠️ COLE AQUI as chaves do SEU projeto Firebase.
// Console Firebase → Configurações do projeto → Seus apps → App da Web → firebaseConfig
const firebaseConfig = {
  apiKey: 'COLE_AQUI_SUA_API_KEY',
  authDomain: 'COLE_AQUI.firebaseapp.com',
  projectId: 'COLE_AQUI_SEU_PROJECT_ID',
  storageBucket: 'COLE_AQUI.appspot.com',
  messagingSenderId: 'COLE_AQUI',
  appId: 'COLE_AQUI_SEU_APP_ID',
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
