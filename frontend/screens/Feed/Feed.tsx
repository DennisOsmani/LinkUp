import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import PublicFeed from "./components/PublicFeed/PulicFeed";
import FriendFeed from "./components/FriendsFeed/FriendFeed";

export default function Feed() {
  return (
    <View>
      <TabBackground firstTab="For alle" secondTab="Venner">
        <PublicFeed />
        <FriendFeed />
      </TabBackground>
    </View>
  );
}
