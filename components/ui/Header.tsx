import { View, Image } from "react-native"
import Text from "./Text"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header() {
    const username = "John";
    return (
    <View>
        {/* Header */}
      <View className="flex flex-row pb-2 justify-between items-center">
        {/* Logo */}
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="check-box"
            size={28}
            color="#3b82f6"
    
          />
          <Text weight="regular" size="xl">
            Taski
          </Text>
        </View>

        {/* Avatar */}
        <View className="flex-row items-center gap-2">
          <Text weight="regular">{username}</Text>
          <Image source={require("../../assets/images/avatar.png")} />
        </View>
      </View>
      </View>
    )
}