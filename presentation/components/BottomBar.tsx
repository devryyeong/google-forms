import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
          style={styles.buttonContainer}
          onPress={handleAddButtonPress}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>label 2</Text>
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
  buttonText: {
    color: `${COLORS.GRAY_200}`,
    fontSize: 16,
  },
  buttonContainer: {
    //
  },
});

export default BottomBar;