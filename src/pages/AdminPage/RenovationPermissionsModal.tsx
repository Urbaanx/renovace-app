import { useState } from "react";
import {
  usePostApiRenovationPermissions,
  usePutApiRenovationPermissions,
  useDeleteApiRenovationPermissionsRenovationIdUserId,
} from "../../api/endpoints/api";
import { RenovationPerms } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface RoomPermissionsModalProps {
  setIsOpen: (val: boolean) => void;
  values: RenovationPerms | undefined;
  refresh: () => void;
}

function RenovationPermissionsModal({
  setIsOpen,
  values,
  refresh,
}: RoomPermissionsModalProps) {
  const [renovationId, setRenovationId] = useState(
    values == undefined ? "" : values.renovationId
  );
  const [userId, setUserId] = useState(
    values == undefined ? "" : values.userId
  );
  const [canEdit, setCanEdit] = useState(
    values == undefined ? false : values.canEdit
  );

  const updateQuery = usePutApiRenovationPermissions();
  const addQuery = usePostApiRenovationPermissions();
  const deleteQuery = useDeleteApiRenovationPermissionsRenovationIdUserId();

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
            <h1 className="text-xl text-center">Dodaj Renovation Permission</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">
              Uaktualnij Renovation Permission
            </h1>
          )}
        </div>

        <label className="py-3 mx-3">renovationId</label>
        <input
          value={renovationId}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRenovationId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">userId</label>
        <input
          value={userId?.toString()}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setUserId(e.target.value)}
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
            if (
              values?.renovationId != undefined &&
              values?.userId != undefined
            )
              await deleteQuery.mutateAsync({
                params: {
                  renovationId: values.renovationId,
                  userId: values.userId,
                },
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
              values.renovationId != undefined &&
              values.userId != undefined
            ) {
              await updateQuery.mutateAsync({
                data: {
                  userId: userId ?? null,
                  renovationId: renovationId,
                  canEdit: canEdit,
                },
                params: {
                  renovationId: values.renovationId,
                  userId: values.userId,
                },
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  userId: userId ?? null,
                  renovationId: renovationId,
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

export default RenovationPermissionsModal;
