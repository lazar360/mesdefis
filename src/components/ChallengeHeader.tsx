import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

// Les props : les paramètres du composant, avec leur type (title est une chaîne)
type ChallengeHeaderProps = {
  title: string;
};

// En-tête commun aux écrans : icône menu à gauche, titre reçu en paramètre
export default function ChallengeHeader({ title }: ChallengeHeaderProps) {
  return (
    <View className="flex-row items-center">
      <SymbolView name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }} size={32} tintColor="black" />
      <Text className="flex-1 text-center text-lg font-bold">{title}</Text>
    </View>
  );
}
