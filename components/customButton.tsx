import { TouchableOpacity, Text } from "react-native";

type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  isLoading?: boolean;
  textStyles?: string;
};

const CustomButton = ({
  title,
  containerStyles,
  handlePress,
  isLoading,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary   min-h-[60px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
