import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

const CryptoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" />
      <Stack.Screen
        name="lock"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: true,
          animation: "fade",
          presentation: "transparentModal",
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="close-outline"
                size={34}
                color="#ffff"
                onPress={() => router.back()}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <StatusBar style="dark" />
    </Stack>
  );
};

export default CryptoLayout;
