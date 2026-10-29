import { useNavigation } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";

// Les props : les paramètres du composant, avec leur type (title est une chaîne)
type ChallengeHeaderProps = {
  title: string;
};

// En-tête commun aux écrans : icône menu à gauche, titre reçu en paramètre
export default function ChallengeHeader({ title }: ChallengeHeaderProps) {
  // Le navigateur de l'écran : ici, le Drawer
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center">
      {/* Clic sur image menu : FenCoulissanteVisible(fcGauche,Vrai) */}
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <SymbolView name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }} size={32} tintColor="black" />
      </Pressable>
      <Text className="flex-1 text-center text-lg font-bold">{title}</Text>
    </View>
  );
}
