import { useState } from "react";
import { View, TouchableOpacity, Modal, Alert, Pressable } from "react-native";
import Text from "./Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  const handleLogoutPress = () => {
    setMenuVisible(false);
    setTimeout(() => {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/(auth)/login");
          },
        },
      ]);
    }, 300);
  };

  return (
    <View className="bg-white">
      <View className="flex flex-row pb-2 justify-between items-center">

        {/* Logo */}
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="check-box" size={28} color="#3b82f6" />
          <Text weight="regular" size="xl">Taski</Text>
        </View>

        {/* Avatar */}
        <View className="flex-row items-center gap-2">
          <Text weight="regular">{user?.name}</Text>

          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            className="w-9 h-9 rounded-full bg-blue-500 items-center justify-center"
          >
            <Text weight="semibold" className="text-white">{initial}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mini Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
          <Pressable
            className="absolute top-16 right-6 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            onPress={(e) => e.stopPropagation()}
          >
            {/* User info */}
            <View className="px-4 py-3 border-b border-gray-100">
              <Text weight="regular" size="sm" className="text-gray-400">Signed in as</Text>
              <Text weight="regular">{user?.name}</Text>
            </View>

            {/* Logout */}
            <TouchableOpacity
              onPress={handleLogoutPress}
              className="flex-row items-center gap-3 px-4 py-3"
            >
              <MaterialIcons name="logout" size={18} color="#ef4444" />
              <Text weight="regular" className="text-red-500">Logout</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}