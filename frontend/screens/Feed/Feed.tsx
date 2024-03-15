import { View, Text } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";

export default function Feed() {
  return (
    <View>
      <TabBackground firstTab="Offentlig" secondTab="Venner">
        <Text> hei</Text>
      </TabBackground>
    </View>
  );
}
