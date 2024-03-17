// heheh
import { TextInput, View, ScrollView } from "react-native";
import { UserCard } from "../../../components/UserCard/UserCard";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
 

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");

  const clearSearchText = () => {
    setSearchText("");
  }

  // Filter the userCArds baswed on the searchText
  // Need USER_DATA or all USERS from API in backend, 
  // so we can filter the cards out based on firstname and lastname
  // const filterUserCards = 
  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} placeholder="Søk" onChangeText={setSearchText} value={searchText}></TextInput>
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
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
        <UserCard
          userCardInfo={{
            firstname: "mordi",
            lastname: "fardin",
            age: "27 år",
          }}
          onPressButon={() => {}}
        ></UserCard>
      </View>
    </ScrollView>
  );
}
