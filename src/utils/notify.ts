import { Alert, Platform } from 'react-native';

// Alert.alert não funciona no navegador (react-native-web),
// então no web usamos o alert do próprio browser.
export function notify(title: string, message: string) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}
