import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tire un nombre entre 1 et 100, comme Hasard(1,100) en WLangage
function drawSecretNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function GuessNumberScreen() {
  // État de l'écran : la saisie, et la fonction qui la modifie
  const [guess, setGuess] = useState("");

  // Le nombre secret est un état : on passe la fonction (sans parenthèses), React l'appelle une seule fois
  const [secretNumber, setSecretNumber] = useState(drawSecretNumber);
  // Nombre d'essais de la partie en cours
  const [attempts, setAttempts] = useState(0);

  // Code du bouton Oui : nouveau nombre secret, saisie vidée, compteur remis à zéro
  function handleReplay() {
    setSecretNumber(drawSecretNumber());
    setGuess("");
    setAttempts(0);
  }

  // Code du clic sur Deviner : une fonction déclarée dans le composant
  function handleGuess() {
    // La saisie est du texte : on la convertit en nombre avant de comparer
    const guessedNumber = Number(guess);
    // La nouvelle valeur n'arrive qu'au prochain affichage : on la calcule dans une constante
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (guessedNumber < secretNumber) {
      Alert.alert("Trop petit");
    } else if (guessedNumber > secretNumber) {
      Alert.alert("Trop grand");
    } else if (guessedNumber === secretNumber) {
      // Une seule alerte remplace Info("Tu as gagné") suivi de OuiNon("Veux-tu refaire une partie")
      Alert.alert("Tu as gagné ! Nombre d'essais : " + newAttempts, "Veux-tu refaire une partie", [
        { text: "Non" },
        { text: "Oui", onPress: handleReplay },
      ]);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      {/* En-tête : icône menu à gauche, titre centré dans la place restante */}
      <View className="flex-row items-center">
        <SymbolView name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }} size={32} tintColor="black" />
        <Text className="flex-1 text-center text-lg font-bold">Nombre à deviner</Text>
      </View>
      <Text className="mt-2 text-base">
        {"L'ordinateur choisit un nombre entre 1 et 100 au hasard\nTu indiques un nombre entre 1 et 100 dans la case en-dessous\nSi le nombre choisi par l'ordinateur est plus grand, une fenêtre indique \"trop petit\"\nSi le nombre choisi par l'ordinateur est plus petit, une fenêtre indique \"trop grand\"\nSi tu devines le nombre, une fenêtre indique \"Gagné\""}
      </Text>
      <TextInput
        className="mt-12 h-12 border border-gray-300 bg-white px-2 text-right"
        placeholder="Saisis un entier"
        keyboardType="numeric"
        value={guess}
        onChangeText={(text) => setGuess(text)}
      />
      {/* Bouton : fond bleu relevé sur la capture plan1 */}
      <Pressable className="mt-6 h-12 items-center justify-center rounded bg-[#075289]" onPress={handleGuess}>
        <Text className="text-white">Deviner</Text>
      </Pressable>
    </SafeAreaView>
  );
}
