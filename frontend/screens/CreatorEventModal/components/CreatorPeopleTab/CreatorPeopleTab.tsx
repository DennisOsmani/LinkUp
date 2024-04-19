import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { styles } from "./CreatorPeopleTabStyles";
import { colors } from "../../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { IEvent } from "../../../../interfaces/ModelInterfaces";
import EventInvteModal from "./components/EventInviteModal/EventInviteModal";

interface PeopleTabProps {
  event: IEvent | null;
}

export function CreatorPeopleTab({ event }: PeopleTabProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <EventInvteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.tabContainer}>
        <View style={styles.topWrapper}>
          <View style={styles.searchBar}>
            <Feather
              style={styles.feather}
              name="search"
              size={26}
              color={colors.grey}
            />
            <TextInput style={styles.searchInput} />
          </View>
        </View>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.inviteMoreButton}
        >
          <Text style={styles.inviteMoreText}>Legg til flere</Text>
        </Pressable>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.scrollTabContainer}>
            {/* Her må man mappe verier fra fetch alle relasjoner til ett event */}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
