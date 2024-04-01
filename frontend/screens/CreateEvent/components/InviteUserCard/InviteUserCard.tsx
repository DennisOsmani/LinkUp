import { View, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./InviteUserCardStyles";

interface InviteUserCardProps {
  firstname: string;
  lastname: string;
  age: number;
  userId: string;
  setUsersToInvite: React.Dispatch<React.SetStateAction<string[]>>;
  // image: string; SENERE, LEGGE INN MOCK DATA
}

export function InviteUserCard({
  firstname,
  lastname,
  age,
  userId,
  setUsersToInvite,
}: InviteUserCardProps) {
  const handleInvitePressed = () => {
    setUsersToInvite((prev: string[]) => [...prev, userId]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/cbum.jpg")}
          style={styles.image}
        ></Image>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Feather name="user" style={styles.icon}></Feather>
            <Text style={styles.textName}>{firstname}</Text>
            <Text style={styles.textName}>{lastname}</Text>
          </View>
          <Text style={styles.textAge}>
            {age} <Text style={styles.textAge}>år</Text>
          </Text>
          <View style={styles.inviteButtonWrapper}>
            <Pressable
              onPress={handleInvitePressed}
              style={styles.inviteButton}
            >
              <Text style={styles.inviteButtonText}>Inviter</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
