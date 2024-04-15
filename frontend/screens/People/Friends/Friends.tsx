import { TextInput, View, ScrollView, Text } from "react-native";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { IUser, UserRelationType } from "../../../interfaces/ModelInterfaces";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import {
  GetUserFriends,
  GetUserFriendRequests,
  getUser,
} from "../../../api/UserAPI";
import { useTokenProvider } from "../../../providers/TokenProvider";
import { UserCardAnswer } from "../../../components/UserCard/UserCardAnswer";
import {
  UpdateUserRelationType,
  DeleteUserRelation,
} from "../../../api/UserRelationAPI";

// TODO
// - Profilbilde (search & friends)
// - Linke hvert kort til profil (search & friends)

export default function FriendsPeople() {
  const [searchText, setSearchText] = useState("");
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[]>([]);
  const [allFriendRequests, setAllFriendRequests] = useState<IUser[]>([]);
  const { token, userID } = useTokenProvider();

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

  useEffect(() => {
    fetchAllFriends();
    fetchAllFriendRequests();
  }, []);

  const fetchAllFriends = async () => {
    try {
      const results: IUser[] = await GetUserFriends(token);
      setAllFriends(results);
      setFilteredFriends(results);
    } catch (error) {
      console.error("Error while fetching all friends: " + error);
    }
  };

  const fetchAllFriendRequests = async () => {
    try {
      const results: IUser[] = await GetUserFriendRequests(token);
      setAllFriendRequests(results);
    } catch (error) {
      console.error("Error while fetching all friend requests: " + error);
    }
  };

  const handleAcceptRequest = async (otherId: string) => {
    try {
      const ur = await UpdateUserRelationType(token, {
        userId: "",
        otherUserId: otherId,
        type: UserRelationType.FRIENDS,
      });

      if (ur?.type === UserRelationType.FRIENDS) {
        const user = await getUser(
          token,
          ur.user_first_ID == userID ? ur.user_second_ID : ur.user_first_ID
        );

        setAllFriends((prevState) => [...prevState, user]);
        //NEED TO UPDATE THE FILTERFRIENDS [] TO SHOW THE NEW ADDED FRIEND
        setAllFriendRequests((prevState) =>
          [...prevState].filter((u) => u.userID !== user.userID)
        );
      }

      console.log("Ny venn!!!!");
    } catch (error) {
      console.error("Error in accepting a friendRequest (search) " + error);
    }
  };

  const handleRejectRequest = async (otherId: string) => {
    try {
      await DeleteUserRelation(token, otherId);
      console.log("Vil fæn itte bli din venn!!");
    } catch (error) {
      console.error("Error in rejecting a friendRequest (search) " + error);
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
    setFilteredFriends(allFriends);
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

        {allFriendRequests &&
          allFriendRequests.map((user: IUser, index: number) => (
            <UserCardAnswer
              key={index}
              userCardInfo={{
                firstname: user.firstname,
                lastname: user.lastname,
                age: calculateAge(user.dateBorn),
              }}
              onPressAccept={() => handleAcceptRequest(user.userID)}
              onPressReject={() => handleRejectRequest(user.userID)}
            ></UserCardAnswer>
          ))}

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
