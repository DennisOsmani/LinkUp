import {
    TextInput,
    View,
    ScrollView,
    Keyboard,
    Pressable,
    Text,
    TouchableOpacity,
} from "react-native";
import { styles } from "./InviteFriendsStyles";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import { GetUserFriends } from "../../../../api/UserAPI";
import { InviteUserCard } from "../InviteUserCard/InviteUserCard";

interface InviteFriendsProps {
    allFriends: IUser[];
    setAllFriends: React.Dispatch<React.SetStateAction<IUser[]>>;
    filteredFriends: IUser[];
    setFilteredFriends: React.Dispatch<React.SetStateAction<IUser[]>>;
    invitedFriends: IUser[];
    setInvitedFriends: React.Dispatch<React.SetStateAction<IUser[]>>;
    handleSendInvites: () => void;
}

export default function InviteFriends({
    setAllFriends,
    setFilteredFriends,
    allFriends,
    setInvitedFriends,
    invitedFriends,
    filteredFriends,
    handleSendInvites,
}: InviteFriendsProps) {
    const [searchText, setSearchText] = useState("");

    const calculateAge = (dateBorn: string) => {
        const birthDate = new Date(dateBorn);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    const { token } = useTokenProvider();

    useEffect(() => {
        fetchAllFriends();
    }, []);

    const fetchAllFriends = async () => {
        try {
            const results: IUser[] | undefined = await GetUserFriends(token);
            console.log("HENTET");
            setAllFriends(results);
            setFilteredFriends(results);
        } catch (error) {
            // TODO - setToken("")
            console.error("Error while fetching all friends: " + error);
        }
    };

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        filterFriends(text);
    };

    const filterFriends = (text: string) => {
        if (text === "") {
            setFilteredFriends(allFriends);
        } else {
            const filtered: IUser[] = allFriends?.filter(
                (friend) =>
                    (friend.firstname + " " + friend.lastname)
                        .toLowerCase()
                        .startsWith(text.toLowerCase()) ||
                    friend.lastname.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredFriends(filtered);
        }
    };

    const clearSearchText = () => {
        setSearchText("");
        setFilteredFriends(allFriends);
    };

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent.key === "Enter") {
            Keyboard.dismiss();
            e.preventDefault();
        }
    };

    const handleUninviteClick = (user: IUser) => {
        if (!allFriends) return;

        setInvitedFriends(
            invitedFriends.filter(
                (userIter: IUser) => userIter.userID !== user.userID
            )
        );

        setAllFriends((prevAllFriends) => [...prevAllFriends, user]);
    };

    const handleInviteClick = (user: IUser) => {
        if (!allFriends || !filteredFriends) return;

        setAllFriends(
            allFriends.filter((userIter) => userIter.userID !== user.userID)
        );

        setFilteredFriends(
            filteredFriends.filter((userIter) => userIter.userID !== user.userID)
        );

        if (!invitedFriends.some((userIter) => userIter.userID === user.userID)) {
            setInvitedFriends((prevInvitedFriends) => [...prevInvitedFriends, user]);
        }
    };

    return (
        <>
            <ScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Søk"
                            value={searchText}
                            onChangeText={handleSearchTextChange}
                            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
                            onKeyPress={handleKeyPress}
                        />
                        <Feather style={styles.icon} name="x" onPress={clearSearchText} />
                    </View>

                    {invitedFriends &&
                        invitedFriends.map((user: IUser, index: number) => (
                            <InviteUserCard
                                key={index}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                age={calculateAge(user.dateBorn)}
                                invited={true}
                                onInviteClick={() => handleInviteClick(user)}
                                onUninviteClick={() => handleUninviteClick(user)}
                                imageUrl={user.profileImage!}
                            />
                        ))}

                    {filteredFriends &&
                        filteredFriends.map((user: IUser, index: number) => (
                            <InviteUserCard
                                key={index}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                age={calculateAge(user.dateBorn)}
                                invited={false}
                                onInviteClick={() => handleInviteClick(user)}
                                onUninviteClick={() => handleUninviteClick(user)}
                                imageUrl={user.profileImage!}
                            />
                        ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.saveButton}
                onPress={handleSendInvites}
            >
                <Text style={styles.saveText}>Lukk</Text>
            </TouchableOpacity>
        </>
    );
}
