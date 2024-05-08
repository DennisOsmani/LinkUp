import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./InvitesFeedStyles";
import { getHostForEvent, getUserEventInvites } from "../../../../api/EventAPI";
import { updateEventRelationParticipation } from "../../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent } from "../../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../../providers/TokenProvider";
import EventCardInvite from "../EventCardInvited/EventCardInvite";

export default function InvitesFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token } = useTokenProvider();
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData: IEvent[] | undefined = await getUserEventInvites(token);
      setEvents(eventsData);
      const hostNamesObj: { [eventId: string]: string } = {};
      const promises = eventsData?.map(async (event) => {
        const host = await getHostForEvent(token, event.eventID);
        hostNamesObj[event.eventID] = `${host?.firstname} ${host?.lastname}`;
      });

      await Promise.all(promises || []);
      setHostNames(hostNamesObj);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setFetchingEvents(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
    setRefreshing(false);
  };

  const formatDate = (startDate: string, endDate?: string) => {
    const startDateTemp = new Date(startDate);
    const endDateTemp = endDate ? new Date(endDate) : null;

    const startDateTime = new Date(
      startDateTemp.setHours(startDateTemp.getHours() + 2)
    );
    const endDateTime = endDateTemp
      ? new Date(endDateTemp.setHours(endDateTemp.getHours() + 2))
      : null;

    const formatDateTime = (dateTime: Date) => {
      const month = dateTime.toLocaleString("no-NB", { month: "short" });
      const day = dateTime.getDate();
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      return `${day}. ${month} ${hours}:${minutes.toString().padStart(2, "0")}`;
    };

    if (endDate) {
      const sameDay =
        startDateTime.toDateString() === endDateTime!.toDateString();
      if (sameDay) {
        return `${formatDateTime(startDateTime)} - ${formatDateTime(
          endDateTime!
        ).substring(7, 14)}`;
      } else {
        return `${formatDateTime(startDateTime)} - ${formatDateTime(
          endDateTime!
        )}`;
      }
    } else {
      return formatDateTime(startDateTime);
    }
  };

  const formatCapacityRange = (minCapacity?: string, maxCapacity?: string) => {
    if (minCapacity && maxCapacity) {
      return `${minCapacity} - ${maxCapacity}`;
    } else if (minCapacity) {
      return `>  ${minCapacity}`;
    } else if (maxCapacity) {
      return `<  ${maxCapacity}`;
    } else {
      return "0 - 1000";
    }
  };

  const handleJoinPress = async (eventId: number) => {
    try {
      await updateEventRelationParticipation(token, eventId, "JOINED");
      setEvents((prevEvents) =>
        prevEvents?.filter((event) => event.eventID !== eventId)
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleDeclinePress = async (eventId: number) => {
    try {
      await updateEventRelationParticipation(token, eventId, "DECLINED");
      setEvents((prevEvents) =>
        prevEvents?.filter((event) => event.eventID !== eventId)
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {fetchingEvents ? (
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter dine invitasjoner...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {events && events.length > 0 ? (
            events?.map((event) => (
              <EventCardInvite
                key={event.eventID}
                numberOfPeople={formatCapacityRange(
                  event.minCapacity?.toString(),
                  event.maxCapacity?.toString()  
                )}
                dateTime={formatDate(
                  event.eventDateTimeStart,
                  event.eventDateTimeEnd
                )}
                title={event.eventName}
                hostName={hostNames[event.eventID] || ""}
                bio={event.eventDescription}
                address={`${
                  event.location.postalcode === null
                    ? ""
                    : event.location.postalcode + ", "
                } ${event.location.city}`}
                imageSource={event.frontImage}
                onDeclinePress={() => handleDeclinePress(event.eventID)}
                onJoinPress={() => handleJoinPress(event.eventID)}
              />
            ))
          ) : (
            <View style={styles.midscreenMessages}>
              <Text style={styles.midscreenMessagesText}>
                Du har for tiden ingen invitasjoner!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
