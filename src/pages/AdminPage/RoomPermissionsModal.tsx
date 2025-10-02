import { useState } from "react";
import {
  usePostApiRoomPermissions,
  usePutApiRoomPermissions,
  useDeleteApiRoomPermissionsRoomIdUserId,
} from "../../api/endpoints/api";
import { RoomPerms } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface RoomPermissionsModalProps {
  setIsOpen: (val: boolean) => void;
  values: RoomPerms | undefined;
  refresh: () => void;
}

function RoomPermissionsModal({
  setIsOpen,
  values,
  refresh,
}: RoomPermissionsModalProps) {
  const [roomId, setRoomId] = useState(
    values == undefined ? "" : values.roomId,
  );
  const [userId, setUserId] = useState(
    values == undefined ? "" : values.userId,
  );
  const [renovationOnly, setRenovationOnly] = useState(
    values == undefined ? false : values.renovationOnly,
  );
  const [canEdit, setCanEdit] = useState(
    values == undefined ? false : values.canEdit,
  );

  const updateQuery = usePutApiRoomPermissions();
  const addQuery = usePostApiRoomPermissions();
  const deleteQuery = useDeleteApiRoomPermissionsRoomIdUserId();

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="mx-3 ml-0 h-auto overflow-y-scroll bg-mainColorText text-background scrollable-admin grid grid-cols-3 rounded-2xl gap-3 p-5 pt-0">
        <div className="sticky top-0 col-span-3 bg-mainColorText py-4">
          {values == undefined && (
            <h1 className="text-xl text-center">Dodaj Room Permission</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">Uaktualnij Room Permission</h1>
          )}
        </div>

        <label className="py-3 mx-3">roomId</label>
        <input
          value={roomId}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRoomId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">userId</label>
        <input
          value={userId?.toString()}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setUserId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">renovationOnly</label>
        <input
          type="checkbox"
          checked={renovationOnly}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRenovationOnly(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">canEdit</label>
        <input
          type="checkbox"
          checked={canEdit}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setCanEdit(e.target.checked)}
        ></input>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={() => setIsOpen(false)}
        >
          Odrzuc
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          disabled={values == undefined}
          onClick={async () => {
            if (values?.roomId != undefined && values?.userId != undefined)
              await deleteQuery.mutateAsync({
                params: { roomId: values.roomId, userId: values.userId },
              });
            refresh();
            setIsOpen(false);
          }}
        >
          Usun
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={async () => {
            if (
              values != null &&
              values.roomId != undefined &&
              values.userId != undefined
            ) {
              await updateQuery.mutateAsync({
                data: {
                  userId: userId,
                  roomId: roomId,
                  renovationOnly: renovationOnly,
                  canEdit: canEdit,
                },
                params: {
                  roomId: values.roomId,
                  userId: values.userId,
                },
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  userId: userId,
                  roomId: roomId,
                  renovationOnly: renovationOnly,
                  canEdit: canEdit,
                },
              });
            }

            refresh();
            setIsOpen(false);
          }}
        >
          {values == undefined ? "Dodaj" : "Uaktualnij"}
        </button>
      </div>
    </Modal>
  );
}

export default RoomPermissionsModal;
