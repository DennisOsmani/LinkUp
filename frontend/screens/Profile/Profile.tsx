import { View, Text, Image, Pressable, TextInput, Switch } from "react-native";
import { styles } from "./ProfileStyles";
import { getUser } from "../../api/UserAPI";
import { useTokenProvider } from "../../providers/TokenProvider";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/ModelInterfaces";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

// interface ProfileInfo {
//   image?: string;
//   created?: number;
//   joined?: number;
//   bails?: number;
//   firstname: string;
//   lastname: string;
//   phone?: string;
//   email: string;
//   gender?: string;
//   age?: number;
//   relationshipStatus?: string;
//   description?: string;
// }

// interface ProfileProps {
//   profileInfo: ProfileInfo;
//   onPressEdit: () => void;
// }

export default function Profile() {
  const { token } = useTokenProvider();
  const [profile, setProfile] = useState<IUser>();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProfile();
  }, [isFocused]);

  const fetchProfile = async () => {
    const user = await getUser(token);
    setProfile(user);
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

  const defineRelationshipStatus = (relStatus: string) => {
    switch (relStatus) {
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Vises kun etter rediger knappen er trykket!! */}
        <Pressable
          onPress={() => console.log("NUDES")}
          style={styles.uploadContainer}
        >
          <Feather name="upload" size={16} color="white" />
        </Pressable>
        <Image
          style={styles.imageContainer}
          source={require("../../assets/cbum.jpg")}
        ></Image>
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
          <Text style={styles.legendText}>Navn</Text>
          <View style={styles.inputBoxRegular}>
            <TextInput
              style={styles.inputText}
              value={profile?.firstname + " " + profile?.lastname}
            ></TextInput>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legendText}>Telefonnummer</Text>
          <View style={styles.inputBoxRegular}>
            <TextInput
              style={styles.inputText}
              value={profile?.phone}
            ></TextInput>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legendText}>Mail</Text>
          <View style={styles.inputBoxRegular}>
            <TextInput
              style={styles.inputText}
              value={profile?.email}
            ></TextInput>
          </View>
        </View>

        <View style={styles.smallBoxesContainer}>
          <View style={styles.legendContainerSmallBox}>
            <Text style={styles.legendTextSmallBox}>Kjønn</Text>
            <View style={styles.inputBoxSmall}>
              <TextInput
                style={styles.inputText}
                value={profile?.gender === "F" ? "Kvinne" : "Mann"}
              ></TextInput>
            </View>
          </View>

          <View style={styles.legendContainerSmallBox}>
            <Text style={styles.legendTextSmallBox}>Alder</Text>
            <View style={styles.inputBoxSmall}>
              <TextInput
                style={styles.inputText}
                value={
                  calculateAge(profile?.dateBorn ? profile.dateBorn : "") +
                  " år"
                }
              ></TextInput>
            </View>
          </View>

          <View style={styles.legendContainerSmallBox}>
            <Text style={styles.legendTextSmallBox}>Sivilstatus</Text>
            <View style={styles.inputBoxSmall}>
              <TextInput
                style={styles.inputText}
                value={defineRelationshipStatus(
                  profile?.relationshipStatus?.toString()
                    ? profile.relationshipStatus.toString()
                    : ""
                )}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.legendContainer}>
          <Text style={styles.legendText}>Bio</Text>
          <View style={styles.inputBoxBig}>
            <TextInput
              style={styles.inputTextBig}
              value={profile?.description}
            ></TextInput>
          </View>
        </View>

        <View style={styles.editButton}>
          <Pressable onPress={() => console.log("RAY")}>
            <Text style={styles.editButtonText}>Rediger</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
