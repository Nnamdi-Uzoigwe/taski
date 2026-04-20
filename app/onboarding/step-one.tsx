
import { Image, TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/Text";
import { useRouter } from "expo-router";

export default function StepOne() {
  const router = useRouter();

  return (
    <View className="flex-1 gap-4 bg-white justify-center px-6">
      <View className="flex items-center">
        <Image
          source={require("../../assets/images/onboarding-1.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <Text weight="regular" size="2xl" className="text-center text-gray-500">
        Your tasks, all in one place
      </Text>
      <Text className="text-center text-gray-500">
        Add tasks, set due dates and stay on top of it all
      </Text>

      <TouchableOpacity
        className="bg-blue-400 p-3 rounded-xl"
        onPress={() => router.push("/onboarding/step-two")}
      >
        <Text className="text-white text-center" weight="regular" size="xl">Next</Text>
      </TouchableOpacity>
    </View>
  );
}