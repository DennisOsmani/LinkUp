import { IEvent } from "../../../../interfaces/ModelInterfaces";
import NonEditModal from "./components/NonEditModal/NonEditModal";
import EditModal from "./components/EditModal/EditModal";
import { useEffect } from "react";

interface EventTabProps {
  event: IEvent | undefined;
  setEventModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
}

export function CreatorEventTab({
  event,
  setEventModalVisible,
  edit,
}: EventTabProps) {
  useEffect(() => {
    console.log("EVENT CRE EV TAB : " + event?.eventID);
  }, []);
  return (
    <>
      {!edit && (
        <NonEditModal
          event={event}
          setEventModalVisible={setEventModalVisible}
        />
      )}
      {edit && <EditModal eventProp={event} eventId={event?.eventID!} />}
    </>
  );
}
