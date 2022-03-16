import React, { useEffect } from "react";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createTable } from "./src/database/database";
import { Provider } from "react-redux";
import { store } from './src/redux/store';

export default function App() {

  useEffect(() => {
    createTable();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TaskList"
          screenOptions={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerLargeTitleShadowVisible: false,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#5A90DC",
            },
          }}
        >
          <Stack.Screen
            name="TaskList"
            initialParams={{ pageTitle: "Todo List App" }}
            component={TaskListScreen}
            options={({ route }) => ({
              title: route.params.pageTitle,
            })}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={({ route }) => ({
              title: route.params.pageTitle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}