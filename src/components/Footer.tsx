import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterProps {
  currentScreen: 'dashboard' | 'transacoes';
  onChangeScreen: (screen: 'dashboard' | 'transacoes') => void;
}

export default function Footer({ currentScreen, onChangeScreen }: FooterProps) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, currentScreen === 'dashboard' && styles.tabItemActive]}
        onPress={() => onChangeScreen('dashboard')}>
        <Text style={[styles.tabText, currentScreen === 'dashboard' && styles.tabTextActive]}>
          📊 Painel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, currentScreen === 'transacoes' && styles.tabItemActive]}
        onPress={() => onChangeScreen('transacoes')}>
        <Text style={[styles.tabText, currentScreen === 'transacoes' && styles.tabTextActive]}>
          💸 Lançamentos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabItemActive: { borderTopWidth: 3, borderTopColor: '#3b82f6' },
  tabText: { fontSize: 13, color: '#64748b' },
  tabTextActive: { color: '#3b82f6', fontWeight: 'bold' },
});
