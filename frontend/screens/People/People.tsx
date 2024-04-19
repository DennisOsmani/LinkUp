import { View } from "react-native";
import { TabBackground } from "../../components/TabBackground/TabBackground";
import SearchPeople from "./Search/Search";
import FriendsPeople from "./Friends/Friends";
import { useEffect, useState } from "react";

// Legge inn en prikk som indikerer i Friends at man har fått en venneforespørsel??

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
