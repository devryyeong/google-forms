import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import COLORS from "../styles/color"

const Title = () => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput style={styles.title}>제목 없는 설문지</TextInput>
        <TextInput style={styles.description} placeholder="설문지 설명"></TextInput>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: `${COLORS.WHITE}`,
    borderRadius: 8,
    borderStyle: "solid",
    borderTopWidth: 8,
    borderTopColor: `${COLORS.PRIMARY_200}`,
    // 터치했을 때
    borderLeftColor: `${COLORS.BLUE}`,
    borderLeftWidth: 4,
  },
  top: {
    backgroundColor: `${COLORS.PRIMARY_200}`,
    padding: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
  },
  leftSide: {},
});

export default Title;