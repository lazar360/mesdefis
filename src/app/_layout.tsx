import "../../global.css";
import { Drawer } from "expo-router/drawer";

import DrawerMenu from "@/components/DrawerMenu";

export default function RootLayout() {
  return (
    // En-tête masqué comme avec le Stack ; le volet prend 90 % de la largeur, comme FI_Menu
    <Drawer
      screenOptions={{ headerShown: false, drawerStyle: { width: "90%" } }}
      // Le contenu du volet : notre menu, à la place de la liste automatique
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      {/* Une ligne par route : le nom est celui du fichier de src/app, sans .tsx */}
      <Drawer.Screen name="index" />
      <Drawer.Screen name="fizzbuzz" />
      <Drawer.Screen name="longest-word" />
      <Drawer.Screen name="palindrome" />
    </Drawer>
  );
}
