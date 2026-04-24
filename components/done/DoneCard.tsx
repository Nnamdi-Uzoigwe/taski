import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatTaskTitle } from "@/lib/utils";
import Text from "../ui/Text";

interface mockTasksProps {
    title: string;
}
export default function DoneCard({ title }: mockTasksProps) {
    return (
        <View className="bg-gray-100 p-4 rounded-xl flex-row justify-between">
            <View className="flex-row gap-2 items-center">
                <MaterialIcons name="check-box" size={28} color="#d1d5db" />
                <Text className="text-gray-400" weight="regular">{formatTaskTitle(title)}</Text>
            </View>
            {/* Delete */}
            <TouchableOpacity>
                <MaterialCommunityIcons name="delete" size={24} color="#ef4444" />
            </TouchableOpacity>
        </View>
    )
}