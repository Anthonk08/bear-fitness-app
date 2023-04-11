import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const cards = [
"☀️","❄️","☁️","⚡","🌊","🌀",
//"🐸","🐶","🐺","🐯","🐮","🐎",
//"🌸","🌹","🌻","🍄","🌵","🍁",
];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if(selectedCards.length < 2)  return;
    if(board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 750);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if(selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  }

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{didPlayerWin() ? "GANASTE!! 🎉" : "GENIUS MEMORY 💭"}</Text>
        <Text style={styles.title}>MOVES: {score}</Text>
        <View style={styles.board}>
          {board.map((card, index) => {
            const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index)
            return (
              <Card 
                key={index}
                isTurnedOver={isTurnedOver}
                onPress={() => handleTapCard(index)}
              > 
                {card} 
              </Card>
            );
          })}
        </View>
        {didPlayerWin() && <TouchableOpacity style={styles.resetButton} onPress={resetGame}><Text style={styles.textResetButton}>NUEVO JUEGO</Text></TouchableOpacity>}
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 867.5,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#0f252a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 900,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  resetButton: {
    marginTop: 10,
    height: 50,
    width: 150,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#f0bc11',
    backgroundColor: '#0f252a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  textResetButton: {
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
  },
});

function shuffle(array) {
  for(let i = array.length -1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i+1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
