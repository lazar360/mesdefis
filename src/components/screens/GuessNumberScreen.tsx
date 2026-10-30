import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChallengeHeader from "@/components/ChallengeHeader";
import PrimaryButton from "@/components/PrimaryButton";
import Statement from "@/components/Statement";
import { addGame, getGames, type Game } from "@/db/database";

// État de départ : un tableau vide, déjà typé (aucune partie au lancement)
const noGames: Game[] = [];

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
  // Les dernières parties gagnées, la plus récente en premier
  const [games, setGames] = useState(noGames);

  // Exécuté une seule fois, à l'ouverture de l'écran (le [] à la fin) : charge l'historique
  useEffect(() => {
    // La fonction passée à useEffect ne peut pas être async : on en déclare une dedans
    async function load() {
      setGames(await getGames());
    }
    load();
  }, []);

  // Code du bouton Oui : nouveau nombre secret, saisie vidée, compteur remis à zéro
  function handleReplay() {
    setSecretNumber(drawSecretNumber());
    setGuess("");
    setAttempts(0);
  }

  // Code du clic sur Deviner : async, parce qu'il attend la base de données
  async function handleGuess() {
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
      // Enregistre la partie dans la table, puis relit toute la table dans l'état
      await addGame(newAttempts);
      setGames(await getGames());
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <ChallengeHeader title="Nombre à deviner" />
      <Statement
        text={"L'ordinateur choisit un nombre entre 1 et 100 au hasard\nTu indiques un nombre entre 1 et 100 dans la case en-dessous\nSi le nombre choisi par l'ordinateur est plus grand, une fenêtre indique \"trop petit\"\nSi le nombre choisi par l'ordinateur est plus petit, une fenêtre indique \"trop grand\"\nSi tu devines le nombre, une fenêtre indique \"Gagné\""}
      />
      <TextInput
        className="mt-12 h-12 border border-gray-300 bg-white px-2 text-right"
        placeholder="Saisis un entier"
        keyboardType="numeric"
        value={guess}
        onChangeText={(text) => setGuess(text)}
      />
      <PrimaryButton label="Deviner" onPress={handleGuess} />
      {/* Ajout par rapport à plan1 : l'historique des parties gagnées */}
      <Text className="mt-4 text-base font-bold">Dernières parties</Text>
      <FlatList
        className="mt-2 flex-1 border border-gray-400 bg-white"
        data={games}
        // La clé unique de chaque ligne : l'identifiant de la partie
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View className="flex-row justify-between border-b border-gray-300 p-2">
            <Text>{item.played_at}</Text>
            <Text>{item.attempts} essais</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
