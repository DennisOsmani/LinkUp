import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import PublicFeed from "./Public/PulicFeed";
import FriendFeed from "./Friends/FriendFeed";
import { styles } from "./FeedStyles";

export default function Feed() {
  return (
    <View>
      <TabBackground firstTab="Offentlig" secondTab="Venner">
        <PublicFeed />
        <FriendFeed />
      </TabBackground>
    </View>
  );
}
