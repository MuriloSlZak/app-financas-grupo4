import { FlatList, StyleSheet, Text, View } from 'react-native';

import TransactionItem from '@/components/TransactionItem';
import { Transaction } from '@/context/TransactionContext';

interface TransactionListProps {
  transactions: Transaction[];
  onTogglePaid: (id: string) => void;
}

export default function TransactionList({ transactions, onTogglePaid }: TransactionListProps) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Listagem de Movimentações</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => <TransactionItem item={item} onTogglePaid={onTogglePaid} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
});
