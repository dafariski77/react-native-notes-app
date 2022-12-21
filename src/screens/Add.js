import React, { useState } from "react";
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { saveNote } from "../utils/note";

const Add = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const author = route.params.author;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.body}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Title"
          placeholderTextColor="grey"
          onChangeText={(title) => setTitle(title)}
          multiline
        />
        <TextInput
          style={styles.inputNote}
          placeholder="Start typing"
          placeholderTextColor="grey"
          onChangeText={(note) => setNote(note)}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          saveNote(title, note, author);
          navigation.navigate("Home", { username: author });
        }}
      >
        <FontAwesome5 name="check" size={27} color="black" />
      </TouchableOpacity>
      <StatusBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  saveBtn: {
    backgroundColor: "#ffd369",
    height: 65,
    width: 65,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 65 / 2,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  body: {
    padding: 20,
  },
  inputTitle: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffd369",
  },
  inputNote: {
    marginTop: 10,
    fontSize: 18,
    color: "#eeeeee",
  },
});

export default Add;
