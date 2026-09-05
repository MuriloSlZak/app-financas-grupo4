import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { UI } from '@/constants/ui';
import { Transaction } from '@/context/TransactionContext';
import { formatBRL } from '@/utils/format';

interface TransactionItemProps {
  item: Transaction;
  onTogglePaid: (id: string) => void;
}

export default function TransactionItem({ item, onTogglePaid }: TransactionItemProps) {
  const isRevenue = item.type === 'revenue';
  const color = isRevenue ? UI.colors.success : UI.colors.danger;

  return (
    <View style={styles.transactionItem}>
      <View style={[styles.iconCircle, { backgroundColor: isRevenue ? UI.colors.successSoft : UI.colors.dangerSoft }]}>
        <Text style={[styles.iconText, { color }]}>{isRevenue ? '▲' : '▼'}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.itemDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={[styles.itemAmount, { color }]}>
          {isRevenue ? '+ ' : '- '}
          {formatBRL(item.amount)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.paidButton, item.paid ? styles.paidButtonTrue : styles.paidButtonFalse]}
        onPress={() => onTogglePaid(item.id)}
        activeOpacity={0.8}>
        <Text style={[styles.paidButtonText, item.paid ? styles.paidTextTrue : styles.paidTextFalse]}>
          {item.paid ? 'Pago ✓' : 'Pendente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: UI.colors.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: UI.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: UI.colors.border,
    ...UI.shadow,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 16, fontWeight: '800' },
  info: { flex: 1, marginRight: 10 },
  itemDescription: {
    fontSize: 15,
    fontWeight: '700',
    color: UI.colors.text,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  paidButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: UI.radius.pill,
  },
  paidButtonTrue: { backgroundColor: UI.colors.successSoft },
  paidButtonFalse: { backgroundColor: UI.colors.warningSoft },
  paidButtonText: { fontSize: 12, fontWeight: '700' },
  paidTextTrue: { color: UI.colors.success },
  paidTextFalse: { color: UI.colors.warning },
});
