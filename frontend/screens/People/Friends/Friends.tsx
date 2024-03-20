import { TextInput, View, ScrollView, Text } from "react-native";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/ModelInterfaces";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import { GetUserFriends } from "../../../api/UserAPI";
import { useTokenProvider } from "../../../providers/TokenProvider";

// TODO
// - Profilbilde (search & friends)
// - Linke hvert kort til profil (search & friends)

export default function FriendsPeople() {
  const [searchText, setSearchText] = useState("");
  const [allFriends, setAllFriends] = useState<IUser[] | undefined>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[] | undefined>(
    []
  );

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
    // Fetch all friends when the component mounts
    fetchAllFriends();
  }, []);

  const fetchAllFriends = async () => {
    try {
      const results: IUser[] | undefined = await GetUserFriends(token);
      setAllFriends(results);
      setFilteredFriends(results);
    } catch (error) {
      console.error("Error while fetching all friends: " + error);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    filterFriends(text);
  };

  const filterFriends = (text: string) => {
    if (text === "") {
      setFilteredFriends(allFriends);
    } else {
      const filtered: IUser[] | undefined = allFriends?.filter(
        (friend) =>
          (friend.firstname + " " + friend.lastname)
            .toLowerCase()
            .startsWith(text.toLowerCase()) ||
          friend.lastname.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  const clearSearchText = () => {
    setSearchText("");
    fetchAllFriends();
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
          ></TextInput>
          <Feather style={styles.icon} name="x" onPress={clearSearchText} />
        </View>

        {filteredFriends &&
          filteredFriends.map((user: IUser, index: number) => (
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
