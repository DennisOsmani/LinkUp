import { Text, View } from "react-native";
import { TokenProvider } from "./providers/TokenProvider";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import TabNavigator from "./navigation/TabNavigator";
import Splash from "./screens/Splash/Splash";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      BalooBold: require("./assets/fonts/Baloo2-Bold.ttf"),
      BalooRegular: require("./assets/fonts/Baloo2-Regular.ttf"),
    });

    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    // Load splash screen!
    return (
      <View>
        <Text style={{ fontFamily: "BalooBold" }}>Splash</Text>
      </View>
    );

    return <Splash />;
  }

  return (
    <TokenProvider>
      <TabNavigator />
    </TokenProvider>
  );
}
