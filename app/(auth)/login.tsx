import Text from "@/components/ui/Text";
import { Link, useRouter } from "expo-router";
import { TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 px-6 items-center justify-center">
            <View>
                <Text size="3xl" weight="bold" className="text-blue-400 mb-4">Welcome back to Taski!</Text>
            </View>

            <Text weight="regular" className="text-gray-500">Login to continue</Text>

            {/* Email */}
            <TextInput 
                placeholder="Enter your email"
                className="w-full border-2 text-xl mt-10 placeholder:text-gray-500 border-gray-500 p-3 rounded-lg"
            />
            
            {/* Password */}
            <TextInput 
                placeholder="Enter your password"
                textContentType="password"
                className="w-full border-2 text-xl my-8 placeholder:text-gray-500 border-gray-500 p-3 rounded-lg"
            />

            <TouchableOpacity onPress={() => router.replace("/(tabs)/todo")} className="bg-blue-400 flex items-center w-full p-3 rounded-xl">
                <Text size="xl" weight="regular" className="text-center text-white">Log in</Text>
            </TouchableOpacity>

            <Text weight="light" className="mt-4 text-gray-500">Don't have an account? <Link href="/(auth)/signup"><Text className="text-blue-400" weight="regular">Sign up</Text></Link></Text>
          
        </SafeAreaView>
    )
}