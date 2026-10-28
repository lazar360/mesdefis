import { Pressable, Text, View } from "react-native";

// Les choix proposés, le choix en cours, et la fonction appelée quand on touche un choix
type ChoiceSelectorProps = {
  choices: string[];
  selectedChoice: string;
  onSelect: (choice: string) => void;
};

// Le sélecteur : un bouton radio par choix, sur deux colonnes
export default function ChoiceSelector({ choices, selectedChoice, onSelect }: ChoiceSelectorProps) {
  return (
    <View className="mt-2 flex-row flex-wrap">
      {choices.map((choice) => (
        <Pressable key={choice} className="w-1/2 flex-row items-center gap-2 p-2" onPress={() => onSelect(choice)}>
          {/* Le rond : bleu et plein quand le choix est sélectionné */}
          <View
            className={
              choice === selectedChoice
                ? "h-6 w-6 items-center justify-center rounded-full border-2 border-[#075289]"
                : "h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400"
            }
          >
            {choice === selectedChoice && <View className="h-3 w-3 rounded-full bg-[#075289]" />}
          </View>
          <Text>{choice}</Text>
        </Pressable>
      ))}
    </View>
  );
}
