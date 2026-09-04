import { StyleSheet, Text, View } from 'react-native';

import LoginForm from '@/components/LoginForm';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💰</Text>
      <Text style={styles.title}>Controle Financeiro</Text>
      <Text style={styles.subtitle}>Entre para cuidar do seu dinheiro</Text>

      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  subtitle: { fontSize: 15, color: '#64748b', marginBottom: 30 },
});
