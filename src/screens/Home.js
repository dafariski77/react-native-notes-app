import axios from "axios";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from "react-native";
import Nothing from "../components/Nothing";

const Home = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const author = route.params.username;
  const [spinner, setSpinner] = useState(false);

  const getNote = () => {
    setSpinner(true);

    axios.get(`https://witty-moth-fez.cyclic.app/notes/${author}`).then((response) => {
      setData(response.data.data);
      setSpinner(false);
    });
  };

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => getNote());
    return unsubcribe;
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container]}>
      {spinner && (
        <ActivityIndicator style={styles.indicator} color="#fff" size="large" />
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate("Add", { author });
        }}
      >
        <Text style={{ fontSize: 45, color: "#222831" }}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mapBtn}
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={{ fontSize: 45, color: "#222831" }}>M</Text>
      </TouchableOpacity>
      {data.length <= 0 ? (
        <Nothing />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 15,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            const { _id, title, note, updatedAt } = item;
            var myDate = updatedAt.split("T")[0];
            return (
              <TouchableOpacity
                style={styles.notes}
                onPress={() => {
                  navigation.navigate("Edit", { _id, title, note, updatedAt, author });
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, marginVertical: 10, color: "#eeeeee" }}
                    numberOfLines={4}
                  >
                    {note}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 12, color: "grey" }}>{myDate}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          style={{
            margin: 22,
            flex: 1,
          }}
        />
      )}
      <StatusBar />
    </SafeAreaView>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
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
    zIndex: 1,
  },
  mapBtn: {
    backgroundColor: "#ffd369",
    height: 65,
    width: 65,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 65 / 2,
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 1,
  },
  notes: {
    backgroundColor: "#373737",
    width: width / 2 - 10,
    borderRadius: 10,
    padding: 15,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffd369",
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Home;
