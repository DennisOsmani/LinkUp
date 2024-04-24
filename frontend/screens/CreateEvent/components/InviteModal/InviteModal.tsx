import { Modal, View } from "react-native";
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
  setUsersToInvite,
}: InviteModalProps) {
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<IUser[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[]>([]);

  const handleSendInvites = async () => {
    const ids: string[] = invitedFriends.map((user: IUser) => user.userID);

    setUsersToInvite(new Set(ids));

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
            handleSendInvites={handleSendInvites}
          />
        </View>
      </View>
    </Modal>
  );
}
