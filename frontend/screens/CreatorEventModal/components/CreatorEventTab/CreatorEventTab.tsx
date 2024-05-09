import { IEvent } from "../../../../interfaces/ModelInterfaces";
import NonEditModal from "./components/NonEditModal/NonEditModal";
import EditModal from "./components/EditModal/EditModal";

interface EventTabProps {
  event: IEvent | undefined;
  setEventModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatorEventTab({
  event,
  setEventModalVisible,
  edit,
  setEdit,
}: EventTabProps) {
  return (
    <>
      {!edit && (
        <NonEditModal
          event={event}
          setEventModalVisible={setEventModalVisible}
          setEdit={setEdit}
          edit={edit}
        />
      )}
      {edit && (
        <EditModal
          eventImage={event?.frontImage!}
          eventProp={event}
          eventId={event?.eventID!}
          setEdit={setEdit}
        />
      )}
    </>
  );
}
