import { Modal, View, Image, Text, Pressable } from "react-native";
import {
  IUser,
  IUserRelation,
  UserRelationType,
} from "../../interfaces/ModelInterfaces";
import { Feather } from "@expo/vector-icons";
import styles from "./OtherProfileStyles";
import { useTokenProvider } from "../../providers/TokenProvider";

interface OtherProfileProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IUser;
  userRelation: IUserRelation;
}

export default function OtherProfile({
  modalVisible,
  setModalVisible,
  profile,
  userRelation,
}: OtherProfileProps) {
  const handleBack = () => setModalVisible(false);
  const { userID } = useTokenProvider();

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
            onPress={handleBack}
          ></Feather>
          <Pressable onPress={() => console.log("Blocked bitch")}>
            <Text style={styles.blockText}>Blokker</Text>
          </Pressable>
        </View>

        <Image
          style={styles.image}
          source={require("../../assets/cbum.jpg")}
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
          {/* <View style={styles.legendContainer}>
            <Text style={styles.legendText}>Navn</Text>
            <View style={styles.inputBoxRegular}>
              <Text style={styles.inputText}>
                {profile?.firstname + " " + profile?.lastname}
              </Text>
            </View>
          </View> */}
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
                  {profile?.gender === "F" ? "Kvinne" : "Mann"}
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
            <View style={styles.inputBoxBig}>
              <Text style={styles.inputTextBig}>{profile?.description}</Text>
            </View>
            <View style={styles.button}>
              {userRelation &&
              /* Fjern venn hvis UserCardFriend er pressed */
              userRelation.type === UserRelationType.FRIENDS ? (
                <Pressable
                  style={styles.removeFriendButton}
                  onPress={() => console.log("SLETTA!")}
                >
                  <Text style={styles.removeFriendButtonText}>Fjern venn</Text>
                </Pressable>
              ) : /* Legg til venn hvis UserCardSearch er pressed */
              userRelation === undefined || userRelation === null ? (
                <Pressable
                  style={styles.addFriendButton}
                  onPress={() => console.log("friend request sent!")}
                >
                  <Text style={styles.addFriendButtonText}>Legg til venn</Text>
                </Pressable>
              ) : /* Godta/Avslå hvis UserCardAnswer er pressed ? avslå */
              userRelation.type === UserRelationType.PENDING_FIRST_SECOND &&
                userID === userRelation.user_second_ID ? (
                <Pressable onPress={() => console.log("Venn lagt til!")}>
                  <Text style={styles.addFriendButtonText}>Godta</Text>
                </Pressable>
              ) : /* Venter på svar hvis UserCardPending er pressed */
              userRelation.type === UserRelationType.PENDING_FIRST_SECOND &&
                userID === userRelation.user_first_ID ? (
                <Pressable
                  style={styles.pendingRequestButton}
                  onPress={() => console.log("PENDING")}
                >
                  <Text style={styles.pendingRequestButtonText}>
                    Venter på svar
                  </Text>
                </Pressable>
              ) : (
                <Text>Moren din</Text>
                /* Unblock oppe i hjørnet hvis UserCardBlocked er pressed */
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
