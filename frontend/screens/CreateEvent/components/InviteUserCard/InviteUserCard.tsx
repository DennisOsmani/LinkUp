import { View, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./InviteUserCardStyles";

interface InviteUserCardProps {
  firstname: string;
  lastname: string;
  age: number;
  invited: boolean;
  onInviteClick: () => void;
  onUninviteClick: () => void;
  imageUrl: string;
}

export function InviteUserCard({
  firstname,
  lastname,
  age,
  invited,
  onInviteClick,
  onUninviteClick,
  imageUrl,
}: InviteUserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image}></Image>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Feather name="user" style={styles.icon}></Feather>
            <Text style={styles.textName}>{firstname}</Text>
            <Text style={styles.textName}>{lastname}</Text>
          </View>
          <Text style={styles.textAge}>
            {age} <Text style={styles.textAge}>år</Text>
          </Text>

          {!invited && (
            <View style={styles.inviteButtonWrapper}>
              <Pressable onPress={onInviteClick} style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Inviter</Text>
              </Pressable>
            </View>
          )}

          {invited && (
            <View style={styles.inviteButtonWrapper}>
              <Pressable
                onPress={onUninviteClick}
                style={styles.uninviteButton}
              >
                <Text style={styles.uninviteButtonText}>Fjern</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
