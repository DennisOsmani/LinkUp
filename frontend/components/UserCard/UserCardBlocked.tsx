import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import styles from "./UserCardStyles";
import { Feather } from "@expo/vector-icons";

interface UserCardInfo {
    firstname: string;
    lastname: string;
    profileImage: string;
}

interface UserCardProps {
    userCardInfo: UserCardInfo;
    onPressCard: () => void;
}

export function UserCardBlocked({ userCardInfo, onPressCard }: UserCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.blockedCard, styles.blockedOpacity]}
            onPress={onPressCard}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: userCardInfo.profileImage }}
                    style={styles.image}
                ></Image>
                <View style={styles.blockedContainer}>
                    <Text style={styles.textBlocked}>Blokkert</Text>
                    <View style={styles.iconContainer}>
                        <Feather name="user" style={styles.icon}></Feather>
                        <Text style={styles.textName}>{userCardInfo.firstname}</Text>
                        <Text style={styles.textName}>{userCardInfo.lastname}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
