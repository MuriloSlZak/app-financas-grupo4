import { StyleSheet, Text, View } from 'react-native';

import ShareStatusCard from '@/components/ShareStatusCard';
import { useTransactions } from '@/context/TransactionContext';

export default function RelatorioScreen() {
  const { balance } = useTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status Financeiro 📑</Text>
      <Text style={styles.subtitle}>Compartilhe o seu resultado</Text>

      <ShareStatusCard balance={balance} />
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
    paddingTop: 80,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  subtitle: { fontSize: 15, color: '#64748b', marginBottom: 30 },
});
