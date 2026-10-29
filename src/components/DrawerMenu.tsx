import type { DrawerContentComponentProps } from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Une ligne du menu : l'icône (un composant), le libellé et la fonction du clic
type MenuRowProps = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
};

// Une ligne de la zone multiligne ZM_Menu : icône, libellé en gras, flèche à droite
function MenuRow({ icon, label, onPress }: MenuRowProps) {
  return (
    <Pressable className="h-12 flex-row items-center gap-2 border-b border-[#075289] px-2" onPress={onPress}>
      {icon}
      <Text className="flex-1 font-bold">{label}</Text>
      <SymbolView name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={24} tintColor="black" />
    </Pressable>
  );
}

// Le contenu du volet, identique à FI_Menu ; le Drawer lui passe navigation
export default function DrawerMenu({ navigation }: DrawerContentComponentProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea]">
      {/* CAS 1 : la ligne MENU referme simplement le volet */}
      <Pressable className="h-16 flex-row items-center border-b border-[#075289] px-2" onPress={() => navigation.closeDrawer()}>
        <Text className="flex-1 text-center text-xl font-bold">MENU</Text>
        <SymbolView name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={24} tintColor="black" />
      </Pressable>
      {/* CAS 2 à 5 : chaque ligne va sur sa route, le volet se referme tout seul */}
      <MenuRow
        icon={<SymbolView name={{ ios: "dice", android: "casino", web: "casino" }} size={28} tintColor="black" />}
        label="Nombre à deviner"
        onPress={() => navigation.navigate("index")}
      />
      <MenuRow
        icon={<SymbolView name={{ ios: "list.number", android: "format_list_numbered", web: "format_list_numbered" }} size={28} tintColor="black" />}
        label="FizzBuzz"
        onPress={() => navigation.navigate("fizzbuzz")}
      />
      <MenuRow
        icon={<SymbolView name={{ ios: "textformat", android: "text_fields", web: "text_fields" }} size={28} tintColor="black" />}
        label="Le Mot Le Plus Long"
        onPress={() => navigation.navigate("longest-word")}
      />
      <MenuRow
        icon={<SymbolView name={{ ios: "arrow.left.arrow.right", android: "swap_horiz", web: "swap_horiz" }} size={28} tintColor="black" />}
        label="Palindrome"
        onPress={() => navigation.navigate("palindrome")}
      />
      {/* CAS 6 : Quitter, sans action pour l'instant (c'est le challenge) */}
      <MenuRow
        icon={<SymbolView name={{ ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" }} size={28} tintColor="black" />}
        label="Quitter"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}
