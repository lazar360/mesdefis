import { Text } from "react-native";

// grayBackground est facultatif (le ? après le nom) : sans lui, l'énoncé n'a pas de fond
type StatementProps = {
  text: string;
  grayBackground?: boolean;
};

// L'énoncé d'un challenge
export default function Statement({ text, grayBackground }: StatementProps) {
  return <Text className={grayBackground ? "mt-2 bg-[#e0e0e0] p-2 text-base" : "mt-2 text-base"}>{text}</Text>;
}
