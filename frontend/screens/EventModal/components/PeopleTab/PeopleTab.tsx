import { View, ScrollView, TextInput } from "react-native";
import { styles } from "./PeopleTabStyles";
import { colors } from "../../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { IUser } from "../../../../interfaces/ModelInterfaces";
import { GetUserFriends } from "../../../../api/UserAPI";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import RelatedUserCard from "./components/RelatedUserCard/RelatedUserCard";

export function PeopleTab() {
  const [relatedUsers, setRelatedUsers] = useState<IUser[]>([]);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const { token } = useTokenProvider();

  useEffect(() => {
    fetchRelatedUsers();
  }, []);

  const fetchRelatedUsers = async () => {
    const response: IUser[] = await GetUserFriends(token);
    setRelatedUsers(response);
    setSearchResults(response);
  };

  const handleSearchInput = (input: string) => {
    setSearchResults(
      relatedUsers.filter((user: IUser) =>
        (user.firstname + user.lastname)
          .toUpperCase()
          .replaceAll(" ", "")
          .includes(input.toUpperCase().replaceAll(" ", ""))
      )
    );
  };

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
          {searchResults.map((user: IUser) => (
            <RelatedUserCard user={user} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
