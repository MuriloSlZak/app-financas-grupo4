import { StyleSheet, Text, View } from 'react-native';

import { UI } from '@/constants/ui';
import { formatBRL } from '@/utils/format';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const positive = balance >= 0;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Saldo geral disponível</Text>
      <Text style={[styles.balanceValue, { color: positive ? UI.colors.success : UI.colors.danger }]}>
        {formatBRL(balance)}
      </Text>
      <View
        style={[
          styles.statusChip,
          { backgroundColor: positive ? UI.colors.successSoft : UI.colors.dangerSoft },
        ]}>
        <Text style={[styles.statusText, { color: positive ? UI.colors.success : UI.colors.danger }]}>
          {positive ? '▲ Saldo positivo' : '▼ Saldo negativo'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: UI.colors.card,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: UI.radius.lg,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: UI.colors.border,
    ...UI.shadow,
  },
  balanceLabel: {
    fontSize: 12,
    color: UI.colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '800',
    marginTop: 6,
  },
  statusChip: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: UI.radius.pill,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
