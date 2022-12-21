import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { deleteNote, editNote } from "../utils/note";

const Edit = ({ navigation, route }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");

  const oldTitle = route.params.title;
  const oldNote = route.params.note;

  const params = {
    id: route.params._id,
    author: route.params.author,
  };

  const { id, author, updatedAt } = params;

  useEffect(() => {
    setNewTitle(oldTitle);
    setNewNote(oldNote);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.body}>
        <TextInput
          value={newTitle}
          style={styles.inputTitle}
          placeholder="Title"
          placeholderTextColor="grey"
          onChangeText={(title) => setNewTitle(title)}
          multiline
        />
        <TextInput
          value={newNote}
          style={styles.inputNote}
          placeholder="Start typing"
          placeholderTextColor="grey"
          onChangeText={(note) => setNewNote(note)}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          editNote(id, newTitle, newNote, author);
          navigation.navigate("Home", { username: author });
        }}
      >
        <FontAwesome5 name="check" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => {
          Alert.alert("Delete Confirmation", "Delete this note?", [
            {
              text: "Cancel",
            },
            {
              text: "DELETE",
              onPress: () => {
                deleteNote(id);
                navigation.navigate("Home", { username: author });
              },
            },
          ]);
        }}
      >
        <MaterialIcons name="delete" size={29} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  addBtn: {
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
  deleteBtn: {
    borderWidth: 2,
    backgroundColor: "#373737",
    height: 65,
    width: 65,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 65 / 2,
    position: "absolute",
    bottom: 100,
    right: 20,
  },
  body: {
    padding: 20,
  },
  inputTitle: {
    marginTop: 10,
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

export default Edit;
