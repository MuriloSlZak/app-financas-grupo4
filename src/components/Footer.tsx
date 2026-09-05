import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { UI } from '@/constants/ui';

interface FooterProps {
  currentScreen: 'dashboard' | 'transacoes';
  onChangeScreen: (screen: 'dashboard' | 'transacoes') => void;
}

export default function Footer({ currentScreen, onChangeScreen }: FooterProps) {
  const isDashboard = currentScreen === 'dashboard';

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, isDashboard && styles.tabItemActive]}
          onPress={() => onChangeScreen('dashboard')}
          activeOpacity={0.8}>
          <Text style={[styles.tabText, isDashboard && styles.tabTextActive]}>📊 Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, !isDashboard && styles.tabItemActive]}
          onPress={() => onChangeScreen('transacoes')}
          activeOpacity={0.8}>
          <Text style={[styles.tabText, !isDashboard && styles.tabTextActive]}>💸 Lançamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    height: 62,
    width: '100%',
    maxWidth: 520,
    backgroundColor: UI.colors.card,
    borderWidth: 1,
    borderColor: UI.colors.border,
    borderRadius: UI.radius.lg,
    padding: 6,
    ...UI.shadow,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  tabItemActive: { backgroundColor: UI.colors.primarySoft },
  tabText: { fontSize: 13, color: UI.colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: UI.colors.primary, fontWeight: '700' },
});
