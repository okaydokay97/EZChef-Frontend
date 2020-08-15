import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import Login from "./components/Login";
import AddIngredients from "./components/AddIngredients";
import Pantry from "./components/Pantry";
import Recipes from "./components/Recipes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Add Ingredients"
            component={AddIngredients}
            options={({ navigation, route }) => ({
              headerLeft: null,
              headerRight: () => (
                <Button
                  onPress={() => navigation.replace("Pantry")}
                  title="Pantry"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Recipes"
            component={Recipes}
            options={({ navigation, route }) => ({
              headerLeft: () => (
                <Button
                  onPress={() => navigation.replace("Pantry")}
                  title="Pantry"
                />
              ),
              headerRight: null,
            })}
          />
          <Stack.Screen
            name="Pantry"
            component={Pantry}
            options={({ navigation, route }) => ({
              headerLeft: () => (
                <Button
                  onPress={() => navigation.replace("Add Ingredients")}
                  title="Add Ingredients"
                />
              ),
              headerRight: () => (
                <Button
                  onPress={() => navigation.replace("Recipes")}
                  title="Recipes"
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "justify",
  },
});

console.disableYellowBox = true