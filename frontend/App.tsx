import LoginWallRouter from "./screens/LoginWallRouter/LoginWallRouter";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import Splash from "./screens/Splash/Splash";
import { TokenProvider } from "./providers/TokenProvider";
import "./firebase";
import TabNavigator from "./navigation/TabNavigator";

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

    setTimeout(() => {
      setFontsLoaded(true);
    }, 1000);
  };

  if (!fontsLoaded) {
    return <Splash />;
  }

  return (
    <TokenProvider>
      <TabNavigator />
      {/* <LoginWallRouter />*/}
    </TokenProvider>
  );
}
