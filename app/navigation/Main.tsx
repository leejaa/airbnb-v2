import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import utils from "../utils";
import Search from "../screens/Main/Search";
import BackBtn from "../components/Auth/BackBtn";
import Profile from "../screens/Main/Profile";
import Home from "../screens/Main/Home";
import RoomDetail from "../screens/Room/RoomDetail";
import Header from "../components/Common/Header";
import SearchPlace from "../screens/Main/SearchPlace";
import SearchCalendar from "../screens/Main/SearchCalendar";
import AddGuests from "../screens/Main/AddGuests";

const TabsNavigator = createBottomTabNavigator();
const Tabs = () => (
  <TabsNavigator.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      tabStyle: {
        paddingTop: 10
      },
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600"
      }
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const isAndroid = utils.isAndroid();
        let iconName = `${isAndroid ? "md-" : "ios-"}`;
        if (route.name === "Explore") {
          iconName += "search";
        } else if (route.name === "Saved") {
          iconName += "heart";
        } else if (route.name === "Map") {
          iconName += "map";
        } else if (route.name === "Profile") {
          iconName += "person";
        } else if (route.name === "Home") {
          iconName += "home";
        }
        return (
          <Ionicons
            name={iconName}
            size={24}
            color={focused ? colors.red : "grey"}
          />
        );
      }
    })}
  >
    <TabsNavigator.Screen name="Home" component={Home} />
    <TabsNavigator.Screen name="Profile" component={Profile} />
  </TabsNavigator.Navigator>
);
const RoomNavigator = createStackNavigator();
const Room = () => (
  <RoomNavigator.Navigator
    mode="card"
  >
    <RoomNavigator.Screen
      name="RoomDetail"
      component={RoomDetail}
      options={{
        headerShown: false
      }}
    />
  </RoomNavigator.Navigator>
);

const MainNavigator = createStackNavigator();
export default () => {
  return (
    <MainNavigator.Navigator
      mode="modal"
      screenOptions={({ route }) => ({
        headerBackTitleVisible: true,
        headerBackImage: () => <BackBtn />,
      })}
    >
      <MainNavigator.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <MainNavigator.Screen
        name="SearchCalendar"
        component={SearchCalendar}
        options={{
          header: () => <Header cssType="003" />,
        }}
      />
      <MainNavigator.Screen
        name="SearchPlace"
        component={SearchPlace}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          header: () => <Header cssType="002" />,
        }}
      />
      <MainNavigator.Screen
        name="AddGuests"
        component={AddGuests}
        options={{
          header: () => <Header cssType="003" />,
        }}
      />
      <MainNavigator.Screen
        name="RoomDetail"
        component={RoomDetail}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <MainNavigator.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
    </MainNavigator.Navigator>
  )
};