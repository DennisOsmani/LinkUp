import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./CreatorPeopleTabStyles";
import { colors } from "../../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import EventInvteModal from "./components/EventInviteModal/EventInviteModal";
import {
  IEvent,
  IUserWithEventParticipationDTO,
} from "../../../../interfaces/ModelInterfaces";
import RelatedUserCard from "../../../EventModal/components/PeopleTab/components/RelatedUserCard/RelatedUserCard";
import { GetEventRelationsFromEvent } from "../../../../api/EventAPI";
import { useTokenProvider } from "../../../../providers/TokenProvider";

interface CreatorPeopleTab {
  event: IEvent | null;
}

export function CreatorPeopleTab({ event }: CreatorPeopleTab) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [relatedUsers, setRelatedUsers] = useState<
    IUserWithEventParticipationDTO[] | undefined
  >([]);
  const [searchResults, setSearchResults] = useState<
    IUserWithEventParticipationDTO[] | undefined
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useTokenProvider();

  useEffect(() => {
    fetchRelatedUsers();
  }, []);

  const fetchRelatedUsers = async () => {
    if (!event) return;

    const response: IUserWithEventParticipationDTO[] | undefined =
      await GetEventRelationsFromEvent(event.eventID, token);
    setRelatedUsers(response);
    setSearchResults(response);
    setLoading(false);
  };

  const handleSearchInput = (input: string) => {
    if (!relatedUsers) return;
    setSearchResults(
      relatedUsers.filter((user: IUserWithEventParticipationDTO) =>
        (user.firstname + user.lastname)
          .toUpperCase()
          .replaceAll(" ", "")
          .includes(input.toUpperCase().replaceAll(" ", ""))
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#5A5DF0" />
      </View>
    );
  }

  return (
    <>
      <EventInvteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        eventId={event?.eventID}
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
            <TextInput
              onChangeText={handleSearchInput}
              style={styles.searchInput}
            />
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
            {searchResults &&
              searchResults.map((user: IUserWithEventParticipationDTO) => (
                <RelatedUserCard user={user} />
              ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
