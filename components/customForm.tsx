import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icon } from "../constants/icons";
import { useState } from "react";

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  otherStyles?: string;
  handleChangeText: (text: string) => void;
};

const FormField = ({
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className={"text-base text-white font-pmedium "}>{title}</Text>
        <View className="h-16 bg-black-200 w-full border-2 border-black-200 focus:border-secondary items-center rounded-2xl flex-row px-8">
          <TextInput
            className="flex-1 text-white font-psemibold text-base right-4"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
          />
          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icon.eye : icon?.eyeHide}
                className={"w-6 h-6 -right-4"}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default FormField;
