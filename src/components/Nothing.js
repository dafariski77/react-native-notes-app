import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Nothing = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>You don't have a note!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#111111",
  },
});

export default Nothing;
