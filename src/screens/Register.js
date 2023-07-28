import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [uname, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [confPass, setConfPassword] = useState("");

  const register = (name, username, password, confirmPassword) => {
    const requestingData = {
      name,
      username,
      password,
      confirmPassword,
    };

    if (!name || !username || !password) {
      alert("Please fill a data!");
    } else {
      axios
        .post(`https://witty-moth-fez.cyclic.app/register`, requestingData)
        .then((response) => {
          alert("User registered!");
          navigation.navigate("Login");
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      setName("");
      setUsername("");
      setPassword("");
      setConfPassword("");
    });
    return unsubcribe;
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.groupText}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          Please input your data or
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={name}
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="grey"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={uname}
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="grey"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={pass}
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={confPass}
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(confPassword) => setConfPassword(confPassword)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          register(name, uname, pass, confPass);
        }}
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <StatusBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
    alignItems: "center",
    justifyContent: "center",
  },
  groupText: {
    marginBottom: 30,
    width: "70%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#ffd369",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#eeeeee",
  },
  link: {
    color: "#ffd369",
  },
  inputView: {
    borderBottomWidth: 0.9,
    borderRadius: 15,
    borderColor: "#eeeeee",
    width: "70%",
    height: 50,
    marginBottom: 10,
  },
  TextInput: {
    height: 70,
    flex: 1,
    padding: 5,
    marginLeft: 20,
    fontSize: 15,
    color: "#eeeeee",
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#ffd369",
    padding: 10,
  },
  loginText: {
    fontWeight: "bold",
    color: "#1d1d1d",
    fontSize: 15,
  },
});

export default Register;
