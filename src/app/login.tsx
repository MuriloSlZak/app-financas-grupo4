import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LoginForm from '@/components/LoginForm';
import { UI } from '@/constants/ui';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>💰</Text>
        </View>
        <Text style={styles.title}>Controle Financeiro</Text>
        <Text style={styles.subtitle}>Entre para cuidar do seu dinheiro</Text>

        <LoginForm />

        <Text style={styles.footer}>App Finanças · Grupo 4</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: UI.colors.dark },
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logo: { fontSize: 42 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: UI.colors.onDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: UI.colors.onDarkMuted,
    marginBottom: 28,
    textAlign: 'center',
  },
  footer: {
    marginTop: 28,
    fontSize: 12,
    color: '#64748b',
    letterSpacing: 0.5,
  },
});
