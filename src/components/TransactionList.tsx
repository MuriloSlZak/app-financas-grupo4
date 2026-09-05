import { FlatList, StyleSheet, Text, View } from 'react-native';

import TransactionItem from '@/components/TransactionItem';
import { UI } from '@/constants/ui';
import { Transaction } from '@/context/TransactionContext';

interface TransactionListProps {
  transactions: Transaction[];
  onTogglePaid: (id: string) => void;
}

export default function TransactionList({ transactions, onTogglePaid }: TransactionListProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Movimentações</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{transactions.length}</Text>
        </View>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma movimentação ainda. Cadastre a primeira acima!</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => <TransactionItem item={item} onTogglePaid={onTogglePaid} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: UI.colors.text },
  countPill: {
    backgroundColor: UI.colors.primarySoft,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: UI.radius.pill,
  },
  countText: { fontSize: 12, fontWeight: '700', color: UI.colors.primary },
  emptyText: { fontSize: 14, color: UI.colors.textSecondary, textAlign: 'center', paddingVertical: 20 },
});
