import { ScrollView, StyleSheet, Text } from 'react-native';

import ShareStatusCard from '@/components/ShareStatusCard';
import { UI } from '@/constants/ui';
import { useTransactions } from '@/context/TransactionContext';

export default function RelatorioScreen() {
  const { balance } = useTransactions();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Status Financeiro 📑</Text>
      <Text style={styles.subtitle}>Veja como estão suas contas e compartilhe o resultado</Text>

      <ShareStatusCard balance={balance} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: UI.colors.bg },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 90,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: UI.colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: UI.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
});
