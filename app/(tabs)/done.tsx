import DoneCard from "@/components/done/DoneCard";
import Header from "@/components/ui/Header";
import Text from "@/components/ui/Text";
import { useRouter } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function Done() {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Design a Graphic for Novtryx",
      description: "Design a Graphic for Novtryx CEO today.",
    },
    {
      id: "2",
      title: "Complete Chapters 2 and 3 of Micheal's project",
      description: "I need to complete Chapter 2 and 3 of Micheal's work today so that by next week, I will be done with his work.",
    },
  ];
  const isEmpty = mockTasks.length === 0;
  const router = useRouter();
  return (
    <SafeAreaView className="px-6 bg-white flex-1">
      <Header />
    
    <ScrollView showsVerticalScrollIndicator={false}>

      <View className="mt-4 mb-10 flex-row justify-between items-center">
        <Text weight="regular" size="xl">
          Completed Tasks
        </Text>

        <TouchableOpacity>
          <Text className="text-red-500" weight="regular">
            Delete All
          </Text>
        </TouchableOpacity>
      </View>

      {/* List section */}
      
        <View className="gap-3">
          {isEmpty ? (
            <View className="items-center justify-center py-16 gap-4">
              <Image
                source={require("../../assets/images/empty-task.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
              <View className="items-center gap-1">
                <Text size="lg" weight="semibold">
                  No completed tasks yet
                </Text>
                <Text className="text-gray-400 text-center">
                  You're all clear! Add a task to get started.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/create")}
                className="bg-blue-500 px-6 py-3 rounded-xl mt-2"
              >
                <Text className="text-white" weight="semibold">
                  + Create Task
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            mockTasks.map((task) => (
              <DoneCard key={task.id} title={task.title} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
