import { SymbolView } from "expo-symbols";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LongestWordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea] p-2">
      <View className="flex-row items-center">
        <SymbolView name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }} size={32} tintColor="black" />
        <Text className="flex-1 text-center text-lg font-bold">Le Mot le plus long</Text>
      </View>
      {/* Énoncé sur fond gris, comme sur la capture plan3 */}
      <Text className="mt-2 bg-[#e0e0e0] p-2 text-base">
        {"Écris un programme qui affiche le mot le plus long parmi une liste aléatoire indiquée dans le champ \"Les mots à trier\".\nTu devras respecter 2 contraintes :\n- Le premier tri devra être réalisé en parcourant une chaîne de caractères ;\n- Le second tri devra s'effectuer en parcourant un tableau."}
      </Text>
      <Text className="mt-2">Les mots à trier</Text>
      <TextInput className="mt-1 h-24 border border-gray-300 bg-white p-2" multiline textAlignVertical="top" />
      <Pressable className="mt-2 h-12 items-center justify-center rounded bg-[#075289]">
        <Text className="text-white">Trouver le mot</Text>
      </Pressable>
      {/* Ligne de l'interrupteur, centrée */}
      <View className="mt-4 flex-row items-center justify-center gap-2">
        <Text>Chaîne ou Tableau</Text>
        <Switch />
      </View>
      <TextInput className="mt-4 h-12 border border-gray-300 bg-white px-2" />
    </SafeAreaView>
  );
}
