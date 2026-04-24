// import {
//   Alert,
//   TouchableOpacity,
//   View,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from "react-native";
// import { useState } from "react";
// import Text from "../ui/Text";
// import Checkbox from "../ui/Checkbox";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useTaskStore, Task } from "@/store/taskStore";
// import { useRouter } from "expo-router";

// if (Platform.OS === "android") {
//   UIManager.setLayoutAnimationEnabledExperimental?.(true);
// }

// type Props = {
//   task: Task;
// };

// export default function TodoCard({ task }: Props) {
//   const [expanded, setExpanded] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { toggleComplete, deleteTask } = useTaskStore();
//   const router = useRouter();

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded(!expanded);
//   };

//   const toggleMenu = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setMenuOpen(!menuOpen);
//   };

//   const handleDelete = () => {
//     setMenuOpen(false);
//     Alert.alert("Delete", "Are you sure you want to delete this task?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => deleteTask(task._id),
//       },
//     ]);
//   };

//   const handleDetails = () => {
//     setMenuOpen(false);
//     router.push(`/task/${task._id}`);
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={toggleExpand}
//         activeOpacity={0.8}
//         className="bg-gray-100 mb-1 p-4 rounded-xl gap-3"
//       >
//         <View className="flex-row justify-between items-center">
//           <Checkbox
//             checked={task.completed}
//             onPress={() => toggleComplete(task._id)}
//           />
//           <Text
//             size="lg"
//             weight="semibold"
//             className={`flex-1 mx-3 ${task.completed ? "line-through text-gray-400" : ""}`}
//           >
//             {task.title}
//           </Text>
//           <TouchableOpacity onPress={toggleMenu} hitSlop={8}>
//             <Entypo name="dots-three-horizontal" size={24} color="black" />
//           </TouchableOpacity>
//         </View>

//         {expanded && (
//           <View className="gap-1">
//             <Text className="text-gray-500">{task.description}</Text>
//             {task.dueDate && (
//               <Text className="text-xs text-gray-400">
//                 Due: {new Date(task.dueDate).toLocaleDateString()}
//               </Text>
//             )}
//           </View>
//         )}
//       </TouchableOpacity>

//       {menuOpen && (
//         <View className="bg-white rounded-xl mb-4 mx-2 overflow-hidden border border-gray-100">
//           <TouchableOpacity
//             onPress={handleDetails}
//             className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100"
//           >
//             <MaterialIcons name="info-outline" size={20} color="#3b82f6" />
//             <Text className="text-blue-500">See details</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleDelete}
//             className="flex-row items-center gap-3 px-4 py-3"
//           >
//             <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
//             <Text className="text-red-500">Delete task</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }



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
import { useTaskStore, Task } from "@/store/taskStore";
import { useRouter } from "expo-router";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = { task: Task };

const isOverdue = (task: Task) => {
  if (!task.dueDate || task.completed) return false;
  return new Date(task.dueDate) < new Date();
};

export default function TodoCard({ task }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleComplete, deleteTask } = useTaskStore();
  const router = useRouter();
  const overdue = isOverdue(task);

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
      { text: "Delete", style: "destructive", onPress: () => deleteTask(task._id) },
    ]);
  };

  const handleDetails = () => {
    setMenuOpen(false);
    router.push(`/task/${task._id}`);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        className={`mb-1 p-4 rounded-xl gap-3 ${overdue ? "bg-red-50" : "bg-gray-100"}`}
      >
        <View className="flex-row justify-between items-center">
          <Checkbox
            checked={task.completed}
            onPress={() => toggleComplete(task._id)}
          />
          <View className="flex-1 mx-3">
            <Text
              size="lg"
              weight="semibold"
              className={task.completed ? "line-through text-gray-400" : ""}
            >
              {task.title}
            </Text>
            {overdue && (
              <View className="flex-row items-center gap-1 mt-1">
                <MaterialIcons name="schedule" size={12} color="#ef4444" />
                <Text className="text-red-400" style={{ fontSize: 12 }}>Overdue</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={toggleMenu} hitSlop={8}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {expanded && (
          <View className="gap-1">
            <Text className="text-gray-500">{task.description}</Text>
            {task.dueDate && (
              <Text className={`text-xs ${overdue ? "text-red-400" : "text-gray-400"}`}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>

      {menuOpen && (
        <View className="bg-white rounded-xl mb-4 mx-2 overflow-hidden border border-gray-100">
          <TouchableOpacity
            onPress={handleDetails}
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