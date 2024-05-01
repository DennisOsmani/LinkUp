import { IEvent } from "../../../../interfaces/ModelInterfaces";
import NonEditModal from "./components/NonEditModal/NonEditModal";
import EditModal from "./components/EditModal/EditModal";

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
  return (
    <>
      {!edit && (
        <NonEditModal
          event={event}
          setEventModalVisible={setEventModalVisible}
        />
      )}
      {edit && <EditModal event={event} />}
    </>
  );
}
