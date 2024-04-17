import { TextInput, View, ScrollView, Alert } from "react-native";
import { UserCardSearch } from "../../../components/UserCard/UserCardSearch";
import { UserCardFriends } from "../../../components/UserCard/UserCardFriends";
import { UserCardPending } from "../../../components/UserCard/UserCardPending";
import { UserCardBlocked } from "../../../components/UserCard/UserCardBlocked";
import styles from "../../People/Search/SearchStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SearchUsers,
  GetUserFriends,
  GetPendingFriendRequests,
  getUser,
  GetUserBlocks,
} from "../../../api/UserAPI";
import {
  IUser,
  IUserRelation,
  UserRelationType,
} from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import { CreateUserRelation } from "../../../api/UserRelationAPI";

// When register, add date of birth ??

// TODO
// - TRELLO
// - Skal man kunne se de som man har blokkert?? feks et grått kort?
// - Skal man kunne se folk som har blokket deg når man søker? (backend implememntasjon i searchUser API)

export default function SearchPeople() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<IUser[] | undefined>([]);
  const [friends, setFriends] = useState<IUser[]>([]);
  const [pending, setPending] = useState<IUser[]>([]);
  const [blocked, setBlocked] = useState<IUser[]>([]);

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

  const { token, setToken, userID } = useTokenProvider();

  useEffect(() => {
    fetchFriends();
    fetchPending();
    fetchBlocked();
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

  const fetchBlocked = async () => {
    try {
      const blocks: IUser[] = await GetUserBlocks(token);
      setBlocked(blocks);
    } catch (error) {
      console.error(
        "Error in fetching the blocked users blocked by the logged in user (Search) " +
          error
      );
    }
  };

  const handleSendFriendRequest = async (otherId: string) => {
    try {
      const ur: IUserRelation | undefined = await CreateUserRelation(token, {
        userId: "",
        otherUserId: otherId,
        type: UserRelationType.PENDING_FIRST_SECOND,
      });

      if (ur?.type === UserRelationType.PENDING_FIRST_SECOND) {
        const user = await getUser(token, ur.user_second_ID);
        setPending((prevState) => [...prevState, user]);
      }

      if (ur?.type === UserRelationType.FRIENDS) {
        const user = await getUser(token, ur.user_second_ID);
        setFriends((prevState) => [...prevState, user]);
      }
    } catch (error) {
      console.error("Error in sending a friendRequest (search) " + error);
    }
  };

  const clearSearchText = () => {
    setSearchText("");
    setSearchResult([]);
  };

  const handleSearch = async () => {
    try {
      if (searchText === "") {
        setSearchResult([]);
        return;
      }
      const results: IUser[] | undefined = await SearchUsers(searchText, token);

      if (results.some((id) => id.userID === userID)) {
        const filterLoggedInUser = results.filter(
          (user) => user.userID !== userID
        );
        setSearchResult(filterLoggedInUser);
      } else {
        // En bokstav fucker opp, mens fra 2 er den bra
        const filtered: IUser[] | undefined = results.filter(
          (user) =>
            (user.firstname + " " + user.lastname)
              .toLowerCase()
              .startsWith(searchText.toLowerCase()) ||
            user.lastname.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setSearchResult(filtered);
      }
    } catch (error) {
      setToken("");
      console.error("Error while searching users: " + error);
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

            const isBlocked = blocked.some(
              (block) => block.userID === user.userID
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
            } else if (isBlocked) {
              return (
                <UserCardBlocked
                  key={index}
                  userCardInfo={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                  }}
                ></UserCardBlocked>
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
