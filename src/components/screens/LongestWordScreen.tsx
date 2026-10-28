import { useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChallengeHeader from "@/components/ChallengeHeader";
import PrimaryButton from "@/components/PrimaryButton";
import Statement from "@/components/Statement";

// Texte de départ : GénèreLorem(50) n'existe pas en JavaScript, on l'écrit dans le fichier
const startText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat";

export default function LongestWordScreen() {
  // Les mots à trier
  const [wordsToSort, setWordsToSort] = useState(startText);
  // L'interrupteur : activé = parcours de chaîne, désactivé = parcours de tableau
  const [browseString, setBrowseString] = useState(true);
  // La réponse affichée sous l'interrupteur
  const [answer, setAnswer] = useState("");

  // Code du clic sur Trouver le mot : la procédure PL_TROUVER_LE_MOT
  function handleFindWord() {
    let longestWord = "";
    let previousLength = 0;
    if (browseString) {
      // Parcours de chaîne : POUR TOUTE CHAÎNE mot DE … SÉPARÉE PAR " "
      for (const word of wordsToSort.split(" ")) {
        if (word.trim().length > previousLength) {
          longestWord = word;
          previousLength = word.trim().length;
        }
      }
    } else {
      // Parcours de tableau : on construit d'abord le tableau, comme ChaîneVersTableau
      const wordArray = wordsToSort.split(" ");
      // POUR TOUT motDuTableau DE tabTableauATrier
      for (const wordOfArray of wordArray) {
        if (wordOfArray.trim().length > previousLength) {
          longestWord = wordOfArray;
          previousLength = wordOfArray.trim().length;
        }
      }
    }
    // SAI_Reponse = sLeMotLePlusLong
    setAnswer(longestWord);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <ChallengeHeader title="Le Mot le plus long" />
      {/* Énoncé sur fond gris, comme sur la capture plan3 */}
      <Statement
        grayBackground
        text={"Écris un programme qui affiche le mot le plus long parmi une liste aléatoire indiquée dans le champ \"Les mots à trier\".\nTu devras respecter 2 contraintes :\n- Le premier tri devra être réalisé en parcourant une chaîne de caractères ;\n- Le second tri devra s'effectuer en parcourant un tableau."}
      />
      <Text className="mt-2">Les mots à trier</Text>
      <TextInput
        className="mt-1 h-24 border border-gray-300 bg-white p-2"
        multiline
        textAlignVertical="top"
        value={wordsToSort}
        onChangeText={(text) => setWordsToSort(text)}
      />
      <PrimaryButton label="Trouver le mot" onPress={handleFindWord} />
      {/* Ligne de l'interrupteur, centrée */}
      <View className="mt-4 flex-row items-center justify-center gap-2">
        <Text>Chaîne ou Tableau</Text>
        <Switch value={browseString} onValueChange={(value) => setBrowseString(value)} />
      </View>
      {/* La réponse : en lecture seule, elle change avec l'état */}
      <TextInput className="mt-4 h-12 border border-gray-300 bg-white px-2" editable={false} value={answer} />
    </SafeAreaView>
  );
}
