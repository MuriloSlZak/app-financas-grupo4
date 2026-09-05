import { StyleSheet, Text, View } from 'react-native';

import { UI } from '@/constants/ui';
import { formatBRL } from '@/utils/format';

interface BarChartProps {
  totalRevenue: number;
  totalExpense: number;
}

const TRACK_HEIGHT = 130;

export default function BarChart({ totalRevenue, totalExpense }: BarChartProps) {
  const maxAmount = Math.max(totalRevenue, totalExpense, 1);
  const revenueBarHeight = (totalRevenue / maxAmount) * TRACK_HEIGHT;
  const expenseBarHeight = (totalExpense / maxAmount) * TRACK_HEIGHT;

  return (
    <View style={styles.chartCard}>
      <Text style={styles.sectionTitle}>Resumo Visual Financeiro</Text>
      <Text style={styles.sectionSubtitle}>Receitas x despesas do período</Text>

      <View style={styles.chartRow}>
        <View style={styles.barColumn}>
          <View style={styles.barTrack}>
            <View
              style={[styles.bar, { height: revenueBarHeight, backgroundColor: UI.colors.success }]}
            />
          </View>
          <Text style={styles.barLabel}>Receitas</Text>
          <Text style={[styles.barValue, { color: UI.colors.success }]}>
            {formatBRL(totalRevenue)}
          </Text>
        </View>

        <View style={styles.barColumn}>
          <View style={styles.barTrack}>
            <View
              style={[styles.bar, { height: expenseBarHeight, backgroundColor: UI.colors.danger }]}
            />
          </View>
          <Text style={styles.barLabel}>Despesas</Text>
          <Text style={[styles.barValue, { color: UI.colors.danger }]}>
            {formatBRL(totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: UI.colors.card,
    padding: 20,
    borderRadius: UI.radius.lg,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: UI.colors.border,
    ...UI.shadow,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: UI.colors.text },
  sectionSubtitle: { fontSize: 12, color: UI.colors.textSecondary, marginTop: 2 },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 18,
  },
  barColumn: { alignItems: 'center', width: 120 },
  barTrack: {
    height: TRACK_HEIGHT,
    width: 56,
    borderRadius: 12,
    backgroundColor: UI.colors.bg,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: { width: '100%', borderRadius: 12, minHeight: 6 },
  barLabel: { fontSize: 13, fontWeight: '700', color: UI.colors.text, marginTop: 10 },
  barValue: { fontSize: 13, fontWeight: '700', marginTop: 2 },
});
