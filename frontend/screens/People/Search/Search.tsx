// heheh
import { TextInput, View, ScrollView } from "react-native";
import { UserCard } from "../../../components/UserCard/UserCard";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchPeople() {
  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} placeholder="Søk"></TextInput>
          <Feather style={styles.icon} name="x" />
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
