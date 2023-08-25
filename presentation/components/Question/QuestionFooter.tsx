import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { HStack, IconButton, Switch } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import COLORS from "../../styles/color";


const QuestionFooter = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <HStack fill center spacing={4} style={styles.stack}>
      <Text style={styles.requiredText}>필수</Text>
        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
        <IconButton
          icon={(props) => <Icon name="dots-vertical" {...props} />}
        />
      </HStack>
    </View>
  );
}

export default QuestionFooter

const styles = StyleSheet.create({
  container: {
    borderTopColor: `${COLORS.GRAY_100}`,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  stack: {
    justifyContent: "flex-end",
  },
  requiredText: {
    color: `${COLORS.GRAY_200}`
  }
});