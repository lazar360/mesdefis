import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChallengeHeader from "@/components/ChallengeHeader";
import PrimaryButton from "@/components/PrimaryButton";
import Statement from "@/components/Statement";

export default function FizzBuzzScreen() {
  // Valeur de la combo : le premier nombre de la liste
  const [startNumber, setStartNumber] = useState(2);
  // Saisie du nombre de fin : du texte, comme au 05
  const [endNumber, setEndNumber] = useState("");

  // Code du clic sur FizzBuzz : la procédure PL_FIZZ_BUZZ
  function handleFizzBuzz() {
    const lastNumber = Number(endNumber);
    let response = "";
    // POUR i = nNombreDebut _À_ SAI_Nombre_Fin : <= inclut le dernier nombre
    for (let i = startNumber; i <= lastNumber; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        response += `${i} - FizzBuzz\n`;
      } else if (i % 3 === 0) {
        response += `${i} - Fizz\n`;
      } else if (i % 5 === 0) {
        response += `${i} - Buzz\n`;
      } else {
        response += `${i}\n`;
      }
    }
    Alert.alert("Le Fizz Buzz", response);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <ChallengeHeader title="Le Fizz Buzz" />
      <Statement
        text={"Écris un programme qui affiche les nombres entre le 1er chiffre indiqué dans le champ de saisie 1 et le  2ème chiffre indiqué dans le champ de saisie 2 .\nMais pour les multiples de trois, affiche \"Fizz\" au lieu du nombre,\nEt pour les multiples de cinq, affiche \"Buzz\".\nPour les nombres qui sont à la fois des multiples de trois et de cinq, affiche \"FizzBuzz\""}
      />
      {/* La combo : ses éléments sont décrits dans le JSX, au lieu d'être ajoutés par ListeAjoute */}
      <View className="mt-6 bg-white">
        <Picker mode="dropdown" selectedValue={startNumber} onValueChange={(value) => setStartNumber(value)}>
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>
      </View>
      <TextInput
        className="mt-2 h-12 border border-gray-300 bg-white px-2 text-right"
        keyboardType="numeric"
        value={endNumber}
        onChangeText={(text) => setEndNumber(text)}
      />
      <PrimaryButton label="FizzBuzz" onPress={handleFizzBuzz} />
    </SafeAreaView>
  );
}
