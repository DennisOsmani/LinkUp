import { View, Text } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import SearchPeople from "./Search/Search";
import FriendsPeople from "./Friends/Friends";
import { useEffect, useState } from "react";

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
