import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import JoinedFeed from "./h_Joined/JoinedFeed";
import InvitesFeed from "./Invites/InvitesFeed";

export default function Feed() {
  return (
    <View>
      <TabBackground firstTab="Joined" secondTab="Invites">
        <JoinedFeed />
        <InvitesFeed />
      </TabBackground>
    </View>
  );
}
