// components/done/DoneCard.tsx
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatTaskTitle } from "@/lib/utils";
import Text from "../ui/Text";
import { Task } from "@/store/taskStore";

interface Props {
  task: Task;
  onDelete: () => void;
}

export default function DoneCard({ task, onDelete }: Props) {
  return (
    <View className="bg-gray-100 p-4 rounded-xl flex-row justify-between">
      <View className="flex-row gap-2 items-center flex-1">
        <MaterialIcons name="check-box" size={28} color="#d1d5db" />
        <Text className="text-gray-400 flex-1" weight="regular">
          {formatTaskTitle(task.title)}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialCommunityIcons name="delete" size={24} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}