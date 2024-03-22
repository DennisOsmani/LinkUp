import { TextInput, View, ScrollView, Text } from "react-native";
import styles from "./FriendsModalStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../../interfaces/ModelInterfaces";
import { getUserFriendEvents } from "../../../../api/EventAPI";
import { useTokenProvider } from "../../../../providers/TokenProvider";

// TODO
// - Profilbilde (search & friends)

export default function FriendsPeople() {
  const [searchText, setSearchText] = useState("");
  const [allFriends, setAllFriends] = useState<IUser[] | undefined>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[] | undefined>(
    []
  );

  const calculateAge = (dateBorn: string) => {
    const birthDate = new Date(dateBorn);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const { token } = useTokenProvider();

  useEffect(() => {
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
