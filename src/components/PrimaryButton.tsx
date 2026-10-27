import { Pressable, Text } from "react-native";

// Deux props : le texte du bouton, et la fonction à appeler au clic
type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

// Le bouton bleu commun aux écrans
export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable className="mt-4 h-12 items-center justify-center rounded bg-[#075289]" onPress={onPress}>
      <Text className="text-white">{label}</Text>
    </Pressable>
  );
}
