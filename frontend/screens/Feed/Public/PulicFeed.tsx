import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./PublicFeedStyles";
import EventCardFeed from "../Components/EventCardFeed";
import { getEventsInCity, getHostForEvent } from "../../../api/EventAPI";
import { joinOpenEvent } from "../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import { useLocation } from "../../../providers/LocationProvider";

export default function PublicFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token } = useTokenProvider();
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);
  const { location, loading, address } = useLocation();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (location && address) {
      fetchEvents(address);
    }
  }, [location]);

  const fetchEvents = async (city: string) => {
    try {
      const eventsData: IEvent[] | undefined = await getEventsInCity(
        token,
        city
      );
      setEvents(eventsData);
      const hostNamesObj: { [eventId: string]: string } = {};
      const promises = eventsData?.map(async (event) => {
        const host = await getHostForEvent(token, event.eventID);
        hostNamesObj[event.eventID] = `${host?.firstname} ${host?.lastname}`;
      });

      // Wait for all promises to resolve
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
    if (address) {
      fetchEvents(address);
    } else {
      setRefreshing(false);
    }
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
      await joinOpenEvent(token, eventId);
      // Remove the event from the events array
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
      {loading || fetchingEvents ? ( // Show loader if loading is true
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter eventer i din by...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {events && events.length > 0 ? (
            events?.map((event) => (
              <EventCardFeed
                key={event.eventID}
                numberOfPeople={formatCapacityRange(
                  event.minCapacity,
                  event.maxCapacity
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
                onJoinPress={() => handleJoinPress(event.eventID)}
              />
            ))
          ) : (
            <View style={styles.midscreenMessages}>
              <Text style={styles.midscreenMessagesText}>
                Det er for tiden ingen eventer i din by!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
