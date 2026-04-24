import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasSeenOnboarding";

export const hasSeenOnboarding = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(KEY);
  return value === "true";
};

export const markOnboardingComplete = async (): Promise<void> => {
  await AsyncStorage.setItem(KEY, "true");
};