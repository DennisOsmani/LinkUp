import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import { IEvent, ILocation } from "../../../../interfaces/ModelInterfaces";
import { styles } from "./EventTabStyles";
import { Feather } from "@expo/vector-icons";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import { useEffect, useState } from "react";
import { getEventParticipapionCount } from "../../../../api/EventAPI";

interface EventTabProps {
    event: IEvent | null;
    setEventModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    leaveEvent: () => void;
}

export function EventTab({
    event,
    setEventModalVisible,
    leaveEvent,
}: EventTabProps) {
    const { token } = useTokenProvider();
    const [participation, setParticipation] = useState<string>("");
    const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
    const [numberOfMaxCapacity, setNumberOfMaxCapacity] = useState<number>(0);

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

        const startDate: string = event?.eventDateTimeStart;
        const endDate: string = event?.eventDateTimeEnd;

        const startDateTemp = new Date(startDate);
        const endDateTemp = endDate === "" ? null : new Date(endDate);

        const startDateTime = new Date(
            startDateTemp.setHours(startDateTemp.getHours())
        );
        const endDateTime = endDateTemp
            ? new Date(endDateTemp.setHours(endDateTemp.getHours()))
            : null;

        const formatDateTime = (dateTime: Date) => {
            const month = dateTime.toLocaleString("no-NB", { month: "short" });
            const day = dateTime.getDate();
            const formattedTime = formatTime(dateTime);
            return `${day}. ${month} ${formattedTime}`;
        };

        const formatTime = (dateTime: Date) => {
            const hours = dateTime.getHours().toLocaleString();
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

    const leaveEventThenRedirect = async () => {
        if (!event) return;

        leaveEvent();
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
                            <Text style={styles.description}>{event?.eventDescription}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.buttonWrapper}>
                    <Pressable onPress={handleLeaveEvent} style={styles.leaveEventButton}>
                        <Text style={styles.leaveEventButtonText}>Forlat Event</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}
