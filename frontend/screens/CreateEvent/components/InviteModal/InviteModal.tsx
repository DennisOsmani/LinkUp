import { Modal, View, Text, Pressable } from "react-native";
import { styles } from "./InviteModalStyles";
import InviteFriends from "../InviteFriends/InviteFriends";
import { IUser } from "../../../../interfaces/ModelInterfaces";
import { useState } from "react";

interface InviteModalProps {
  inviteVisible: boolean;
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InviteModal({
  inviteVisible,
  setInviteVisible,
}: InviteModalProps) {
  const [usersToInvite, setUsersToInvite] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  const handleSendInvites = async () => {
    setInviteVisible(!inviteVisible);

    console.log("SENDING INVITES TO...");
    usersToInvite.forEach((user: string) => console.log(user));
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
          <InviteFriends setUsersToInvite={setUsersToInvite} />
          <Pressable style={styles.saveButton} onPress={handleSendInvites}>
            <Text style={styles.saveText}>Inviter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
