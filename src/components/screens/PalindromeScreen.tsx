import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChallengeHeader from "@/components/ChallengeHeader";
import ChoiceSelector from "@/components/ChoiceSelector";
import PrimaryButton from "@/components/PrimaryButton";
import Statement from "@/components/Statement";

// Une ligne du résultat : le mot, et si c'est un palindrome
type PalindromeResult = {
  word: string;
  isPalindrome: boolean;
};

// État de départ : un tableau vide, déjà typé (aucun résultat avant le premier clic)
const noResults: PalindromeResult[] = [];

// Les mots à tester, séparés par des virgules (ceux de l'énoncé)
const wordList = "ressasser, kayak, niveau, radar, chat, arbre, lumineux, étoile, soleil";

// Vrai si le mot se lit dans les deux sens
function checkPalindrome(wordToTest: string) {
  // Variante : on retourne le mot (découpé en lettres, inversé, recollé) et on compare
  return wordToTest === wordToTest.split("").reverse().join("");
}

export default function PalindromeScreen() {
  // Les résultats affichés à l'écran
  const [results, setResults] = useState(noResults);
  // Le mode d'affichage choisi dans le sélecteur
  const [displayMode, setDisplayMode] = useState("Saisie");

  // Le texte de la saisie, recalculé à chaque affichage : map fabrique une phrase par résultat
  const resultText = results
    .map((result) => "'" + result.word + "'" + (result.isPalindrome ? " est un palindrome" : " n'est pas un palindrome"))
    .join("\n");

  // Code du clic sur Trouver les palindromes : la procédure PL_TROUVER_PALINDROME
  function handleFindPalindromes() {
    // Le tableau des résultats : un objet { word, isPalindrome } par mot
    const newResults: PalindromeResult[] = [];
    // POUR TOUTE CHAÎNE mot DE sMalisteDeMots SÉPARÉE PAR "," : split découpe la chaîne
    for (const word of wordList.split(",")) {
      // trim enlève les espaces autour du mot, comme SansEspace
      const wordToTest = word.trim();
      newResults.push({ word: wordToTest, isPalindrome: checkPalindrome(wordToTest) });
    }
    // Un nouveau tableau remplace l'ancien : rien à vider avant
    setResults(newResults);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <ChallengeHeader title="Palindrome" />
      <Statement
        grayBackground
        text={"Un palindrome est une chaîne de caractère qui se lit dans les deux sens.\nVotre défi est tester les mots suivants : ressasser, kayak, niveau, radar, chat, arbre, lumineux, étoile, soleil.\nIl faut afficher les mots dans la zone de saisie.\nSelon un autre champ (boutons radio, bouton segmenté,...),  il faut afficher les mots dans :\n1/ un champ de saisie ;\n2/ un champ table avec deux colonnes : le nom et si c'est un palindrome ;\n3/ un champ zone répétée avec au moins 2 zones : mot et palindrome."}
      />
      <ChoiceSelector
        choices={["Saisie", "Zone Répétée", "Table"]}
        selectedChoice={displayMode}
        onSelect={(choice) => setDisplayMode(choice)}
      />
      {/* Un seul des trois champs existe à la fois : les deux autres ne sont pas cachés, ils ne sont pas dessinés */}
      {/* La saisie : un texte multiligne, en lecture seule */}
      {displayMode === "Saisie" && (
        <TextInput
          className="mt-2 flex-1 border border-gray-300 bg-white p-2"
          multiline
          editable={false}
          textAlignVertical="top"
          value={resultText}
        />
      )}
      {/* La zone répétée : tout le tableau dans data, et renderItem décrit une seule ligne */}
      {displayMode === "Zone Répétée" && (
        <FlatList
          className="mt-2 flex-1 border border-gray-400"
          data={results}
          // La clé unique de chaque ligne : le mot
          keyExtractor={(item) => item.word}
          renderItem={({ item }) => (
            <View className="h-16 flex-row items-center justify-between border-b border-gray-300 px-6">
              <Text>{item.word}</Text>
              {/* L'image de la ligne dépend de la donnée : coche ou croix */}
              {item.isPalindrome ? (
                <SymbolView name={{ ios: "checkmark", android: "check", web: "check" }} size={32} tintColor="blue" />
              ) : (
                <SymbolView name={{ ios: "xmark", android: "close", web: "close" }} size={32} tintColor="red" />
              )}
            </View>
          )}
        />
      )}
      {/* La table : la même FlatList, avec une ligne d'en-tête et deux colonnes */}
      {displayMode === "Table" && (
        <FlatList
          className="mt-2 flex-1 border border-gray-400 bg-white"
          data={results}
          keyExtractor={(item) => item.word}
          ListHeaderComponent={
            <View className="flex-row border-b border-gray-400 bg-[#e0e0e0]">
              <Text className="flex-1 p-2 font-bold">Mot</Text>
              <Text className="w-28 p-2 text-center font-bold">Réponse</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center border-b border-gray-300">
              <Text className="flex-1 p-2">{item.word}</Text>
              <View className="w-28 items-center">
                {item.isPalindrome ? (
                  <SymbolView name={{ ios: "checkmark", android: "check", web: "check" }} size={24} tintColor="blue" />
                ) : (
                  <SymbolView name={{ ios: "xmark", android: "close", web: "close" }} size={24} tintColor="red" />
                )}
              </View>
            </View>
          )}
        />
      )}
      <PrimaryButton label="Trouver les palindromes" onPress={handleFindPalindromes} />
    </SafeAreaView>
  );
}
