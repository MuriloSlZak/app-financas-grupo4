import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { isFirebaseConfigured } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { notify } from '@/utils/notify';

function friendlyAuthError(code: string | undefined): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Email inválido. Confira o que você digitou.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este email já está cadastrado. Tente entrar.';
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet. Tente novamente.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente de novo.';
    default:
      return 'Não foi possível completar a operação. Tente novamente.';
  }
}

export default function LoginForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'cadastro'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !senha) {
      notify('Atenção', 'Preencha email e senha.');
      return;
    }
    if (!isFirebaseConfigured) {
      notify(
        'Firebase não configurado',
        'Cole as chaves do seu projeto Firebase em src/config/firebase.ts (Console Firebase → Configurações do projeto → Seus apps).'
      );
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, senha);
      } else {
        await register(email, senha);
      }
      // Não precisa navegar: o Stack.Protected do _layout troca para as abas sozinho.
    } catch (error: any) {
      notify('Ops!', friendlyAuthError(error?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.formTitle}>{mode === 'login' ? 'Entrar' : 'Criar conta'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchModeButton}
        onPress={() => setMode(mode === 'login' ? 'cadastro' : 'login')}>
        <Text style={styles.switchModeText}>
          {mode === 'login' ? 'Não tem conta? Criar uma agora' : 'Já tem conta? Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#334155',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  switchModeButton: { marginTop: 15, alignItems: 'center' },
  switchModeText: { color: '#3b82f6', fontSize: 13, fontWeight: '600' },
});
