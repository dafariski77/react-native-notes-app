import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableHighlight, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import Add from "./src/screens/Add";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Edit from "./src/screens/Edit";
import Register from "./src/screens/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,
            headerStyle: {
              backgroundColor: "#111111",
            },
            headerTintColor: "#eeeeee",
            headerRight: () => (
              <TouchableHighlight
                onPress={() => {
                  Alert.alert("Logout", "Are you sure?", [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        navigation.navigate("Login");
                      },
                    },
                  ]);
                }}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableHighlight>
            ),
          })}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: "#111111",
            },
            headerTintColor: "#eeeeee",
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: "#111111",
            },
            headerTintColor: "#eeeeee",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
