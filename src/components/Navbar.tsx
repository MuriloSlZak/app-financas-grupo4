// @ts-nocheck
import { View, Text, StyleSheet } from 'react-native';

export default function Navbar({ currentScreen }) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Controle Financeiro 💰</Text>
      <Text style={styles.navbarSubtext}>
        {currentScreen === 'dashboard' ? 'Painel de Gráficos' : 'Histórico & Cadastro'}
      </Text>
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
});