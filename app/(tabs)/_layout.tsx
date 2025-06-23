import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const TabIcon = ({ focused, Name, Icon }: any) => {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full flex-1 min-w-[113px] min-h-16 justify-center items-center rounded-full overflow-hidden">
      <Image source={Icon} tintColor="#151312" className="size-5"></Image>
      <Text className="text-secondary text-base font-semibold ml-2">
        {Name}
      </Text>
    </ImageBackground>
  ) : (
    <TouchableOpacity className="pointer-events-none">
      <View className="size-full justify-center items-center rounded-full">
        <Image source={Icon} tintColor="#ffffff" className="size-5"></Image>
      </View>
    </TouchableOpacity>
  );
};

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 51,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#0f0D23",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Name="Home" Icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Name="Search" Icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Name="Saved" Icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Name="Profile" Icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
}
