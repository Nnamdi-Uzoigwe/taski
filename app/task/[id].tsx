import Text from "@/components/ui/Text";
import DateInput from "@/components/create/DateInput";
import { useTaskStore } from "@/store/taskStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const inputStyle = {
  fontSize: 16,
  paddingVertical: 12,
  paddingHorizontal: 12,
  includeFontPadding: false,
} as const;

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, updateTask, isLoading, error, clearError } = useTaskStore();

  const task = tasks.find((t) => t._id === id);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState<Date>(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );

  useEffect(() => {
    if (!task) {
      Alert.alert("Error", "Task not found.");
      router.back();
    }
  }, []);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please add a title for your task.");
      return;
    }
    const success = await updateTask(id, title.trim(), description.trim(), dueDate);
    if (success) {
      router.back();
    } else {
      Alert.alert("Failed to update task", error ?? "Something went wrong.");
      clearError();
    }
  };

  if (!task) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white px-6">

        {/* Header */}
        <View className="flex-row items-center gap-3 py-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <Text size="xl" weight="regular">Edit Task</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View className="mt-6 gap-2">
            <Text size="lg" weight="regular" className="text-gray-500">Title</Text>
            <TextInput
              placeholder="Task title..."
              className="border-2 border-gray-500 rounded-xl"
              style={inputStyle}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View className="mt-6 gap-2">
            <Text size="lg" weight="regular" className="text-gray-500">Description</Text>
            <TextInput
              placeholder="Task description..."
              className="border-2 border-gray-500 rounded-xl"
              multiline
              numberOfLines={4}
              style={{ ...inputStyle, height: 120, textAlignVertical: "top" }}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Due Date */}
          <View className="mt-6 gap-2">
            <Text size="lg" weight="regular" className="text-gray-500">Due Date</Text>
            <DateInput date={dueDate} onChange={setDueDate} />
          </View>

          {/* Completed badge */}
          <View className="mt-6 flex-row items-center gap-2">
            <MaterialIcons
              name={task.completed ? "check-box" : "check-box-outline-blank"}
              size={22}
              color={task.completed ? "#3b82f6" : "#9ca3af"}
            />
            <Text className={task.completed ? "text-blue-500" : "text-gray-400"} weight="regular">
              {task.completed ? "Completed" : "Not completed"}
            </Text>
          </View>

          {/* Save button */}
          <TouchableOpacity
            onPress={handleUpdate}
            disabled={isLoading}
            className="bg-blue-500 p-3 rounded-xl mt-8 mb-6"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl text-center" weight="regular">Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}