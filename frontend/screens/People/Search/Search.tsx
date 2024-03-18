import { TextInput, View, ScrollView, Text } from "react-native";
import { UserCard } from "../../../components/UserCard/UserCard";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { SearchUsers } from "../../../api/UserAPI";

export interface User {
  userID: string;
  firstname: string;
  lastname: string;
  dateBorn: string;
  phone?: string;
  RelationshipStatus?: number;
  gender?: string;
  description?: string;
  email?: string;
  profileImage?: string;
  password?: string;
  salt?: string;
  eventsCreated?: number;
  eventsJoined?: number;
  role?: number;
  userRelationsAsFirst?: [];
  userRelationsAsSecond?: [];
  eventRelations?: [];
}

// IF STRING IS EMPTY MAKE IT SHOW ALL USERS (BACKEND)

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<User[] | undefined>([]);

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
    setSearchResult([]);
  };

  const handleSearch = async () => {
    try {
      const results: User[] | undefined = await SearchUsers(searchText);
      setSearchResult(results);
    } catch (error) {
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
          searchResult.map((user: User, index: number) => (
            <UserCard
              key={index}
              userCardInfo={{
                firstname: user.firstname,
                lastname: user.lastname,
                age: calculateAge(user.dateBorn),
              }}
              onPressButon={() => {}}
            ></UserCard>
          ))}
      </View>
    </ScrollView>
  );
}
