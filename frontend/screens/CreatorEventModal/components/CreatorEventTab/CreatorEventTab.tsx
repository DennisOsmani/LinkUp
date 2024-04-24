import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
} from "react-native";
import { IEvent, ILocation } from "../../../../interfaces/ModelInterfaces";
import { styles } from "./CreatorEventTabStyles";
import { Feather } from "@expo/vector-icons";
import { updateEventParticipation } from "../../../../api/EventRelationAPI";
import { useTokenProvider } from "../../../../providers/TokenProvider";

interface EventTabProps {
    event: IEvent | undefined;
    setEventModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatorEventTab({
    event,
    setEventModalVisible,
}: EventTabProps) {
    const { token } = useTokenProvider();

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
                // Only show time for endDateTime if it's the same day
                return `${formatDateTime(startDateTime)} - ${formatTime(endDateTime)}`;
            } else {
                return `${formatDateTime(startDateTime)} - ${formatDateTime(endDateTime)}`;
            }
        } else {
            return formatDateTime(startDateTime);
        }
    };

    const convertLocationToText = (): string => {
        const location: ILocation | undefined = event?.location;
        if (!location?.address && !location?.city && !location?.country)
            return "Adressen er ikke definert";

        return `${location?.address ? location.address + "," : ""} ${location?.city} ${location?.country}`;
    };

    const getEnrolledCount = (): string => {
        // TODO
        return "";
    };

    const leaveEventThenRedirect = async () => {
        if (!event) return;

        await updateEventParticipation(event.eventID, "BAILED", token);
        setEventModalVisible(false);
    };

    const handleLeaveEvent = () => {
        Alert.alert(
            "Advarsel",
            "Denne handlingen vil gi deg høyere bailscore. Vil du forlate eventet?",
            [
                {
                    text: "Nei",
                    style: "cancel",
                },
                {
                    text: "Ja",
                    onPress: leaveEventThenRedirect,
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.eventTabContainer}>
                <Image
                    style={styles.imageContainer}
                    source={{ uri: event?.frontImage }}
                />

                <View style={styles.firstRowWrapper}>
                    <View style={styles.visibility}>
                        <Text style={styles.visibilityText}>
                            {convertVisibilityToText()}
                        </Text>
                    </View>
                    <View style={styles.datetime}>
                        <Feather name="clock" size={25} color="black" />
                        <Text style={styles.datetimeText}>{convertDatetimeToText()}</Text>
                    </View>
                </View>

                <View style={styles.secondRowWrapper}>
                    <Text style={styles.eventNameText}>{event?.eventName}</Text>
                    <View style={styles.locationWrapper}>
                        <Feather name="map-pin" size={25} color="black" />
                        <Text style={styles.locationText}>{convertLocationToText()} </Text>
                    </View>
                </View>

                <View style={styles.thirdRowWrapper}>
                    <Text style={styles.enrolledText}>Påmeldte</Text>
                    <View style={styles.enrolledBarOutline}>
                        <View style={styles.enrolledBar} />
                        <Text style={styles.enrolledCount}>{getEnrolledCount()}30/40</Text>
                    </View>
                </View>

                {event?.eventDescription && (
                    <View style={styles.fourthRowWrapper}>
                        <Text style={styles.descriptionHeader}>Beskrivelse</Text>
                        <View style={styles.descriptionBox}>
                            <Text style={styles.description}>{event?.eventDescription}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleLeaveEvent}
                        style={styles.leaveEventButton}
                    >
                        <Text style={styles.leaveEventButtonText}>Forlat Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
