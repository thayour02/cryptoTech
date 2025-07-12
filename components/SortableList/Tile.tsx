import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { SIZE } from "./Config";
import { useBalanceStore } from "@/store/balStorage";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();

  if (id === "spent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View className="flex-row items-center gap-4">
          <Text style={{ color: "fff", fontWeight: "500", fontSize: 16 }}>
            Money spent
          </Text>
          <Ionicons name="trending-up-outline" size={20} className="right" color={"000"} />
        </View>
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: 26,
            paddingTop: 20,
          }}
        >
          1024€
        </Text>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: "#F",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>
              5%
            </Text>
          </View>
         <View className='flex-row items-centter gap-10'>
           <Text style={{ color: 'fff', fontWeight: '500', fontSize: 16 }}>
            cashback
          </Text>
          <Ionicons
          name='arrow-down-circle'
          size={20}
          color={'000'}/>
         </View>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <View className="flex-row items-centter">
            <Text style={{ color: "fff", fontWeight: "500", fontSize: 16 }}>
              Recent transaction
            </Text>
            <Ionicons name="sync" size={20} className="right-4" color={"000"} />
          </View>

          {transactions.length === 0 && (
            <Text
              style={{
                color: "fff",
                fontWeight: "bold",
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: "fff",
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingVertical: 10,
                }}
              >
                {transactions[transactions.length - 1].amount}€
              </Text>
              <Text style={{ color: "fff", fontWeight: "bold", fontSize: 16 }}>
                {transactions[transactions.length - 1].description}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: "fff", fontWeight: "500", fontSize: 16 }}>
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color={"fff"}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

export default Tile;
