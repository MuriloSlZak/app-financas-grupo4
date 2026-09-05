import { Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { UI } from '@/constants/ui';
import { formatBRL } from '@/utils/format';
import { notify } from '@/utils/notify';

interface ShareStatusCardProps {
  balance: number;
}

type Status = {
  emoji: string;
  label: string;
  hint: string;
  color: string;
  background: string;
};

function getStatus(balance: number): Status {
  if (balance < 0) {
    return {
      emoji: '🚨',
      label: 'No vermelho',
      hint: 'Seu saldo está negativo. Hora de segurar os gastos!',
      color: UI.colors.danger,
      background: UI.colors.dangerSoft,
    };
  }
  if (balance <= 150) {
    return {
      emoji: '⚠️',
      label: 'Quase no limite',
      hint: 'Saldo positivo, mas apertado. Vale economizar um pouco.',
      color: UI.colors.warning,
      background: UI.colors.warningSoft,
    };
  }
  return {
    emoji: '✅',
    label: 'No azul',
    hint: 'Tudo sob controle. Finanças saudáveis!',
    color: UI.colors.success,
    background: UI.colors.successSoft,
  };
}

function buildStatusMessage(balance: number): string {
  if (balance < 0) {
    return `📊 *Relatório App Finanças - Grupo 4*\n\n🚨 Alerta Vermelho!\nMeu saldo está negativo em ${formatBRL(Math.abs(balance))}.\nPreciso segurar os gastos urgente!`;
  }
  if (balance <= 150) {
    return `📊 *Relatório App Finanças - Grupo 4*\n\n⚠️ Atenção!\nMeu saldo está positivo, mas no limite: ${formatBRL(balance)}.\nTô quase no vermelho, hora de economizar!`;
  }
  return `📊 *Relatório App Finanças - Grupo 4*\n\n✅ Tudo sob controle!\nFechei o mês no azul com ${formatBRL(balance)} disponíveis.\nFinanças super saudáveis!`;
}

export default function ShareStatusCard({ balance }: ShareStatusCardProps) {
  const status = getStatus(balance);

  const handleShareStatus = async () => {
    const message = buildStatusMessage(balance);
    try {
      if (Platform.OS === 'web') {
        const nav: any = typeof navigator !== 'undefined' ? navigator : undefined;
        if (nav?.share) {
          await nav.share({ text: message });
          return;
        }
        if (nav?.clipboard?.writeText) {
          await nav.clipboard.writeText(message);
          notify('Copiado!', 'A mensagem foi copiada. É só colar no WhatsApp.');
          return;
        }
      }
      await Share.share({ message });
    } catch (error: any) {
      // Usuário fechou a janela de compartilhar: não é erro.
      if (error?.name === 'AbortError') return;
      notify('Erro', 'Não foi possível compartilhar o status.');
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.statusBadge, { backgroundColor: status.background }]}>
        <Text style={[styles.statusBadgeText, { color: status.color }]}>
          {status.emoji} {status.label}
        </Text>
      </View>

      <Text style={styles.balanceLabel}>Saldo atual</Text>
      <Text style={[styles.balanceValue, { color: status.color }]}>{formatBRL(balance)}</Text>
      <Text style={styles.hint}>{status.hint}</Text>

      <View style={styles.divider} />

      <Text style={styles.text}>
        Gere uma mensagem automática avisando se as suas contas estão no azul, quase no limite ou
        no vermelho.
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={handleShareStatus} activeOpacity={0.85}>
        <Text style={styles.shareButtonText}>📤 Compartilhar status</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI.colors.card,
    padding: 24,
    borderRadius: UI.radius.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: UI.colors.border,
    ...UI.shadow,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: UI.radius.pill,
    marginBottom: 16,
  },
  statusBadgeText: { fontSize: 13, fontWeight: '800' },
  balanceLabel: {
    fontSize: 12,
    color: UI.colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  balanceValue: { fontSize: 32, fontWeight: '800', marginTop: 4 },
  hint: {
    fontSize: 14,
    color: UI.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: UI.colors.border,
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    color: UI.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 21,
  },
  shareButton: {
    backgroundColor: UI.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  shareButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
