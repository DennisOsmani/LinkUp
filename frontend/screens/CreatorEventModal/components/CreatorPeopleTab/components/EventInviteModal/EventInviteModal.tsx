import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { styles } from "./EventInviteModalStyles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../../../styles/colors";
import { useEffect, useState } from "react";
import { GetUserFriends } from "../../../../../../api/UserAPI";
import { useTokenProvider } from "../../../../../../providers/TokenProvider";
import { IUser } from "../../../../../../interfaces/ModelInterfaces";
import InviteUserCard from "../InviteUserCard/InviteUserCard";

interface EventInviteModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventInvteModal({
  modalVisible,
  setModalVisible,
}: EventInviteModal) {
  const [friends, setFriends] = useState<IUser[]>([]);
  const { token } = useTokenProvider();

  useEffect(() => {
    fetchAllFriends();
  }, []);

  const fetchAllFriends = async () => {
    try {
      const response: IUser[] = await GetUserFriends(token);
      setFriends(response);
    } catch (error) {
      console.error(error);
      Alert.alert("Noe gikk feil!", "Lukk eventet, prøv å åpne på nytt!");
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.container}>
        <View style={styles.modalCard}>
          <View style={styles.firstRow}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.x}>X</Text>
            </Pressable>
            <Text style={styles.x}>Inviter venner</Text>
          </View>

          <View style={styles.searchBar}>
            <Feather
              style={styles.feather}
              name="search"
              size={26}
              color={colors.grey}
            />
            <TextInput placeholder="Søk ..." style={styles.searchInput} />
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.cardContainer}>
              {friends.map((user: IUser) => (
                <InviteUserCard user={user} />
              ))}
            </View>
          </ScrollView>

          <Pressable style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Inviter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
