import { Canvas } from "@react-three/fiber";
import Model from "./Model.tsx";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import ModelSettingsReadOnly from "./ModelSettingsReadOnly.tsx";
import { useState, useRef, useEffect, useCallback } from "react";
import { Mode, SplatModel } from "./SplatModel.tsx";
import Options from "./Options.tsx";
import ControlInfo from "./ControlInfo.tsx";
import SideBar from "../../components/Sidebar/Sidebar.tsx";
import { useNavigate, useParams } from "react-router";
import {
  useGetApiRoomId,
  useGetApiRoomModelId,
  useGetApiRoomPermissions,
} from "../../api/endpoints/api.ts";
import { v4 as uuidv4 } from "uuid";
import { MoonLoader } from "react-spinners";
import Button from "../../components/Button/Button.tsx";
import {
  RoomPerms,
  RoomPermsApiGetReturnType,
} from "../../api/endpoints/api.schemas";

interface RoomViewerProps {
  isMobile: boolean;
}

export default function RoomViewer({ isMobile }: RoomViewerProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [models, setModels] = useState<SplatModel[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>();
  const [mode, setMode] = useState<Mode>("translate");
  const [activeMesh, setActiveMesh] = useState<boolean>(true);
  const [themeBackground, setThemeBackground] = useState<string>(
    () => localStorage.getItem("themeBackground") || "#000000"
  );
  const [roomName, setRoomName] = useState<string>("Pokój");

  const isValidGuid = (guid: string) => {
    const guidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  };

  useEffect(() => {
    if (id && !isValidGuid(id)) {
      navigate("/not-found");
      return;
    }
  }, [id, navigate]);

  const roomsInPermission =
    useGetApiRoomPermissions<RoomPermsApiGetReturnType>();
  const {
    data: roomModel,
    isLoading: roomModelLoading,
    isError: roomModelError,
  } = useGetApiRoomModelId(id?.toString() || "");

  const roomRequest = useGetApiRoomId(id?.toString() || "");

  useEffect(() => {
    const roomInPermUser = roomsInPermission?.data?.returnedObjects?.find(
      (room: RoomPerms) => {
        return room.roomId === roomRequest?.data?.roomId;
      }
    );

    if (
      (roomRequest.data?.roomId !== roomInPermUser?.roomId ||
        roomRequest.data?.error !== null) &&
      !roomRequest.isLoading &&
      !roomsInPermission.isLoading
    ) {
      navigate("/not-found");
      return;
    }
  }, [roomRequest, navigate, roomsInPermission]);

  const orbitControlsRef = useRef<any>(null);

  const addModel = useCallback(
    (
      id: string,
      modelId: string,
      name: string,
      url: string,
      isNewObject: boolean,
      isRoom: boolean
    ) => {
      const model: SplatModel = {
        id,
        modelId,
        idInRenovation: "",
        name: name || "Pokój",
        url,
        isNewObject,
        isRoom,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
        visible: true,
      };
      setModels((prevModels) => [...prevModels, model]);
    },
    []
  );

  useEffect(() => {
    if (!roomRequest.isLoading && (!roomRequest.data || roomRequest.error)) {
      navigate("/not-found");
    } else if (
      !roomRequest.isLoading &&
      roomRequest.data &&
      !roomModelError &&
      !roomModelLoading
    ) {
      setModels([]);
      const timer = setTimeout(async () => {
        const roomData = roomRequest.data;
        if (roomData.name) {
          setRoomName(roomData.name);
        }
        const url = await roomModel?.text();

        addModel(
          uuidv4(),
          roomData.roomId || "",
          roomData.name || "Pokój",
          url || "",
          false,
          true
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    roomRequest.data,
    roomRequest.isLoading,
    roomRequest.error,
    navigate,
    addModel,
    roomModelLoading,
    roomModelError,
    roomModel,
  ]);

  const updateModel = useCallback(
    (id: string, updatedProps: Partial<SplatModel>) => {
      setModels((prevModels) =>
        prevModels.map((model) =>
          model.id === id ? { ...model, ...updatedProps } : model
        )
      );
    },
    []
  );

  const activeModel = models.find((model) => model.id === activeModelId);

  return (
    <>
      <SideBar isMobile={isMobile} />
      {roomRequest.isLoading || roomModelLoading ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex flex-col gap-10 w-full h-screen justify-center bg-background place-items-center`}
        >
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown">Ładowanie Pokoju...</p>
        </div>
      ) : roomModelError ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex flex-col w-full h-screen justify-center bg-background place-items-center gap-10`}
        >
          <p className="text-2xl text-brown">Błąd wczytywania pokoju!</p>
          <Button
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            className="bg-brown  text-background px-14 py-2 rounded shadow-md hover:text-black"
            onClick={() => navigate("/rooms")}
          >
            Wróć do Listy Pokoji
          </Button>
        </div>
      ) : !roomRequest?.data?.modelGenerated ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex w-full h-screen  flex-col gap-10 justify-center bg-background place-items-center`}
        >
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown">Model jest generowany...</p>
        </div>
      ) : (
        <div
          className={`${!isMobile ? "pl-16" : "pb-16"} w-full h-screen`}
          style={{ backgroundColor: themeBackground }}
        >
          <ModelSettingsReadOnly
            models={models}
            updateModel={updateModel}
            activeModel={activeModel}
            selectModel={(id) => setActiveModelId(id)}
            type="rooms"
            roomName={roomName}
            setRoomName={setRoomName}
            roomRequest={roomRequest}
          />
          <Options
            setMode={setMode}
            setActiveMesh={setActiveMesh}
            activeMesh={activeMesh}
            setColorPicker={setThemeBackground}
            color={themeBackground}
          />
          <ControlInfo />
          <Canvas
            camera={{
              position: [5, 2, 5],
            }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, 10, 10]} />
            {activeMesh ? (
              <gridHelper args={[100, 100, 0xdcdcdc, 0xbc936f]} />
            ) : undefined}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport />
            </GizmoHelper>
            {models.map((model) => (
              <Model
                key={model.id}
                model={model}
                mode={mode}
                activeModelId={activeModelId}
                isActive={activeModelId === model.id}
                onSelect={() => setActiveModelId(model.id)}
                updateModel={(updatedProps) =>
                  updateModel(model.id, updatedProps)
                }
                orbitControlsRef={orbitControlsRef}
              />
            ))}
            <OrbitControls ref={orbitControlsRef} />
          </Canvas>
        </div>
      )}
    </>
  );
}
