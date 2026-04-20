import { TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/Text";

type Props = {
  checked: boolean;
  onPress: () => void;
};

export default function Checkbox({ checked, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-3">
      <View className={`w-5 h-5 rounded border-2 items-center justify-center ${
        checked ? "bg-blue-400 border-blue-400" : "border-gray-400"
      }`}>
        {checked && <Text className="text-white text-xs">✓</Text>}
      </View>
    </TouchableOpacity>
  );
}