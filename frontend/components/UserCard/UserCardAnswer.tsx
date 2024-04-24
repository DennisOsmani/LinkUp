import { View, Image, Text, Pressable } from "react-native";
import styles from "./UserCardStyles";
import { Feather } from "@expo/vector-icons";
import { IUser } from "../../interfaces/ModelInterfaces";

// For search in People Screen
interface UserCardInfo {
  firstname: string;
  lastname: string;
  age: number;
  profileImage: string;
}

interface UserCardProps {
  userCardInfo: UserCardInfo;
  onPressAccept: () => void;
  onPressReject: () => void;
  onPressCard: () => void;
}

export function UserCardAnswer({
  userCardInfo,
  onPressAccept,
  onPressReject,
  onPressCard,
}: UserCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPressCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: userCardInfo.profileImage }}
          style={styles.image}
        ></Image>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Feather name="user" style={styles.icon}></Feather>
            <Text style={styles.textName}>{userCardInfo.firstname}</Text>
            <Text style={styles.textName}>{userCardInfo.lastname}</Text>
          </View>
          <Text style={styles.textAge}>
            {userCardInfo.age} <Text style={styles.textAge}>år</Text>
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonAccept} onPress={onPressAccept}>
              <Text style={styles.buttonTextAccept}>Godta</Text>
            </Pressable>
            <Pressable style={styles.buttonReject} onPress={onPressReject}>
              <Text style={styles.buttonTextReject}>Avslå</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
