import { StyleSheet, Text, View } from 'react-native';

interface BarChartProps {
  totalRevenue: number;
  totalExpense: number;
}

export default function BarChart({ totalRevenue, totalExpense }: BarChartProps) {
  const maxAmount = Math.max(totalRevenue, totalExpense, 1);
  const revenueBarHeight = (totalRevenue / maxAmount) * 120;
  const expenseBarHeight = (totalExpense / maxAmount) * 120;

  return (
    <View style={styles.chartCard}>
      <Text style={styles.sectionTitle}>Resumo Visual Financeiro</Text>
      <View style={styles.chartRow}>
        <View style={styles.barColumn}>
          <View style={[styles.bar, { height: revenueBarHeight, backgroundColor: '#2ecc71' }]} />
          <Text style={styles.barLabel}>Receitas</Text>
          <Text style={styles.barValue}>R$ {totalRevenue.toFixed(2)}</Text>
        </View>
        <View style={styles.barColumn}>
          <View style={[styles.bar, { height: expenseBarHeight, backgroundColor: '#e74c3c' }]} />
          <Text style={styles.barLabel}>Despesas</Text>
          <Text style={styles.barValue}>R$ {totalExpense.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    marginTop: 15,
  },
  barColumn: { alignItems: 'center', width: 110 },
  bar: { width: 40, borderRadius: 6, minHeight: 5 },
  barLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginTop: 8 },
  barValue: { fontSize: 12, color: '#64748b', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
});
