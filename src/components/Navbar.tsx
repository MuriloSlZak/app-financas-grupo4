import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavbarProps {
  currentScreen: 'dashboard' | 'transacoes';
  onLogout?: () => void;
}

export default function Navbar({ currentScreen, onLogout }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Controle Financeiro 💰</Text>
      <Text style={styles.navbarSubtext}>
        {currentScreen === 'dashboard' ? 'Painel de Gráficos' : 'Histórico & Cadastro'}
      </Text>
      {onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Sair ⏻</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#1e293b',
    paddingTop: 85, // Aquele espaço maroto que a gente arrumou!
    paddingBottom: 15,
    alignItems: 'center',
  },
  navbarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarSubtext: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#334155',
  },
  logoutText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
