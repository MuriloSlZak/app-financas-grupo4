import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#2C3E50', // Fundo escuro para destacar a equipe
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitleTeam: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textTeam: {
    fontSize: 14,
    color: '#D5D8DC',
    lineHeight: 22,
  },
});
