import { TextInput, View, ScrollView, Alert } from "react-native";
import { UserCardSearch } from "../../../components/UserCard/UserCardSearch";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import { UserCardPending } from "../../../components/UserCard/UserCardPending";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SearchUsers,
  GetUserFriends,
  GetPendingFriendRequests,
} from "../../../api/UserAPI";
import { IUser, UserRelationType } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import { CreateUserRelation } from "../../../api/UserRelationAPI";

// When register, add date of birth ??

// TODO
// - TRELLO

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<IUser[] | undefined>([]);
  const [friends, setFriends] = useState<IUser[]>([]);
  const [pending, setPending] = useState<IUser[]>([]);

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

  const { token, setToken, userId } = useTokenProvider();

  useEffect(() => {
    fetchFriends();
    fetchPending();
  }, []);

  const fetchFriends = async () => {
    try {
      const friends: IUser[] = await GetUserFriends(token);
      setFriends(friends);
    } catch (error) {
      console.error("Error in fetching users friends (Search) " + error);
    }
  };

  const fetchPending = async () => {
    try {
      const pendings: IUser[] = await GetPendingFriendRequests(token);
      setPending(pendings);
    } catch (error) {
      console.error(
        "Error in fetching users pending friend requests from logged in user (Search) " +
          error
      );
    }
  };

  const handleSendFriendRequest = async (otherId: string) => {
    try {
      await CreateUserRelation(token, {
        userId: "",
        otherUserId: otherId,
        type: UserRelationType.PENDING_FIRST_SECOND,
      });
      Alert.alert("Venneforespørsel er sendt!");
      clearSearchText();
    } catch (error) {
      console.error("Error in sending a friendRequest (search) " + error);
    }
  };

  // ------------------------------------------------------------------------
  // SKAL DETTE VÆRE HER ELLER ET ANNET STED??????
  // SKAL DET VÆRE EN EGEN NOTIFICATIONS SIDE...??

  //  --------------------------------------------------------------^^^^^^^^

  const clearSearchText = () => {
    setSearchText("");
    setSearchResult([]);
  };

  const handleSearch = async () => {
    try {
      const results: IUser[] | undefined = await SearchUsers(searchText, token);

      if (results.some((id) => id.userID === userId)) {
        const filteredResults = results.filter(
          (user) => user.userID !== userId
        );
        setSearchResult(filteredResults);
      } else {
        setSearchResult(results);
      }
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
          searchResult.map((user: IUser, index: number) => {
            // Check if the logged-in user's friends list contains the current user
            const isFriend = friends.some(
              (friend) => friend.userID === user.userID
            );

            const isPendig = pending.some(
              (pending) => pending.userID === user.userID
            );

            if (isFriend) {
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
            } else if (isPendig) {
              return (
                <UserCardPending
                  key={index}
                  userCardInfo={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    age: calculateAge(user.dateBorn),
                  }}
                ></UserCardPending>
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
                  onPressButton={() => handleSendFriendRequest(user.userID)}
                ></UserCardSearch>
              );
            }
          })}
      </View>
    </ScrollView>
  );
}
