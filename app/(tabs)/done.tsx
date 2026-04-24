// // app/(tabs)/done.tsx
// import DoneCard from "@/components/done/DoneCard";
// import Header from "@/components/ui/Header";
// import Text from "@/components/ui/Text";
// import { useTaskStore } from "@/store/taskStore";
// import { useRouter } from "expo-router";
// import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Done() {
//   const { tasks, deleteTask } = useTaskStore();
//   const completedTasks = tasks.filter((t) => t.completed);
//   const isEmpty = completedTasks.length === 0;
//   const router = useRouter();

//   const handleDeleteAll = () => {
//     Alert.alert("Delete All", "Are you sure you want to delete all completed tasks?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete All",
//         style: "destructive",
//         onPress: () => completedTasks.forEach((t) => deleteTask(t._id)),
//       },
//     ]);
//   };

//   return (
//     <SafeAreaView className="px-6 bg-white flex-1">
//       <Header />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View className="mt-4 mb-10 flex-row justify-between items-center">
//           <Text weight="regular" size="xl">Completed Tasks</Text>
//           {!isEmpty && (
//             <TouchableOpacity onPress={handleDeleteAll}>
//               <Text className="text-red-500" weight="regular">Delete All</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <View className="gap-3">
//           {isEmpty ? (
//             <View className="items-center justify-center py-16 gap-4">
//               <Image
//                 source={require("../../assets/images/empty-task.png")}
//                 style={{ width: 100, height: 100 }}
//                 resizeMode="contain"
//               />
//               <View className="items-center gap-1">
//                 <Text size="lg" weight="semibold">No completed tasks yet</Text>
//                 <Text className="text-gray-400 text-center">
//                   Complete a task and it'll show up here.
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => router.push("/(tabs)/create")}
//                 className="bg-blue-500 px-6 py-3 rounded-xl mt-2"
//               >
//                 <Text className="text-white" weight="semibold">+ Create Task</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             completedTasks.map((task) => (
//               <DoneCard key={task._id} task={task} onDelete={() => deleteTask(task._id)} />
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import DoneCard from "@/components/done/DoneCard";
import Header from "@/components/ui/Header";
import Text from "@/components/ui/Text";
import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "expo-router";
import { Alert, Image, ScrollView, TouchableOpacity, View, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

export default function Done() {
  const { tasks, deleteTask, fetchTasks, isLoading, error } = useTaskStore();
  const completedTasks = tasks.filter((t) => t.completed);
  const isEmpty = completedTasks.length === 0;
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const handleDeleteAll = () => {
    Alert.alert("Delete All", "Are you sure you want to delete all completed tasks?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete All",
        style: "destructive",
        onPress: () => completedTasks.forEach((t) => deleteTask(t._id)),
      },
    ]);
  };

  return (
    <SafeAreaView className="px-6 bg-white flex-1">
      <Header />

      {isLoading && !refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-4">
          <MaterialIcons name="wifi-off" size={48} color="#d1d5db" />
          <View className="items-center gap-1">
            <Text size="lg" weight="semibold">Couldn't load tasks</Text>
            <Text className="text-gray-400 text-center">{error}</Text>
          </View>
          <TouchableOpacity
            onPress={fetchTasks}
            className="bg-blue-500 px-6 py-3 rounded-xl"
          >
            <Text className="text-white" weight="semibold">Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="mt-4 mb-10 flex-row justify-between items-center">
            <Text weight="regular" size="xl">Completed Tasks</Text>
            {!isEmpty && (
              <TouchableOpacity onPress={handleDeleteAll}>
                <Text className="text-red-500" weight="regular">Delete All</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="gap-3">
            {isEmpty ? (
              <View className="items-center justify-center py-16 gap-4">
                <Image
                  source={require("../../assets/images/empty-task.png")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <View className="items-center gap-1">
                  <Text size="lg" weight="semibold">No completed tasks yet</Text>
                  <Text className="text-gray-400 text-center">
                    Complete a task and it'll show up here.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/create")}
                  className="bg-blue-500 px-6 py-3 rounded-xl mt-2"
                >
                  <Text className="text-white" weight="semibold">+ Create Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              completedTasks.map((task) => (
                <DoneCard key={task._id} task={task} onDelete={() => deleteTask(task._id)} />
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}