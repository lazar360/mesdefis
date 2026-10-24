import { Pressable, Text, TextInput, View } from "react-native";

export default function GuessNumberScreen() {
  return (
    <View>
      <Text>Nombre à deviner</Text>
      <Text>
        {"L'ordinateur choisit un nombre entre 1 et 100 au hasard\nTu indiques un nombre entre 1 et 100 dans la case en-dessous\nSi le nombre choisi par l'ordinateur est plus grand, une fenêtre indique \"trop petit\"\nSi le nombre choisi par l'ordinateur est plus petit, une fenêtre indique \"trop grand\"\nSi tu devines le nombre, une fenêtre indique \"Gagné\""}
      </Text>
      <TextInput placeholder="Saisis un entier" keyboardType="numeric" />
      <Pressable>
        <Text>Deviner</Text>
      </Pressable>
    </View>
  );
}
