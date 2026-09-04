import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { notify } from '@/utils/notify';

interface ShareStatusCardProps {
  balance: number;
}

function buildStatusMessage(balance: number): string {
  if (balance < 0) {
    return `📊 *Relatório App Finanças - Grupo 4*\n\n🚨 Alerta Vermelho!\nMeu saldo está negativo em R$ ${Math.abs(balance).toFixed(2)}.\nPreciso segurar os gastos urgente!`;
  }
  if (balance <= 150) {
    return `📊 *Relatório App Finanças - Grupo 4*\n\n⚠️ Atenção!\nMeu saldo está positivo, mas no limite: R$ ${balance.toFixed(2)}.\nTô quase no vermelho, hora de economizar!`;
  }
  return `📊 *Relatório App Finanças - Grupo 4*\n\n✅ Tudo sob controle!\nFechei o mês no azul com R$ ${balance.toFixed(2)} disponíveis.\nFinanças super saudáveis!`;
}

export default function ShareStatusCard({ balance }: ShareStatusCardProps) {
  const handleShareStatus = async () => {
    try {
      await Share.share({ message: buildStatusMessage(balance) });
    } catch (error) {
      notify('Erro', 'Erro ao compartilhar o status.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        Gere uma mensagem automática avisando se as suas contas estão no azul, quase no limite ou
        no vermelho!
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={handleShareStatus}>
        <Text style={styles.shareButtonText}>📤 Compartilhar Status</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  shareButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  shareButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
