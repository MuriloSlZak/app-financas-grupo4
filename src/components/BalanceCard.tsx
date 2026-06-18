// @ts-nocheck
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ balance }) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Saldo Geral Disponível</Text>
      <Text style={[styles.balanceValue, { color: balance >= 0 ? '#2ecc71' : '#e74c3c' }]}>
        R$ {balance.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  balanceLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
});