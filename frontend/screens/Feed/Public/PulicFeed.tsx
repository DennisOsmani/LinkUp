import { ScrollView, View } from "react-native";
import { styles } from "./PublicFeedStyles";
import EventCardFeed from "../Components/EventCardFeed";
import { getEventsInCity, getHostForEvent } from "../../../api/EventAPI";
import { joinOpenEvent } from "../../../api/EventRelationAPI";
import { useEffect, useState } from "react";
import { IEvent } from "../../../interfaces/ModelInterfaces";
import { useTokenProvider } from "../../../providers/TokenProvider";

const imageSource = require("../../../assets/cbum.jpg");

export default function PublicFeed() {
  const [events, setEvents] = useState<IEvent[] | undefined>([]);
  const [hostNames, setHostNames] = useState<{ [eventId: string]: string }>({});
  const { token, setToken } = useTokenProvider();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData: IEvent[] | undefined = await getEventsInCity(
          token,
          "Brightville"
        );
        setEvents(eventsData);
        eventsData?.forEach(async (event) => {
          const host = await getHostForEvent("TOKEN", event.eventID);
          setHostNames((prevState) => ({
            ...prevState,
            [event.eventID]: `${host?.firstname} ${host?.lastname}`,
          }));
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

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
      // Check if start and end dates are on the same day
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
      return `${minCapacity}+`;
    } else if (maxCapacity) {
      return `${maxCapacity}-`;
    } else {
      return "∞";
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
    <ScrollView>
      <View style={styles.wrapper}>
        {events?.map((event) => (
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
            address={`${event.location.postalcode}, ${event.location.city}`}
            imageSource={event.frontImage}
            onJoinPress={() => handleJoinPress(event.eventID)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
