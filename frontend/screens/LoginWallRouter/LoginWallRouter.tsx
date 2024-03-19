import { Text, View } from "react-native";
import { useTokenProvider } from "../../providers/TokenProvider";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import TabNavigator from "../../navigation/TabNavigator";
import Auth from "../Auth/Auth";

export default function LoginWallRouter() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [trigger, setTrigger] = useState(false);
  const { token } = useTokenProvider();

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      BalooBold: require("../../assets/fonts/Baloo2-Bold.ttf"),
      BalooRegular: require("../../assets/fonts/Baloo2-Regular.ttf"),
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
  }

  if (token === "" || token === undefined) {
    // TOOD - Check for token validation instead, valid time and some kind of username?
    return <Auth trigger={trigger} setTrigger={setTrigger} />;
  }

  return <TabNavigator />;
}
