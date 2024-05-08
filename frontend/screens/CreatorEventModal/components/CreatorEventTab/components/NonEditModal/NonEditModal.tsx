import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    IEvent,
    ILocation,
} from "../../../../../../interfaces/ModelInterfaces";
import { styles } from "./NonEditModalStyles";
import { Feather } from "@expo/vector-icons";
import { updateEventParticipation } from "../../../../../../api/EventRelationAPI";
import { useTokenProvider } from "../../../../../../providers/TokenProvider";
import {
    deleteEvent,
    getEventParticipapionCount,
} from "../../../../../../api/EventAPI";
import { useEffect, useState } from "react";

interface EventTabProps {
    event: IEvent | undefined;
    setEventModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NonEditModal({
    event,
    setEventModalVisible,
    setEdit,
}: EventTabProps) {
    const { token } = useTokenProvider();

    const [participation, setParticipation] = useState<string>("");
    const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
    const [numberOfMaxCapacity, setNumberOfMaxCapacity] = useState<number>(0);

    const getEnrolledCount = async () => {
        if (!event) return;

        const maxCap = event?.maxCapacity ? event.maxCapacity : "∞";
        const numberJoined: number | undefined = await getEventParticipapionCount(
            token,
            event.eventID
        );
        setParticipation(numberJoined + " / " + maxCap);
        setNumberOfParticipants(numberJoined ? numberJoined : 0);
        setNumberOfMaxCapacity(typeof maxCap === "number" ? maxCap : 100);
    };

    useEffect(() => {
        getEnrolledCount();
    }, []);

    const convertVisibilityToText = (): string => {
        switch (event?.visibility) {
            case 0:
                return "Offentlig";
            case 1:
                return "Privat";
            case 2:
                return "Kun venner";
            default:
                return "Offentlig";
        }
    };

    const convertDatetimeToText = () => {
        if (!event) return;

        const startDate: string = event?.eventDateTimeStart.toString();
        const endDate: string = event?.eventDateTimeEnd.toString();

        const startDateTime = new Date(startDate);
        const endDateTime = endDate === "" ? null : new Date(endDate);

        const formatDateTime = (dateTime: Date) => {
            const month = dateTime.toLocaleString("default", { month: "short" });
            const day = dateTime.getDate();
            const formattedTime = formatTime(dateTime);
            return `${day}. ${month} ${formattedTime}`;
        };

        const formatTime = (dateTime: Date) => {
            const hours = dateTime.getHours();
            const minutes = dateTime.getMinutes();
            return `${hours}:${minutes.toString().padStart(2, "0")}`;
        };

        if (endDateTime) {
            const sameDay =
                startDateTime.toDateString() === endDateTime.toDateString();
            if (sameDay) {
                return `${formatDateTime(startDateTime)} - ${formatTime(endDateTime)}`;
            } else {
                return `${formatDateTime(startDateTime)} - ${formatDateTime(
                    endDateTime
                )}`;
            }
        } else {
            return formatDateTime(startDateTime);
        }
    };

    const convertLocationToText = (): string => {
        const location: ILocation | undefined = event?.location;
        if (!location?.address && !location?.city && !location?.country)
            return "Adressen er ikke definert";

        return `${location?.address ? location.address + "," : ""} ${location?.city
            } ${location?.country}`;
    };

    const leaveEventThenRedirect = async () => {
        try {
            if (!event) return;

            await updateEventParticipation(event.eventID, "BAILED", token);
            await deleteEvent(event.eventID, token);
            setEventModalVisible(false);
        } catch (error) {
            console.log("Error while leaving and deleting event: " + error);
        }
    };

    const handleLeaveEvent = () => {
        Alert.alert("Advarsel", "Er du sikker på at du vil slette eventet?", [
            {
                text: "Nei",
                style: "cancel",
            },
            {
                text: "Ja",
                onPress: leaveEventThenRedirect,
            },
        ]);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <View style={styles.eventTabContainer}>
                <ScrollView style={styles.scrollContainer}>
                    <Image
                        style={styles.imageContainer}
                        source={{ uri: event?.frontImage }}
                    />

                    <View style={styles.contentWrapper}>
                        <View style={styles.firstRowWrapper}>
                            <View style={styles.visibility}>
                                <Text style={styles.visibilityText}>
                                    {convertVisibilityToText()}
                                </Text>
                            </View>
                            <View style={styles.datetime}>
                                <Feather name="clock" size={25} color="black" />
                                <Text style={styles.datetimeText}>
                                    {convertDatetimeToText()}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.secondRowWrapper}>
                            <Text style={styles.eventNameText}>{event?.eventName}</Text>
                            <View style={styles.locationWrapper}>
                                <Feather name="map-pin" size={25} color="black" />
                                <Text style={styles.locationText}>
                                    {convertLocationToText()}{" "}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.thirdRowWrapper}>
                            <Text style={styles.enrolledText}>Påmeldte</Text>
                            <View style={styles.enrolledBarOutline}>
                                <View
                                    style={{
                                        ...styles.enrolledBar,
                                        width: `${Math.min(100, (numberOfParticipants * 100) / numberOfMaxCapacity)}%`,
                                    }}
                                />
                                <Text style={styles.enrolledCount}>{participation}</Text>
                            </View>
                        </View>

                        {event?.eventDescription && (
                            <View style={styles.fourthRowWrapper}>
                                <Text style={styles.descriptionHeader}>Beskrivelse</Text>
                                <View style={styles.descriptionBox}>
                                    <Text style={styles.description}>
                                        {event?.eventDescription}
                                    </Text>
                                </View>
                            </View>
                        )}

                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => setEdit(true)}
                                style={styles.editEventButton}
                            >
                                <Text style={styles.editEventButtonText}>Rediger Event</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleLeaveEvent}
                                style={styles.leaveEventButton}
                            >
                                <Text style={styles.leaveEventButtonText}>Slett Event</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
