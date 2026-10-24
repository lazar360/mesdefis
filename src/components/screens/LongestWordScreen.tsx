import { Pressable, Switch, Text, TextInput, View } from "react-native";

export default function LongestWordScreen() {
  return (
    <View>
      <Text>Le Mot le plus long</Text>
      <Text>
        {"Écris un programme qui affiche le mot le plus long parmi une liste aléatoire indiquée dans le champ \"Les mots à trier\".\nTu devras respecter 2 contraintes :\n- Le premier tri devra être réalisé en parcourant une chaîne de caractères ;\n- Le second tri devra s'effectuer en parcourant un tableau."}
      </Text>
      <Text>Les mots à trier</Text>
      <TextInput multiline />
      <Pressable>
        <Text>Trouver le mot</Text>
      </Pressable>
      <Text>Chaîne ou Tableau</Text>
      <Switch />
      <TextInput />
    </View>
  );
}
