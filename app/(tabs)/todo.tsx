import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks } from "@/constants/tasks";
import TodoCard from "@/components/todo/TodoCard";
import Header from "@/components/ui/Header";
import { useRouter } from "expo-router";

export default function Todo() {
  const username = "John";
  type Task = {
  id: string;
  title: string;
  description: string;
};

const mockTasks: Task[] = [];
  const isEmpty = mockTasks.length === 0;
  const router = useRouter();
  return (
    <SafeAreaView className="px-6 bg-white flex-1">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="my-10 flex gap-4">
          <Text size="2xl" weight="regular">
            Welcome,{" "}
            <Text size="2xl" weight="regular" className="text-blue-500">
              {username}
            </Text>
          </Text>
          <Text className="text-gray-500">
            {isEmpty
              ? "You have no tasks yet. Start by creating one!"
              : <>You've got <Text weight="regular">{tasks.length}</Text> tasks to do.</>
            }
          </Text>
        </View>

        {/* Tasks Section */}
        <View className="gap-3">
          {isEmpty ? (
            <View className="items-center justify-center py-16 gap-4">
              <Image
                source={require("../../assets/images/empty-task.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
              <View className="items-center gap-1">
                <Text size="lg" weight="semibold">No tasks yet</Text>
                <Text className="text-gray-400 text-center">
                  You're all clear! Add a task to get started.
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/(tabs)/create")} className="bg-blue-500 px-6 py-3 rounded-xl mt-2">
                <Text className="text-white" weight="semibold">+ Create Task</Text>
              </TouchableOpacity>
            </View>
          ) : (
            mockTasks.map((task) => (
              <TodoCard key={task.id} task={task} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}