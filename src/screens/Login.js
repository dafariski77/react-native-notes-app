import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const Login = ({ navigation }) => {
  const [uname, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const goLogin = (username, password) => {
    const requestingData = {
      username,
      password,
    };
    setSpinner(true);
    axios
      .post("https://mynotesapi78.herokuapp.com/login", requestingData)
      .then((response) => {
        const data = response.data.users;
        const { _id, name, password, username } = data;
        setSpinner(false);
        alert("Login success!");
        navigation.navigate("Home", { name, username });
      })
      .catch((error) => {
        setSpinner(false);
        alert("Invalid username or password");
      });
  };

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      setUsername("");
      setPassword("");
    });
    return unsubcribe;
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container]}>
      {spinner && (
        <ActivityIndicator style={styles.indicator} color="#fff" size="large" />
      )}
      <View style={styles.groupText}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#eeeeee" }}>
          Welcome to
        </Text>
        <Text style={styles.title}>MyNotes</Text>
        <Text style={styles.subtitle}>
          You need to login first or
          <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
            {" "}
            Register
          </Text>
        </Text>
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
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          goLogin(uname, pass);
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
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
    marginLeft: -70,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
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
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Login;
