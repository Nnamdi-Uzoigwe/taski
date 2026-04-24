// import { View, Image } from "react-native"
// import Text from "./Text"
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function Header() {
//     const username = "John";
//     return (
//     <View className="bg-white">
//         {/* Header */}
//       <View className="flex flex-row pb-2 justify-between items-center">
//         {/* Logo */}
//         <View className="flex-row items-center gap-2">
//           <MaterialIcons
//             name="check-box"
//             size={28}
//             color="#3b82f6"
    
//           />
//           <Text weight="regular" size="xl">
//             Taski
//           </Text>
//         </View>

//         {/* Avatar */}
//         <View className="flex-row items-center gap-2">
//           <Text weight="regular">{username}</Text>
//           <Image source={require("../../assets/images/avatar.png")} />
//         </View>
//       </View>
//       </View>
//     )
// }


import { useState } from "react";
import { View, Image, TouchableOpacity, Modal, Alert, Pressable } from "react-native";
import Text from "./Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header() {
  const username = "John";
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogoutPress = () => {
    setMenuVisible(false);

    // slight delay so modal closes before alert appears
    setTimeout(() => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              // your logout logic here
              console.log("User logged out");
            },
          },
        ]
      );
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
          <Text weight="regular">{username}</Text>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Image
              source={require("../../assets/images/avatar.png")}
              className="w-9 h-9 rounded-full"
            />
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
        {/* Backdrop - closes modal on outside tap */}
        <Pressable
          className="flex-1"
          onPress={() => setMenuVisible(false)}
        >
          {/* Menu positioned top-right */}
          <Pressable
            className="absolute top-16 right-6 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            onPress={(e) => e.stopPropagation()} // prevent backdrop from firing
          >
            {/* User info */}
            <View className="px-4 py-3 border-b border-gray-100">
              <Text weight="regular" size="sm" className="text-gray-400">
                Signed in as
              </Text>
              <Text weight="regular">{username}</Text>
            </View>

            {/* Logout button */}
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