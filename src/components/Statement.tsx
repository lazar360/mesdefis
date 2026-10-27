import { Text } from "react-native";

type StatementProps = {
  text: string;
};

// L'énoncé d'un challenge
export default function Statement({ text }: StatementProps) {
  return <Text className="mt-2 text-base">{text}</Text>;
}
