import { TextInput, View, ScrollView, Text } from "react-native";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/ModelInterfaces";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import { GetUserFriends } from "../../../api/UserAPI";
import { useTokenProvider } from "../../../providers/TokenProvider";

// IF STRING IS EMPTY MAKE IT SHOW ALL USERS (BACKEND)

// TODO
// - Legg til venn knappen med Userraltion API (search)
// - Filtrere usercards alfabetisk (search & friends)
// - Profilbilde
// - Style likt og style med functions
// - Linke hvert kort til profil (search & friends)
// - Ikke få opp seg selv når man søker (search)

export default function FriendsPeople() {
  const [searchText, setSearchText] = useState("");
  const [friendResult, setFriendResult] = useState<IUser[] | undefined>([]);

  const calculateAge = (dateBorn: string) => {
    // Parse the dateBorn string into a JavaScript Date object
    const birthDate = new Date(dateBorn);

    // Get the current date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If the birthday hasn't occurred yet this year, decrement the age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const clearSearchText = () => {
    setSearchText("");
    fetchAllFriends();
  };

  const { token, setToken } = useTokenProvider();

  useEffect(() => {
    // Fetch all friends when the component mounts
    fetchAllFriends();
  }, []);

  const fetchAllFriends = async () => {
    try {
      const results: IUser[] | undefined = await GetUserFriends(token);
      const filteredResults = searchText
        ? results?.filter(
            (user) =>
              user.firstname.charAt(0).toLowerCase() ===
              searchText.toLowerCase()
          )
        : results;
      setFriendResult(filteredResults);
    } catch (error) {
      console.error("Error while fetching all friends: " + error);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    // If the search text is empty, fetch all friends
    if (!text.trim()) {
      fetchAllFriends();
    }
  };

  const handleKeyPress = (nativeEvent: any) => {
    if (nativeEvent.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const results: IUser[] | undefined = await GetUserFriends(
        searchText,
        token
      );
      setFriendResult(results);
    } catch (error) {
      console.error("Error while finding users friends: " + error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Søk"
            value={searchText}
            onChangeText={handleSearchTextChange}
            onSubmitEditing={handleSearch}
            onKeyPress={handleKeyPress}
          ></TextInput>
          <Feather style={styles.icon} name="x" onPress={clearSearchText} />
        </View>

        {friendResult &&
          friendResult
            .filter(
              (friend) =>
                friend.firstname
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                friend.lastname.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((user: IUser, index: number) => (
              <UserCardFriends
                key={index}
                userCardInfo={{
                  firstname: user.firstname,
                  lastname: user.lastname,
                  age: calculateAge(user.dateBorn),
                }}
              ></UserCardFriends>
            ))}
      </View>
    </ScrollView>
  );
}
