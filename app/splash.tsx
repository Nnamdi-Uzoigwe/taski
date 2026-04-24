import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import Text from "@/components/ui/Text";
import { hasSeenOnboarding } from "@/lib/onboarding";
import { useAuthStore } from "@/store/authStore";

export default function Splash() {
  const router = useRouter();
  const { token } = useAuthStore();

  const iconScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(10)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(async () => {
      const seen = await hasSeenOnboarding();

      if (!seen) {
        router.replace("/onboarding/step-one");
      } else if (token) {
        router.replace("/(tabs)/todo");
      } else {
        router.replace("/(auth)/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-blue-400 gap-2">
      <Animated.View
        style={{ transform: [{ scale: iconScale }] }}
        className="w-20 h-20 rounded-2xl bg-white/20 items-center justify-center mb-2"
      >
        <Text size="3xl">✓</Text>
      </Animated.View>

      <Animated.View
        style={{ opacity: textOpacity, transform: [{ translateY: textY }] }}
        className="items-center gap-1"
      >
        <Text weight="bold" size="3xl" className="text-white tracking-tight">
          Taski
        </Text>
        <Text className="text-white/80 text-sm">Do more, stress less</Text>
      </Animated.View>

      <Animated.View className="mt-8 h-[3px] w-28 bg-white/25 rounded-full overflow-hidden">
        <Animated.View
          className="h-full bg-white rounded-full"
          style={{
            width: progressWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </Animated.View>
    </View>
  );
}