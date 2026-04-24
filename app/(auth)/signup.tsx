import Text from "@/components/ui/Text";
import { Link, router } from "expo-router";
import { useState } from "react";
import { TextInput, View, TouchableOpacity, Alert, ActivityIndicator, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import Feather from "@expo/vector-icons/Feather";

const inputStyle = {
  fontSize: 16,
  paddingVertical: 12,
  paddingHorizontal: 12,
  includeFontPadding: false,
} as const;

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { register, isLoading, error, clearError } = useAuthStore();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Missing fields", "Please fill in all fields.");
            return;
        }
        const success = await register(name, email, password);
        if (success) {
            router.replace("/(tabs)/todo");
        } else {
            Alert.alert("Registration failed", error ?? "Something went wrong.");
            clearError();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 px-6 items-center justify-center">
                <Text size="3xl" weight="bold" className="text-blue-400 mb-4">Welcome to Taski</Text>

                <Text weight="regular" className="text-gray-500">Create an account to continue</Text>

                <TextInput
                    placeholder="Enter your name"
                    className="w-full border-2 mt-10 placeholder:text-gray-500 border-gray-500 rounded-lg"
                    style={inputStyle}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <TextInput
                    placeholder="Enter your email"
                    className="w-full border-2 mt-6 placeholder:text-gray-500 border-gray-500 rounded-lg"
                    style={inputStyle}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <View className="w-full border-2 my-8 border-gray-500 rounded-lg flex-row items-center">
                    <TextInput
                        placeholder="Enter your password"
                        textContentType="password"
                        secureTextEntry={!showPassword}
                        className="flex-1 placeholder:text-gray-500"
                        style={inputStyle}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-3">
                        <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                    </Pressable>
                </View>

                <TouchableOpacity
                    className="bg-blue-400 flex items-center w-full p-3 rounded-xl"
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text size="xl" weight="regular" className="text-center text-white">Create Account</Text>
                    )}
                </TouchableOpacity>

                <Text weight="light" className="mt-4 text-gray-500">
                    Already have an account?{" "}
                    <Link href="/(auth)/login">
                        <Text className="text-blue-400" weight="regular">Sign in</Text>
                    </Link>
                </Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}