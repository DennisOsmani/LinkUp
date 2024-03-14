import { View, Image, Text, Pressable } from "react-native";
import styles from "./UserCardStyles";
import { Feather } from "@expo/vector-icons";

// For search in People Screen
interface UserCardInfo {
  firstname: string;
  lastname: string;
  age: string;
}

interface UserCardProps {
  userCardInfo: UserCardInfo;
  onPressButon: () => void;
}

export function UserCard({ userCardInfo, onPressButon }: UserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/cbum.jpg")}
          style={styles.image}
        ></Image>
      </View>
    </View>
  );
}
