import {
  Modal,
  View,
  Image,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  IUser,
  IUserRelation,
  UserRelationType,
} from "../../interfaces/ModelInterfaces";
import { Feather } from "@expo/vector-icons";
import styles from "./OtherProfileStyles";
import { useTokenProvider } from "../../providers/TokenProvider";
import {
  UpdateUserRelationType,
  DeleteUserRelation,
  CreateUserRelation,
} from "../../api/UserRelationAPI";
import { useEffect, useState } from "react";

interface OtherProfileProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IUser;
  userRelation: IUserRelation;
  handleBack: () => void;
}

export default function OtherProfile({
  modalVisible,
  setModalVisible,
  profile,
  userRelation,
  handleBack,
}: OtherProfileProps) {
  const goBack = () => {
    handleBack();
  };

  const { token, userID } = useTokenProvider();
  const [updatedUserRelation, setUpdatedUserRelation] =
    useState<IUserRelation>();

  useEffect(() => {
    setUpdatedUserRelation(userRelation);
  }, [userRelation]);

  const handleBlock = async (otherId: string) => {
    try {
      Alert.alert(
        "Blokker bruker",
        "Er du sikker på at du vil blokkere bruker?",
        [
          {
            text: "Tilbake",
            style: "cancel",
          },
          {
            text: "Blokker",
            onPress: async () => {
              if (userRelation === undefined) {
                const newUrBlocked = await CreateUserRelation(token, {
                  userId: "",
                  otherUserId: otherId,
                  type: UserRelationType.BLOCKED_FIRST_SECOND,
                });
                setUpdatedUserRelation(newUrBlocked);
              } else {
                const setUrBlocked = await UpdateUserRelationType(token, {
                  userId: "",
                  otherUserId: otherId,
                  type: UserRelationType.BLOCKED_FIRST_SECOND,
                });
                setUpdatedUserRelation(setUrBlocked);
              }
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error in blocking a user (otherProfile) " + error);
    }
  };

  const handleUnBlock = async (otherId: string) => {
    try {
      Alert.alert(
        "Opphev blokkering",
        "Er du sikker på at du vil oppheve blokkeringen?",
        [
          {
            text: "Tilbake",
            style: "cancel",
          },
          {
            text: "Avblokker",
            onPress: async () => {
              await DeleteUserRelation(token, otherId);
              setUpdatedUserRelation(undefined);
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error in unblocking a user (otherProfile) " + error);
    }
  };

  const handleRemoveFriend = async (otherId: string) => {
    try {
      Alert.alert(
        "Fjern venn",
        "Er du sikker på at du vil fjerne venn?",
        [
          {
            text: "Tilbake",
            style: "cancel",
          },
          {
            text: "Fjern",
            onPress: async () => {
              await DeleteUserRelation(token, otherId);
              setUpdatedUserRelation(undefined);
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error in removing a friend (otherProfile) " + error);
    }
  };

  const handleSendFriendRequest = async (otherId: string) => {
    try {
      const newUr = await CreateUserRelation(token, {
        userId: "",
        otherUserId: otherId,
        type: UserRelationType.PENDING_FIRST_SECOND,
      });
      setUpdatedUserRelation(newUr);
    } catch (error) {
      console.error("Error in sending a friendRequest (otherProfile) " + error);
    }
  };

  const handleAcceptRequest = async (otherId: string) => {
    try {
      const updatedUr = await UpdateUserRelationType(token, {
        userId: "",
        otherUserId: otherId,
        type: UserRelationType.FRIENDS,
      });
      setUpdatedUserRelation(updatedUr);
    } catch (error) {
      console.error(
        "Error in accepting a friendRequest (otherProfile) " + error
      );
    }
  };

  const handleRejectRequest = async (otherId: string) => {
    try {
      Alert.alert(
        "Avslå venneforespørsel",
        "Er du sikker på at du vil avslå?",
        [
          {
            text: "Tilbake",
            style: "cancel",
          },
          {
            text: "Avslå",
            onPress: async () => {
              await DeleteUserRelation(token, otherId);
              setUpdatedUserRelation(undefined);
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(
        "Error in rejecting a friendRequest (otherProfile) " + error
      );
    }
  };

  const handeleRemovePendingRequest = async (otherId: string) => {
    try {
      Alert.alert(
        "Avbryt venneforespørsel",
        "Er du sikker på at du vil trekke tilbake venneforespørselen?",
        [
          {
            text: "Tilbake",
            style: "cancel",
          },
          {
            text: "Fjern",
            onPress: async () => {
              await DeleteUserRelation(token, otherId);
              setUpdatedUserRelation(undefined);
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(
        "Error in removing a sent/pending friendRequest (otherProfile) " + error
      );
    }
  };

  const defineRelationshipStatus = (relStatuses: string) => {
    switch (relStatuses) {
      case "0":
        return "Gift";
      case "1":
        return "Forhold";
      case "2":
        return "Singel";
      case "3":
        return "Komplisert";
      default:
        return "?";
    }
  };

  const calculateAge = (dateBorn: string) => {
    if (dateBorn === undefined) {
    }
    const birthDate = new Date(dateBorn);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age.toString();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Feather
            name="chevron-left"
            style={styles.icon}
            onPress={goBack}
          ></Feather>
          {(updatedUserRelation &&
            updatedUserRelation.type ===
              UserRelationType.BLOCKED_FIRST_SECOND &&
            userID === updatedUserRelation.user_first_ID) ||
          (updatedUserRelation?.type ===
            UserRelationType.BLOCKED_SECOND_FIRST &&
            userID === updatedUserRelation.user_second_ID) ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleUnBlock(profile.userID)}
            >
              <Text style={styles.blockText}>Avblokker</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleBlock(profile.userID)}
            >
              <Text style={styles.blockText}>Blokker</Text>
            </TouchableOpacity>
          )}
        </View>

        <Image
          style={styles.image}
          source={{ uri: profile?.profileImage }}
        ></Image>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {profile?.firstname + " " + profile?.lastname}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.statsText}>Opprettet</Text>
            <Text style={styles.statsText}>{profile?.eventsCreated}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsText}>Deltatt</Text>
            <Text style={styles.statsText}>{profile?.eventsJoined}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsText}>Bails</Text>
            <Text style={styles.statsText}>{profile?.eventBails}</Text>
          </View>
        </View>

        <View style={styles.foregroundCard}>
          <View style={styles.legendContainer}>
            <Text style={styles.legendText}>Telefonnummer</Text>
            <View style={styles.inputBoxRegular}>
              <Text style={styles.inputText}>{profile?.phone}</Text>
            </View>
          </View>

          <View style={styles.smallBoxesContainer}>
            <View style={styles.legendContainerSmallBox}>
              <Text style={styles.legendTextSmallBox}>Kjønn</Text>
              <View style={styles.inputBoxSmall}>
                <Text style={styles.inputText}>
                  {profile?.gender === "F"
                    ? "Kvinne"
                    : profile?.gender === "M"
                    ? "Mann"
                    : "Annet"}
                </Text>
              </View>
            </View>

            <View style={styles.legendContainerSmallBox}>
              <Text style={styles.legendTextSmallBox}>Alder</Text>
              <View style={styles.inputBoxSmall}>
                <Text style={styles.inputText}>
                  {calculateAge(profile?.dateBorn ? profile.dateBorn : "") +
                    " år"}
                </Text>
              </View>
            </View>

            <View style={styles.legendContainerSmallBox}>
              <Text style={styles.legendTextSmallBox}>Sivilstatus</Text>
              <View style={styles.inputBoxSmall}>
                <Text style={styles.inputText}>
                  {defineRelationshipStatus(
                    profile?.relationshipStatus?.toString()
                      ? profile.relationshipStatus.toString()
                      : ""
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.legendContainerBigBox}>
            <Text style={styles.legendText}>Bio</Text>
            <ScrollView style={styles.inputBoxBig}>
              <Text style={styles.inputTextBig}>{profile?.description}</Text>
            </ScrollView>

            <View style={styles.button}>
              {updatedUserRelation &&
              /* Fjern venn hvis UserCardFriend er pressed */
              updatedUserRelation.type === UserRelationType.FRIENDS ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.removeFriendButton}
                  onPress={() => handleRemoveFriend(profile.userID)}
                >
                  <Text style={styles.removeFriendButtonText}>Fjern venn</Text>
                </TouchableOpacity>
              ) : /* Legg til venn hvis UserCardSearch er pressed */
              updatedUserRelation === undefined ||
                updatedUserRelation === null ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.addFriendButton}
                  onPress={() => handleSendFriendRequest(profile.userID)}
                >
                  <Text style={styles.addFriendButtonText}>Legg til venn</Text>
                </TouchableOpacity>
              ) : /* Godta/Avslå hvis UserCardAnswer er pressed ? avslå */
              (updatedUserRelation.type ===
                  UserRelationType.PENDING_FIRST_SECOND &&
                  userID === updatedUserRelation.user_second_ID) ||
                (updatedUserRelation.type ===
                  UserRelationType.PENDING_SECOND_FIRST &&
                  userID === updatedUserRelation.user_first_ID) ? (
                <View style={styles.answerButtons}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.acceptFriendButton}
                    onPress={() => handleAcceptRequest(profile.userID)}
                  >
                    <Text style={styles.acceptFriendButtonText}>Godta</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.rejectFriendButton}
                    onPress={() => handleRejectRequest(profile.userID)}
                  >
                    <Text style={styles.rejectFriendButtonText}>Avslå</Text>
                  </TouchableOpacity>
                </View>
              ) : /* Venter på svar hvis UserCardPending er pressed --> Hvis trykker
                        på knappen gjøre sånn at man får opp en alert om å trekke tilbake venneforespørsel*/
              (updatedUserRelation.type ===
                  UserRelationType.PENDING_FIRST_SECOND &&
                  userID === updatedUserRelation.user_first_ID) ||
                (updatedUserRelation.type ===
                  UserRelationType.PENDING_SECOND_FIRST &&
                  userID === updatedUserRelation.user_second_ID) ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.pendingRequestButton}
                  onPress={() => handeleRemovePendingRequest(profile.userID)}
                >
                  <Text style={styles.pendingRequestButtonText}>
                    Venter på svar
                  </Text>
                </TouchableOpacity>
              ) : (
                /* Unblock oppe i hjørnet hvis UserCardBlocked er pressed */
                <Feather name="slash" style={styles.blockedIcon}></Feather>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
