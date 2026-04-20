import Text from "@/components/ui/Text";
import { Link } from "expo-router";
import { TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Signup() {
    return (
        <SafeAreaView className="flex-1 px-6 items-center justify-center">
            <View>
                <Text size="3xl" weight="bold" className="text-blue-400 mb-4">Welcome to Taski</Text>
            </View>

            <Text weight="regular" className="text-gray-500">Create an account to continue</Text>

            {/* Name */}
            <TextInput 
                placeholder="Enter your name"
                className="w-full border-2 text-xl mt-10 placeholder:text-gray-500 border-gray-500 p-3 rounded-lg"
            />

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

            <TouchableOpacity className="bg-blue-400 flex items-center w-full p-3 rounded-xl">
                <Text size="xl" weight="regular" className="text-center text-white">Create Account</Text>
            </TouchableOpacity>

            <Text weight="light" className="mt-4 text-gray-500">Already have an account? <Link href="/(auth)/login"><Text className="text-blue-400" weight="regular">Sign up</Text></Link></Text>
          
        </SafeAreaView>
    )
}