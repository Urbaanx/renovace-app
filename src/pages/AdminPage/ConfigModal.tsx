import { useState } from "react";
import {
  usePostApiConfig,
  usePutApiConfig,
  useDeleteApiConfig,
} from "../../api/endpoints/api";
import { Config } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface ObjectPermissionsModalProps {
  setIsOpen: (val: boolean) => void;
  values: Config | undefined;
  refresh: () => void;
}

function ConfigModal({
  setIsOpen,
  values,
  refresh,
}: ObjectPermissionsModalProps) {
  const [name, setName] = useState(values == undefined ? "" : values.name);
  const [maxRooms, setMaxRooms] = useState(
    values == undefined ? 0 : values.maxRooms,
  );
  const [maxObjects, setMaxObjects] = useState(
    values == undefined ? 0 : values.maxObjects,
  );
  const [maxRenovations, setMaxRenovations] = useState(
    values == undefined ? 0 : values.maxRenovations,
  );
  const [maxFrames, setMaxFrames] = useState(
    values == undefined ? 0 : values.maxFrames,
  );
  const updateQuery = usePutApiConfig();
  const addQuery = usePostApiConfig();
  const deleteQuery = useDeleteApiConfig();

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
            <h1 className="text-xl text-center">Dodaj Config</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">Uaktualnij Config</h1>
          )}
        </div>

        <label className="py-3 mx-3">name</label>
        <input
          value={name}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="py-3 mx-3">maxRooms</label>
        <input
          value={maxRooms}
          type="number"
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setMaxRooms(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">maxObjects</label>
        <input
          value={maxObjects}
          type="number"
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setMaxObjects(Number(e.target.checked))}
        ></input>

        <label className="py-3 mx-3">maxRenovations</label>
        <input
          value={maxRenovations}
          type="number"
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setMaxRenovations(Number(e.target.checked))}
        ></input>

        <label className="py-3 mx-3">maxFrames</label>
        <input
          value={maxFrames}
          type="number"
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setMaxFrames(Number(e.target.checked))}
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
            if (values?.name != null)
              await deleteQuery.mutateAsync({
                params: { Name: values.name },
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
              values.name != null &&
              values.name != undefined
            ) {
              await updateQuery.mutateAsync({
                data: {
                  name: name,
                  maxRooms: maxRooms,
                  maxObjects: maxObjects,
                  maxRenovations: maxRenovations,
                  maxFrames: maxFrames,
                },
                params: {
                  name: values.name,
                },
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  name: name,
                  maxRooms: maxRooms,
                  maxObjects: maxObjects,
                  maxRenovations: maxRenovations,
                  maxFrames: maxFrames,
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

export default ConfigModal;
