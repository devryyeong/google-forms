import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../styles/color"

interface BottomBarButtonProps {
  onPress: () => void;
}

const BottomBar = () => {
  const handleAddButtonPress = (label: string) => {
    console.log(`질문 추가`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          onPress={handleAddButtonPress}
        >
          <Ionicons name="ios-add-circle-outline" size={24} color="#5F6368" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${COLORS.WHITE}`,
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
});

export default BottomBar;