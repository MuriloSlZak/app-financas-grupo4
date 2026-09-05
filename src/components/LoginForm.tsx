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
import { UI } from '@/constants/ui';
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

  const isLogin = mode === 'login';

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
      if (isLogin) {
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
      <Text style={styles.formTitle}>{isLogin ? 'Entrar' : 'Criar conta'}</Text>
      <Text style={styles.formSubtitle}>
        {isLogin ? 'Use seu e-mail e senha para continuar' : 'Leva menos de um minuto'}
      </Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="voce@email.com"
        placeholderTextColor="#94a3b8"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder={isLogin ? 'Sua senha' : 'Mínimo de 6 caracteres'}
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.85}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchModeButton}
        onPress={() => setMode(isLogin ? 'cadastro' : 'login')}>
        <Text style={styles.switchModeText}>
          {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
          <Text style={styles.switchModeLink}>{isLogin ? 'Criar uma agora' : 'Entrar'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI.colors.card,
    padding: 24,
    borderRadius: UI.radius.lg,
    width: '100%',
    maxWidth: 380,
    ...UI.shadow,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: UI.colors.text,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 13,
    color: UI.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: UI.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: UI.colors.inputBg,
    borderWidth: 1,
    borderColor: UI.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 14,
    color: UI.colors.text,
  },
  submitButton: {
    backgroundColor: UI.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  switchModeButton: { marginTop: 18, alignItems: 'center' },
  switchModeText: { color: UI.colors.textSecondary, fontSize: 13 },
  switchModeLink: { color: UI.colors.primary, fontWeight: '700' },
});
