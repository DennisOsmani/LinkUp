import { View, Text } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import SearchPeople from "./Search/Search";
import FriendsPeople from "./Friends/Friends";

export default function People() {
  return (
    <View>
      <TabBackground firstTab="Søk" secondTab="Venner">
        <SearchPeople />
        <FriendsPeople />
      </TabBackground>
    </View>
  );
}
