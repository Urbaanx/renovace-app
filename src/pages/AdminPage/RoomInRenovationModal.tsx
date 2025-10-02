import { useState } from "react";
import {
  usePostApiRoomsInRenovations,
  usePutApiRoomsInRenovations,
  useDeleteApiRoomsInRenovationsId,
} from "../../api/endpoints/api";
import { RoomInRenovation } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface RoomInRenovationModalProps {
  setIsOpen: (val: boolean) => void;
  values: RoomInRenovation | undefined;
  refresh: () => void;
}

function RoomInRenovationModal({
  setIsOpen,
  values,
  refresh,
}: RoomInRenovationModalProps) {
  const [id, setId] = useState(values == undefined ? "" : values.id);
  const [roomId, setRoomId] = useState(
    values == undefined ? "" : values.roomId,
  );
  const [renovationId, setRenovationId] = useState(
    values == undefined ? "" : values.renovationId,
  );
  const [x, setX] = useState(values == undefined ? 0 : values.x);
  const [y, setY] = useState(values == undefined ? 0 : values.y);
  const [z, setZ] = useState(values == undefined ? 0 : values.z);
  const [rotationX, setRotationX] = useState(
    values == undefined ? 0 : values.rotationX,
  );
  const [rotationY, setRotationY] = useState(
    values == undefined ? 0 : values.rotationY,
  );
  const [rotationZ, setRotationZ] = useState(
    values == undefined ? 0 : values.rotationZ,
  );
  const [scaleX, setScaleX] = useState(values == undefined ? 1 : values.scaleX);
  const [scaleY, setScaleY] = useState(values == undefined ? 1 : values.scaleY);
  const [scaleZ, setScaleZ] = useState(values == undefined ? 1 : values.scaleZ);
  const [visibility, setVisibilty] = useState(
    values == undefined ? false : values.visible,
  );

  const updateQuery = usePutApiRoomsInRenovations();
  const addQuery = usePostApiRoomsInRenovations();
  const deleteQuery = useDeleteApiRoomsInRenovationsId();

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
            <h1 className="text-xl text-center">Dodaj Room In Renovation</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">
              Uaktualnij Room In Renovation
            </h1>
          )}
        </div>

        <label hidden={values == undefined} className="py-3 mx-3">
          id
        </label>
        <input
          value={id}
          required={true}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">renovationId</label>
        <input
          value={renovationId}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRenovationId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">roomId</label>
        <input
          value={roomId}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRoomId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">x</label>
        <input
          value={x}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setX(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">y</label>
        <input
          value={y}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setY(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">z</label>
        <input
          value={z}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setZ(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">rotationX</label>
        <input
          value={rotationX}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRotationX(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">rotationY</label>
        <input
          value={rotationY}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRotationY(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">rotationZ</label>
        <input
          value={rotationZ}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRotationZ(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">scaleX</label>
        <input
          value={scaleX}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setScaleX(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">scaleY</label>
        <input
          value={scaleY}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setScaleY(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">scaleZ</label>
        <input
          value={scaleZ}
          required={true}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setScaleZ(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">visibility</label>
        <input
          checked={visibility}
          required={true}
          type="checkbox"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setVisibilty(e.target.checked)}
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
            if (values?.id != undefined)
              await deleteQuery.mutateAsync({
                id: values.id,
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
            if (values != null && values.id != undefined) {
              await updateQuery.mutateAsync({
                data: {
                  id: id,
                  renovationId: renovationId,
                  roomId: roomId,
                  x: x,
                  y: y,
                  z: z,
                  rotationX: rotationX,
                  rotationY: rotationY,
                  rotationZ: rotationZ,
                  scaleX: scaleX,
                  scaleY: scaleY,
                  scaleZ: scaleZ,
                  visible: visibility,
                },
                params: {
                  roomInRenovationId: values.id,
                },
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  renovationId: renovationId,
                  roomId: roomId,
                  x: x,
                  y: y,
                  z: z,
                  rotationX: rotationX,
                  rotationY: rotationY,
                  rotationZ: rotationZ,
                  scaleX: scaleX,
                  scaleY: scaleY,
                  scaleZ: scaleZ,
                  visible: visibility,
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

export default RoomInRenovationModal;
