import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import JoinedFeed from "./Joined/JoinedFeed";
import InvitesFeed from "./Invites/InvitesFeed";

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
