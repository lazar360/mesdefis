import { Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChallengeHeader from "@/components/ChallengeHeader";
import PrimaryButton from "@/components/PrimaryButton";
import Statement from "@/components/Statement";

export default function LongestWordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <ChallengeHeader title="Le Mot le plus long" />
      {/* Énoncé sur fond gris, comme sur la capture plan3 */}
      <Statement
        grayBackground
        text={"Écris un programme qui affiche le mot le plus long parmi une liste aléatoire indiquée dans le champ \"Les mots à trier\".\nTu devras respecter 2 contraintes :\n- Le premier tri devra être réalisé en parcourant une chaîne de caractères ;\n- Le second tri devra s'effectuer en parcourant un tableau."}
      />
      <Text className="mt-2">Les mots à trier</Text>
      <TextInput className="mt-1 h-24 border border-gray-300 bg-white p-2" multiline textAlignVertical="top" />
      {/* Pas encore de code au clic : une fonction vide */}
      <PrimaryButton label="Trouver le mot" onPress={() => {}} />
      {/* Ligne de l'interrupteur, centrée */}
      <View className="mt-4 flex-row items-center justify-center gap-2">
        <Text>Chaîne ou Tableau</Text>
        <Switch />
      </View>
      <TextInput className="mt-4 h-12 border border-gray-300 bg-white px-2" />
    </SafeAreaView>
  );
}
