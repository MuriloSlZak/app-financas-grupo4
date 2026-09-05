import { StyleSheet, Text, View } from 'react-native';

import { UI } from '@/constants/ui';

export default function TeamCard() {
  return (
    <View style={styles.cardTeam}>
      <Text style={styles.cardTitleTeam}>👨‍💻 Sobre o App</Text>
      <Text style={styles.textTeam}>
        Desenvolvido com dedicação pelo Grupo 4 (Murilo e Ruan) para ajudar você a alcançar a
        liberdade financeira!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTeam: {
    backgroundColor: UI.colors.dark, // Fundo escuro para destacar a equipe
    padding: 20,
    borderRadius: UI.radius.lg,
    marginTop: 6,
    marginBottom: 30,
    width: '100%',
    maxWidth: 420,
    ...UI.shadow,
    shadowOpacity: 0.15,
  },
  cardTitleTeam: {
    fontSize: 17,
    fontWeight: '800',
    color: UI.colors.onDark,
    marginBottom: 8,
  },
  textTeam: {
    fontSize: 14,
    color: UI.colors.onDarkMuted,
    lineHeight: 22,
  },
});
