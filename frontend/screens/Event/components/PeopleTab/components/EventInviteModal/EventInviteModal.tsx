import { Modal, View, Text, Pressable, TextInput, Alert } from "react-native";
import { styles } from "./EventInviteModalStyles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../../../styles/colors";
import { useEffect } from "react";
import { GetUserFriends } from "../../../../../../api/UserAPI";
import { useTokenProvider } from "../../../../../../providers/TokenProvider";

interface EventInviteModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventInvteModal({
  modalVisible,
  setModalVisible,
}: EventInviteModal) {
  const { token } = useTokenProvider();

  useEffect(() => {
    fetchAllFriends();
    console.log("Triggered");
  }, []);

  const fetchAllFriends = async () => {
    try {
      await GetUserFriends(token);
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

          <View style={styles.cardContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Text>{num}</Text>
            ))}
          </View>

          <Pressable style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Inviter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
