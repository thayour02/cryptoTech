import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DropdownMore = () => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="flex-col items-center gap-4">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View className="bg-gray-200 w-16 h-16 justify-center items-center rounded-full">
            <Ionicons name="ellipsis-horizontal" size={30} color="#FF6347" />
          </View>
        </TouchableOpacity>
        <Text>More</Text>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
            onPress={() => setModalVisible(false)}
            style={styles.menuItem}>
              <Text>Account Statement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Transaction History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Settings</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default DropdownMore;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: 250,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
  },
});
