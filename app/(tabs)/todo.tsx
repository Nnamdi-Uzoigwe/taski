import { Image, ScrollView, TouchableOpacity, View, ActivityIndicator, RefreshControl } from "react-native";
import Text from "@/components/ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoCard from "@/components/todo/TodoCard";
import Header from "@/components/ui/Header";
import { useRouter } from "expo-router";
import { useTaskStore } from "@/store/taskStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type SortOption = "newest" | "oldest" | "dueDate";
type FilterOption = "all" | "active" | "overdue";

export default function Todo() {
  const router = useRouter();
  const { tasks, fetchTasks, isLoading, error } = useTaskStore();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => { fetchTasks(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const now = new Date();

  const filteredTasks = tasks
    .filter((t) => !t.completed)
    .filter((t) => {
      if (filter === "active") return !t.dueDate || new Date(t.dueDate) >= now;
      if (filter === "overdue") return t.dueDate && new Date(t.dueDate) < now;
      return true;
    })
    .sort((a, b) => {
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const isEmpty = filteredTasks.length === 0;
  const incompleteTasks = tasks.filter((t) => !t.completed);

  const SortPill = ({ label, value }: { label: string; value: SortOption }) => (
    <TouchableOpacity
      onPress={() => setSort(value)}
      className={`px-3 py-1 rounded-full border ${sort === value ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
    >
      <Text style={{ fontSize: 13 }} className={sort === value ? "text-white" : "text-gray-500"}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const FilterPill = ({ label, value }: { label: string; value: FilterOption }) => (
    <TouchableOpacity
      onPress={() => setFilter(value)}
      className={`px-3 py-1 rounded-full border ${filter === value ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
    >
      <Text style={{ fontSize: 13 }} className={filter === value ? "text-white" : "text-gray-500"}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
          <TouchableOpacity onPress={fetchTasks} className="bg-blue-500 px-6 py-3 rounded-xl">
            <Text className="text-white" weight="semibold">Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Hero */}
          <View className="mt-4 mb-6 flex gap-2">
            <Text size="2xl" weight="regular">
              Welcome,{" "}
              <Text size="2xl" weight="regular" className="text-blue-500">
                {user?.name ?? "there"}
              </Text>
            </Text>
            <Text className="text-gray-500">
              {incompleteTasks.length === 0
                ? "You have no tasks yet. Start by creating one!"
                : <>You've got <Text weight="regular">{incompleteTasks.length}</Text> task{incompleteTasks.length !== 1 ? "s" : ""} to do.</>
              }
            </Text>
          </View>

          {/* Filter pills */}
          <View className="flex-row gap-2 mb-3">
            <FilterPill label="All" value="all" />
            <FilterPill label="Active" value="active" />
            <FilterPill label="Overdue" value="overdue" />
          </View>

          {/* Sort pills */}
          <View className="flex-row gap-2 mb-6">
            <SortPill label="Newest" value="newest" />
            <SortPill label="Oldest" value="oldest" />
            <SortPill label="Due date" value="dueDate" />
          </View>

          {/* Tasks */}
          <View className="gap-3">
            {isEmpty ? (
              <View className="items-center justify-center py-16 gap-4">
                <Image
                  source={require("../../assets/images/empty-task.png")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <View className="items-center gap-1">
                  <Text size="lg" weight="semibold">No tasks here</Text>
                  <Text className="text-gray-400 text-center">
                    {filter === "overdue"
                      ? "No overdue tasks. You're on top of things!"
                      : filter === "active"
                      ? "No active tasks found."
                      : "You're all clear! Add a task to get started."}
                  </Text>
                </View>
                {filter === "all" && (
                  <TouchableOpacity
                    onPress={() => router.push("/(tabs)/create")}
                    className="bg-blue-500 px-6 py-3 rounded-xl mt-2"
                  >
                    <Text className="text-white" weight="semibold">+ Create Task</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              filteredTasks.map((task) => <TodoCard key={task._id} task={task} />)
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}