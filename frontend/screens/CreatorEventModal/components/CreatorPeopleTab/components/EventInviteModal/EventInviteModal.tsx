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
import { getFriendsNotInvited } from "../../../../../../api/UserAPI";
import { useTokenProvider } from "../../../../../../providers/TokenProvider";
import { IUser } from "../../../../../../interfaces/ModelInterfaces";
import InviteUserCard from "../InviteUserCard/InviteUserCard";
import { inviteUsersForEvent } from "../../../../../../api/EventRelationAPI";

interface EventInviteModal {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    eventId: number | undefined;
}

export default function EventInvteModal({
    modalVisible,
    setModalVisible,
    eventId,
}: EventInviteModal) {
    const [friends, setFriends] = useState<IUser[]>([]);
    const [searchResults, setSearchResults] = useState<IUser[]>([]);
    const [friendsToInvite, setFriendsToInvite] = useState<string[]>([]);
    const { token } = useTokenProvider();

    useEffect(() => {
        fetchFriendsNotInvited();
    }, []);

    const fetchFriendsNotInvited = async () => {
        try {
            const response: IUser[] = await getFriendsNotInvited(eventId!, token);
            setFriends(response);
            setSearchResults(response);
        } catch (error) {
            console.error(error);
            Alert.alert("Noe gikk feil!", "Lukk eventet, prøv å åpne på nytt!");
            setModalVisible(false);
        }
    };

    const addUserIdToInviteList = (userId: string) => {
        setFriendsToInvite((prevlist) => [...prevlist, userId]);
        setFriends((prevlist) => prevlist.filter((user) => user.userID !== userId));
        setSearchResults((prevlist) =>
            prevlist.filter((user) => user.userID !== userId)
        );
    };

    const handleCloseAndSendInvites = async () => {
        setModalVisible(false);
        if (friendsToInvite.length === 0) return;
        try {
            await inviteUsersForEvent(eventId!, friendsToInvite, token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (input: string) => {
        setSearchResults(() =>
            friends.filter((u) =>
                (u.firstname + u.lastname)
                    .toUpperCase()
                    .includes(input.replaceAll(" ", "").toUpperCase())
            )
        );
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
                        <Text style={styles.x}>Inviter venner</Text>
                    </View>

                    <View style={styles.searchBar}>
                        <Feather
                            style={styles.feather}
                            name="search"
                            size={26}
                            color={colors.grey}
                        />
                        <TextInput
                            onChangeText={(input) => handleSearch(input)}
                            placeholder="Søk ..."
                            style={styles.searchInput}
                        />
                    </View>

                    <ScrollView style={styles.scrollView}>
                        <View style={styles.cardContainer}>
                            {searchResults.map((user: IUser) => (
                                <InviteUserCard
                                    addUserIdToInviteList={addUserIdToInviteList}
                                    user={user}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <Pressable
                        onPress={handleCloseAndSendInvites}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Lukk</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
