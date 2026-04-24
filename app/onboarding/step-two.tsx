import { Image, TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/Text";
import { useRouter } from "expo-router";
import { markOnboardingComplete } from "@/lib/onboarding";

export default function StepTwo() {
  const router = useRouter();

  const handleFinish = async () => {
    await markOnboardingComplete();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 gap-4 bg-white justify-center px-6">
      <View className="flex items-center">
        <Image
          source={require("../../assets/images/onboarding-2.jpg")}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <Text size="2xl" weight="regular" className="text-center text-gray-500">
        Watch your progress
      </Text>
      <Text className="text-center text-gray-500">Track Steps and Completed Tasks</Text>

      <TouchableOpacity className="bg-blue-400 p-3 rounded-xl" onPress={handleFinish}>
        <Text className="text-white text-center" weight="regular" size="xl">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}