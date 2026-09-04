import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Transaction } from '@/context/TransactionContext';

interface TransactionItemProps {
  item: Transaction;
  onTogglePaid: (id: string) => void;
}

export default function TransactionItem({ item, onTogglePaid }: TransactionItemProps) {
  return (
    <View style={styles.transactionItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text
          style={[styles.itemAmount, { color: item.type === 'revenue' ? '#2ecc71' : '#e74c3c' }]}>
          {item.type === 'revenue' ? '+' : '-'} R$ {item.amount.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.paidButton, item.paid ? styles.paidButtonTrue : styles.paidButtonFalse]}
        onPress={() => onTogglePaid(item.id)}>
        <Text style={styles.paidButtonText}>{item.paid ? 'Pago ✓' : 'Pendente'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  paidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  paidButtonTrue: {
    backgroundColor: '#dcfce7',
  },
  paidButtonFalse: {
    backgroundColor: '#fee2e2',
  },
  paidButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});
