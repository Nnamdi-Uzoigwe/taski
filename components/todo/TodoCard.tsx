
import {
  Alert,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useState } from "react";
import Text from "../ui/Text";
import Checkbox from "../ui/Checkbox";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Task = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  task: Task;
};

export default function TodoCard({ task }: Props) {
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMenuOpen(!menuOpen);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    Alert.alert("Delete", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Deleted", task.id),
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        className="bg-gray-100 mb-1 p-4 rounded-xl gap-3"
      >
        <View className="flex-row justify-between items-center">
          <Checkbox checked={checked} onPress={() => setChecked(!checked)} />

          <Text size="lg" weight="semibold" className="flex-1 mx-3">
            {task.title}
          </Text>

          <TouchableOpacity onPress={toggleMenu} hitSlop={8}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {expanded && (
          <Text className="text-gray-500">{task.description}</Text>
        )}
      </TouchableOpacity>

      {menuOpen && (
        <View className="bg-white rounded-xl mb-4 mx-2 overflow-hidden border border-gray-100">
          <TouchableOpacity
            onPress={() => Alert.alert("Details", task.description)}
            className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100"
          >
            <MaterialIcons name="info-outline" size={20} color="#3b82f6" />
            <Text className="text-blue-500">See details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="flex-row items-center gap-3 px-4 py-3"
          >
            <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
            <Text className="text-red-500">Delete task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}