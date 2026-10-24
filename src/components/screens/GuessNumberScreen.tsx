import { SymbolView } from "expo-symbols";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuessNumberScreen() {
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
      />
      {/* Bouton : fond bleu relevé sur la capture plan1 */}
      <Pressable className="mt-6 h-12 items-center justify-center rounded bg-[#075289]">
        <Text className="text-white">Deviner</Text>
      </Pressable>
    </SafeAreaView>
  );
}
