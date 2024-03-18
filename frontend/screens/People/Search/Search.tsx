import { TextInput, View, ScrollView, Text } from "react-native";
import { UserCard } from "../../../components/UserCard/UserCard";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { SearchUsers } from "../../../api/UserAPI";

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const clearSearchText = () => {
    setSearchText("");
    setSearchResult([]);
  };

  const handleSearch = async () => {
    try {
      if (searchText.trim() !== "") {
        const results = await SearchUsers(searchText);
        setSearchResult(results);
      } else {
        setSearchResult([]);
      }
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
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        {searchResult ? (
          searchResult.map((user, index: number) => (
            <UserCard
              key={index}
              userCardInfo={user}
              onPressButon={() => {}}
            ></UserCard>
          ))
        ) : (
          <Text>Mordi</Text>
        )}
      </View>
    </ScrollView>
  );
}
