import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import SearchPeople from "./components/Search/Search";
import FriendsPeople from "./components/Friends/Friends";

export default function People() {
  return (
    <View>
      <TabBackground firstTab="Utforsk" secondTab="Venner">
        <SearchPeople />
        <FriendsPeople />
      </TabBackground>
    </View>
  );
}
