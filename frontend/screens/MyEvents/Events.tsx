import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import JoinedFeed from "./components/JoinedFeed/JoinedFeed";
import InvitesFeed from "./components/InvitesFeed/InvitesFeed";

export default function Feed() {
  return (
    <View>
      <TabBackground firstTab="Deltar" secondTab="Invitert">
        <JoinedFeed />
        <InvitesFeed />
      </TabBackground>
    </View>
  );
}
