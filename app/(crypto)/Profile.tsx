import { useUser,useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
    const { user } = useUser();
    const { signOut } = useAuth();

    const [firstName,setFirstName ] = React.useState(user?.firstName)
    const [lastName,setLastName ] = React.useState(user?.lastName)
    const [userName,setUserName ] = React.useState(user?.username)
    const [edit,setEdit] = useState(false);
    const onSaveEdit  = async () => {
            try {
                await user?.update({
                    firstName: firstName,
                    lastName: lastName,
                    username: userName,
                });
                setEdit(false);
                Alert.alert("Profile updated successfully!");
            } catch (error) {
                Alert.alert("Error updating profile");
            }finally{
                setEdit(false);
            }
    }
    const onPickeImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64:true
        });
        if(!result.canceled) {
            const uri = `data:image/jpeg;base64,${result.assets[0].base64}`;
            await user?.setProfileImage({
                file: uri,
            });
            Alert.alert("Profile image updated successfully!");
        }
    }
   
  return (
    <BlurView intensity={40} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <SafeAreaView >
            <View className="flex-1 items-center  justify-center ">
                <TouchableOpacity onPress= {onPickeImage} className="p-4 rounded-lg items-center space-y-2">
                    {user?.imageUrl && (
                        <Image
                            source={{ uri: user?.imageUrl }}
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View className="mt-20  items-center justify-center space-y-4">
               {!edit && (
                <View className="flex-row items-center  gap-4 ">
                   <Text className="text-white font-pmedium text-xl camelCase">{firstName}</Text>
                   <Text className="text-white font-pmedium pl-2  text-xl">{lastName}</Text>
                   <TouchableOpacity onPress={()=>setEdit(true)} className="bg-gray-600 p-2 rounded-lg">
                        <Ionicons name="ellipsis-horizontal" size={20} color="#ffff" />
                   </TouchableOpacity>
                </View>
               )}
               {edit && (
                <View className="flex-row items-center gap-4 ">
                   <TextInput value={firstName || ""} onChangeText={setFirstName} className="bg-white text-black-200 p-2 rounded-lg" />
                   <TextInput value={lastName || ""} onChangeText={setLastName} className="bg-white text-black-200 p-2 rounded-lg" />
                   <TextInput value={userName || ""} onChangeText={setUserName} className="bg-white text-black-200 p-2 rounded-lg" />
                   <TouchableOpacity onPress={onSaveEdit} className="bg-gray-600 p-2 rounded-lg">
                       <Ionicons name="checkmark-outline" size={20} color="#ffff" />
                   </TouchableOpacity>
                </View>
               )}
            </View>

            <View className="mt-6 bg-gray-900 p-4 rounded-lg w-11/12 ml-4  space-y-8">
                 <TouchableOpacity onPress={()=>signOut()} className=" p-2 mb-4 rounded-lg flex-row items-center gap-4 ">
                    <Ionicons name="log-out" size={20} color="#ffff" />
                    <Text className="text-white ">Logout</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>signOut()} className=" p-2 mb-4 rounded-lg flex-row items-center gap-4 ">
                    <Ionicons name="person" size={20} color="#ffff" />
                    <Text className="text-white">Account</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>signOut()} className=" p-2 mb-4 rounded-lg flex-row items-center gap-4 ">
                    <Ionicons name="bulb" size={20} color="#ffff" />
                    <Text className="text-white">Learn</Text>
                </TouchableOpacity>
                  <TouchableOpacity onPress={()=>signOut()} className=" p-2 rounded-lg flex-row items-center gap-4 ">
                    <Ionicons name="megaphone" size={20} color="#ffff" />
                    <Text className="text-white">Inbox</Text>
                </TouchableOpacity>
            </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default Profile;
