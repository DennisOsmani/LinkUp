import { Modal, View, Text, Pressable } from "react-native";
import { styles } from "./InviteModalStyles";

interface InviteModalProps {
  inviteVisible: boolean;
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InviteModal({
  inviteVisible,
  setInviteVisible,
}: InviteModalProps) {
  const handleSendInvites = async () => {
    // TODO
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={inviteVisible}
      onRequestClose={() => setInviteVisible(!inviteVisible)}
    >
      <View style={styles.container}>
        <View style={styles.modalCard}>
          <Pressable
            style={styles.saveButton}
            onPress={() => setInviteVisible(!inviteVisible)}
          >
            <Text style={styles.saveText}>Inviter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
