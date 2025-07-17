import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";




export const UserInactivity = ({children}:any) =>{
    const appState = useRef(AppState.currentState);
    const router  = useRouter();
    const {isSignedIn} = useAuth();

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => {
            subscription.remove()
        }
    },[appState])

    const handleAppStateChange  = async(nextAppState:AppStateStatus) => {
        if(nextAppState === "background"){
            recordUserInactivity();
        }else if(nextAppState === "active" && appState.current.match(/background/)){
            const elapsedTime = await AsyncStorage.getItem("startTime") || "0";

            if(Number(elapsedTime) > 30000 && isSignedIn){
                router.replace("/(crypto)/lock");
            }
        }
        appState.current = nextAppState;
    }

    const recordUserInactivity = async () => {
       await AsyncStorage.setItem("startTime", Date.now().toString());
    }
    return children;
}