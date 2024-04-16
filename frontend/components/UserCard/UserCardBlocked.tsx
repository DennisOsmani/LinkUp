import { View, Image, Text } from "react-native";
import styles from "./UserCardStyles";
import { Feather } from "@expo/vector-icons";

// Legge inn Pressable --> sendes til Other Profile

// For search in People Screen
interface UserCardInfo {
  firstname: string;
  lastname: string;
  // image: string; SENERE, LEGGE INN MOCK DATA
}

interface UserCardProps {
  userCardInfo: UserCardInfo;
}

export function UserCardBlocked({ userCardInfo }: UserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/cbum.jpg")}
          style={styles.image}
        ></Image>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Feather name="user" style={styles.icon}></Feather>
            <Text style={styles.textName}>{userCardInfo.firstname}</Text>
            <Text style={styles.textName}>{userCardInfo.lastname}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
