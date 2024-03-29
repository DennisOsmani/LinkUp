import { TextInput, View, ScrollView, Text } from "react-native";
import { UserCardSearch } from "../../../components/UserCard/UserCardSearch";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SearchUsers, GetUserFriends } from "../../../api/UserAPI";
import { IUser } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";

// When register, add date of birth

// TODO
// - Legg til venn knappen med Userraltion API (search)
// - Profilbilde (search & friends)
// - Linke hvert kort til profil (search & friends)
// - Ikke få opp seg selv når man søker (search)
// - Allerede venner skal ikke vises m knapp men som --> (UserCardFriends)

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<IUser[] | undefined>([]);
  const [friends, setFriends] = useState<IUser[]>([]);

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
  
  const { token, setToken } = useTokenProvider();

  useEffect(() => {
      fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
     const friends: IUser[] = await GetUserFriends(token); 
     setFriends(friends);
    } catch (error) {
      console.error("Error in fetching users friends (Search) " + error);
    }}

  const clearSearchText = () => {
    setSearchText("");
    setSearchResult([]);
  };


  const handleSearch = async () => {
    try {
      const results: IUser[] | undefined = await SearchUsers(searchText, token);
      setSearchResult(results);
    } catch (error) {
      setToken("");
      console.error("Error while searching users: " + error);
    }
  };

  const handleKeyPress = (nativeEvent: any) => {
    if (nativeEvent.key === "Enter") {
      handleSearch();
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
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            onKeyPress={handleKeyPress}
          ></TextInput>
          <Feather style={styles.icon} name="x" onPress={clearSearchText} />
        </View>

        {searchResult &&
          searchResult
            .map((user: IUser, index: number) => {

                // Check if the logged-in user's friends list contains the current user
            const isFriend = friends.some(friend => friend.userID === user.userID);

            // Render different user card based on friendship status
            if (isFriend) {
              // Render a different user card for friends

              return (
                <UserCardFriends
                key={index}
                userCardInfo={{
                  firstname: user.firstname,
                  lastname: user.lastname,
                  age: calculateAge(user.dateBorn),
                }}
                ></UserCardFriends>
              );
            } else {
              return (
              <UserCardSearch
                key={index}
                userCardInfo={{
                  firstname: user.firstname,
                  lastname: user.lastname,
                  age: calculateAge(user.dateBorn),
                }}
                onPressButon={() => {}}
              ></UserCardSearch>
               );}
          })}
      </View>
    </ScrollView>
  );
}
