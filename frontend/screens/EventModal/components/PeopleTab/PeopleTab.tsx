import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { styles } from "./PeopleTabStyles";
import { colors } from "../../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  IEvent,
  IUserWithEventParticipationDTO,
} from "../../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import RelatedUserCard from "./components/RelatedUserCard/RelatedUserCard";
import { GetEventRelationsFromEvent } from "../../../../api/EventAPI";

interface PeopleTabProps {
  event: IEvent | null;
}

export function PeopleTab({ event }: PeopleTabProps) {
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
            onChangeText={(input: string) => handleSearchInput(input)}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scrollTabContainer}>
          {searchResults &&
            searchResults.map((user: IUserWithEventParticipationDTO) => (
              <RelatedUserCard user={user} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
