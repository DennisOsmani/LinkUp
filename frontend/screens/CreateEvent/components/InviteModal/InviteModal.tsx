import { Modal, View, Text, Pressable } from "react-native";
import { styles } from "./InviteModalStyles";
import InviteFriends from "../InviteFriends/InviteFriends";
import { IUser } from "../../../../interfaces/ModelInterfaces";
import { useState } from "react";

interface InviteModalProps {
  inviteVisible: boolean;
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  usersToInvite: Set<string>;
  setUsersToInvite: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function InviteModal({
  inviteVisible,
  setInviteVisible,
  usersToInvite,
  setUsersToInvite,
}: InviteModalProps) {
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<IUser[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[]>([]);

  const handleSendInvites = async () => {
    const ids: string[] = invitedFriends.map((user: IUser) => user.userID);

    setUsersToInvite((prevState) => {
      const updatedState = new Set(prevState);
      ids.forEach((id) => updatedState.add(id));
      return updatedState;
    });

    setInviteVisible(!inviteVisible);
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
          <InviteFriends
            invitedFriends={invitedFriends}
            setInvitedFriends={setInvitedFriends}
            allFriends={allFriends}
            setAllFriends={setAllFriends}
            filteredFriends={filteredFriends}
            setFilteredFriends={setFilteredFriends}
          />
          <Pressable style={styles.saveButton} onPress={handleSendInvites}>
            <Text style={styles.saveText}>Lukk</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
