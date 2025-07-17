import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

const CryptoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" />
      <Stack.Screen
        name="lock"
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack>
  );
};

export default CryptoLayout;
