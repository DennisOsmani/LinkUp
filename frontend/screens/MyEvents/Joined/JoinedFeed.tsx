import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./JoinedFeedStyles";
import { getHostForEvent, getUserJoinedEvents } from "../../../api/EventAPI";
import {
  getEventRelation,
  removeFromEvent,
} from "../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent, IEventRelations } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import EventCardJoined from "../Components/EventCardJoined";

const imageSource = require("../../../assets/cbum.jpg");

export default function JoinedFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [eventRelations, setEventRelations] = useState<{
    [eventId: string]: IEventRelations | undefined;
  }>({});
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token, setToken } = useTokenProvider();
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData: IEvent[] | undefined = await getUserJoinedEvents(token);
      setEvents(eventsData);

      // Fetch event relations for each event
      const hostNamesObj: { [eventId: string]: string } = {};
      const eventRelationsObj: {
        [eventId: string]: IEventRelations | undefined;
      } = {};

      const promises = eventsData?.map(async (event) => {
        const host = await getHostForEvent(token, event.eventID);
        hostNamesObj[event.eventID] = `${host?.firstname} ${host?.lastname}`;

        const eventRelationsData = await getEventRelation(token, event.eventID); // Fetch event relations
        eventRelationsObj[event.eventID] = eventRelationsData;
      });

      // Wait for all promises to resolve
      await Promise.all(promises || []);
      setHostNames(hostNamesObj);
      setEventRelations(eventRelationsObj);
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
    const startDateTime = new Date(startDate);
    const endDateTime = endDate ? new Date(endDate) : null;

    const formatDateTime = (dateTime: Date) => {
      const month = dateTime.toLocaleString("default", { month: "short" });
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
        ).substring(8, 14)}`;
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

  const isHost = (eventRelation: IEventRelations | undefined) => {
    if (!eventRelation) {
      throw new Error(
        "Error in the eventrelation for the event: " + eventRelations
      );
    }
    if (eventRelation.eventRole == 0 || eventRelation.eventRole == 1) {
      return true;
    }
    return false;
  };

  const handleButtonPress = async (
    eventRelation: IEventRelations | undefined
  ) => {
    if (!eventRelation) {
      throw new Error(
        "Error in the eventrelation for the event: " + eventRelations
      );
    }
    try {
      if (isHost(eventRelation)) {
        // Redirect to event page
      } else {
        await removeFromEvent(token, eventRelation.eventID, "");
        setEvents((prevEvents) =>
          prevEvents?.filter((event) => event.eventID !== eventRelation.eventID)
        );
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {fetchingEvents ? ( // Show loader if loading is true
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter dine eventer...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {events && events.length > 0 ? (
            events?.map((event) => (
              <EventCardJoined
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
                address={`${event.location.postalcode}, ${event.location.city}`}
                imageSource={imageSource}
                onButtonPress={() =>
                  handleButtonPress(eventRelations[event.eventID])
                }
                host={isHost(eventRelations[event.eventID])}
                event={event}
              />
            ))
          ) : (
            <View style={styles.midscreenMessages}>
              <Text style={styles.midscreenMessagesText}>
                Du er for tiden ikke med i noen eventer!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
