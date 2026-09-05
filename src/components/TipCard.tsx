import { StyleSheet, Text, View } from 'react-native';

import { UI } from '@/constants/ui';

interface TipCardProps {
  title: string;
  text: string;
}

export default function TipCard({ title, text }: TipCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI.colors.card,
    padding: 20,
    borderRadius: UI.radius.lg,
    marginBottom: 14,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: UI.colors.border,
    borderLeftWidth: 5,
    borderLeftColor: UI.colors.primary, // Detalhe azul na lateral
    ...UI.shadow,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: UI.colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 23,
  },
});
