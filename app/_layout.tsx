import {
  TouchableOpacity,
  StatusBar,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import {
  Link,
  SplashScreen,
  Stack,
  useRouter,
} from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {UserInactivity} from "../store/userInactivity";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();

const CLERK_PERISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokencache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log(error); // Optionally handle error, but do not return null
    }
  },
};

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <ClerkProvider
      publishableKey={CLERK_PERISHABLE_KEY}
      tokenCache={tokencache}
    >
      <AppNavigator />
    </ClerkProvider>
  );
};

const AppNavigator = () => {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn === true) {
      Alert.alert("Welcome back!");
      router.replace("/(tab)/Home");
    } else {
      // router.push("/(auth)/index");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <Text className="text-white text-center mt-20">Loading...</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <UserInactivity>

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerBackTitle: "",
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#161622" },
              headerLeft: () => (
                <TouchableOpacity className="pt-2 mt-2 " onPress={router.back}>
                  <Ionicons name="arrow-back" size={20} color="#ffff" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <Link href={"/help"} asChild>
                  <TouchableOpacity className="pt-2 mt-2 ">
                    <Ionicons
                      name="help-circle-outline"
                      size={20}
                      color="#ffff"
                    />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
           <Stack.Screen
            name="(crypto)"
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="help"
            options={{ title: "Help", presentation: "modal" }}
          />
          <Stack.Screen
            name="(tab)"
            options={{
              headerBackTitle: "",
              headerTitle: "",
              headerShown: false,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#161622" },
            }}
          />
          


        </Stack>
        </UserInactivity>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootLayout;
