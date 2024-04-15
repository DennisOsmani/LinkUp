import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./JoinedFeedStyles";
import {
  getEventsInCity,
  getHostForEvent,
  getUserJoinedEvents,
} from "../../../api/EventAPI";
import { joinOpenEvent, getEventRelation } from "../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent, IEventRelations } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";
import { useLocation } from "../../../providers/LocationProvider";
import EventCardJoined from "../Components/EventCardJoined";

const imageSource = require("../../../assets/cbum.jpg");

const mockEventRel: IEventRelations = {
  eventRelationID: 20,
  eventID: 123,
  userID: "123456",
  user: undefined,
  eventRelationParticipation: 1,
  eventRole: 1, // Example value for eventRole
};

const cardProps = {
  numberOfPeople: "4 - 20",
  dateTime: new Date(2024, 11, 20),
  title: "Bursdagsfesten",
  hostName: "John Doe",
  bio: "Hei jeg arrangerer lorem ipsum dolor sit amet, dolores poatoes machina. Det blir kostymer og fest",
  address: "123 Main Street",
  imageSource: imageSource,
  onButtonPress: () => {
    // Define your join press handler here
    console.log("Button pressed");
  },
  eventRelation: mockEventRel,
};

export default function JoinedFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [eventRelations, setEventRelations] = useState<{
    [eventId: string]: IEventRelations | undefined;
  }>({});
  const { token, setToken } = useTokenProvider();
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  //Change this:
  const fetchEvents = async () => {
    try {
      const eventsData: IEvent[] | undefined = await getUserJoinedEvents(token);
      setEvents(eventsData);
      const eventRelationsObj: {
        [eventId: string]: IEventRelations | undefined;
      } = {};
      const promises = eventsData?.map(async (event) => {
        const eventRelation = await getEventRelation(event.eventID, token);
        eventRelationsObj[event.eventID] = eventRelation;
      });

      // Wait for all promises to resolve
      await Promise.all(promises || []);
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/*fetchingEvents ? ( // Show loader if loading is true
        <View style={styles.midscreenMessages}>
          <ActivityIndicator size="large" color="#5A5DF0" />
          <Text style={styles.midscreenMessagesText}>
            Henter eventer i din by...
          </Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {events && events.length > 0 ? (
            events?.map((event /*TODOOOOOOOOOOOOOOO CARD/) => <Text>Yo</Text>)
          ) : (
            <View style={styles.midscreenMessages}>
              <Text style={styles.midscreenMessagesText}>
                Det er for tiden ingen eventer i din by!
              </Text>
            </View>
          )}
        </View>
      )*/}
      <View style={styles.wrapper}>
        <EventCardJoined {...cardProps} />
      </View>
    </ScrollView>
  );
}
