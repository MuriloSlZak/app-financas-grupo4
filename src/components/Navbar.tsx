import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { UI } from '@/constants/ui';

interface NavbarProps {
  currentScreen: 'dashboard' | 'transacoes';
  onLogout?: () => void;
}

export default function Navbar({ currentScreen, onLogout }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Controle Financeiro 💰</Text>
      <View style={styles.subtextPill}>
        <Text style={styles.navbarSubtext}>
          {currentScreen === 'dashboard' ? 'Painel de Gráficos' : 'Histórico & Cadastro'}
        </Text>
      </View>
      {onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Sair ⏻</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: UI.colors.dark,
    paddingTop: 85, // Aquele espaço maroto que a gente arrumou!
    paddingBottom: 18,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  navbarText: {
    color: UI.colors.onDark,
    fontSize: 22,
    fontWeight: '800',
  },
  subtextPill: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: UI.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  navbarSubtext: {
    color: UI.colors.onDarkMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  logoutButton: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: UI.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  logoutText: {
    color: UI.colors.onDarkMuted,
    fontSize: 12,
    fontWeight: '700',
  },
});
