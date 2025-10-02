import { Canvas } from "@react-three/fiber";
import Model from "./Model.tsx";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import ModelSettingsReadOnly from "./ModelSettingsReadOnly.tsx";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Mode, SplatModel } from "./SplatModel.tsx";
import Options from "./Options.tsx";
import ControlInfo from "./ControlInfo.tsx";
import SideBar from "../../components/Sidebar/Sidebar.tsx";
import { useNavigate, useParams } from "react-router";
import {
  useGetApiObjectId,
  useGetApiObjectModelId,
  useGetApiObjectPerms,
} from "../../api/endpoints/api.ts";
import { v4 as uuidv4 } from "uuid";
import { MoonLoader } from "react-spinners";
import Button from "../../components/Button/Button.tsx";

interface FurnitureViewerProps {
  isMobile: boolean;
}

export default function FurnitureViewer({ isMobile }: FurnitureViewerProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [models, setModels] = useState<SplatModel[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>();
  const [mode, setMode] = useState<Mode>("translate");
  const [activeMesh, setActiveMesh] = useState<boolean>(true);
  const [themeBackground, setThemeBackground] = useState<string>(
    () => localStorage.getItem("themeBackground") || "#000000"
  );
  const [objectName, setObjectName] = useState<string>("Mebel");

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

  const objectsPermission = useGetApiObjectPerms() as {
    data?: { returnedObjects: { objectId: string }[] };
    isLoading: boolean;
  };

  const {
    data: objectModel,
    isLoading: objectModelLoading,
    isError: objectModelError,
  } = useGetApiObjectModelId(id?.toString() || "");

  const objectRequest = useGetApiObjectId(id?.toString() || "");

  useEffect(() => {
    const objectInPermUser = objectsPermission.data?.returnedObjects.find(
      (object: { objectId: string }) => {
        return object.objectId === objectRequest.data?.objectId;
      }
    );

    if (
      (objectRequest.data?.objectId !== objectInPermUser?.objectId ||
        objectRequest.data?.error !== null) &&
      !objectRequest.isLoading &&
      !objectsPermission.isLoading
    ) {
      navigate("/not-found");
      return;
    }
  }, [objectRequest, navigate, objectsPermission]);

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
        name: name || "Mebel",
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
    if (
      !objectRequest.isLoading &&
      (!objectRequest.data || objectRequest.error)
    ) {
      navigate("/not-found");
    } else if (
      !objectRequest.isLoading &&
      objectRequest.data &&
      !objectModelError &&
      !objectModelLoading
    ) {
      const objectData = objectRequest.data;
      if (objectData.name) {
        setObjectName(objectData.name);
      }
      setModels([]);
      const timer = setTimeout(async () => {
        const url = await objectModel?.text();
        addModel(
          uuidv4(),
          objectData.objectId || "",
          objectData.name || "Mebel",
          url || "",
          false,
          false
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    objectRequest.data,
    objectRequest.isLoading,
    objectRequest.error,
    navigate,
    addModel,
    objectModelError,
    objectModelLoading,
  ]);

  const orbitControlsRef = useRef<any>(null);

  const activeModel = useMemo(() => {
    return models.find((model) => model.id === activeModelId);
  }, [models, activeModelId]);

  const updateModel = useCallback(
    (id: string, updatedProps: Partial<SplatModel>) => {
      const model = models.find((model) => model.id === id);
      if (model) {
        setModels((prev) =>
          prev.map((model) =>
            model.id === id ? { ...model, ...updatedProps } : model
          )
        );
      }
    },
    [models]
  );

  // const removeModel = useCallback((id: string) => {
  //   setModels((prev) => prev.filter((model) => model.id !== id));
  // }, []);

  return (
    <>
      <SideBar isMobile={isMobile} />
      {objectRequest.isLoading || objectModelLoading ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex w-full h-screen flex-col gap-10 justify-center  bg-background place-items-center`}
        >
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown">Ładowanie Mebla...</p>
        </div>
      ) : objectModelError ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex flex-col w-full h-screen justify-center bg-background place-items-center gap-10`}
        >
          <p className="text-2xl text-brown">Błąd wczytywania mebla!</p>
          <Button
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            className="bg-brown  text-background px-14 py-2 rounded shadow-md hover:text-black"
            onClick={() => navigate("/furniture")}
          >
            Wróć do Listy Mebli
          </Button>
        </div>
      ) : !objectRequest?.data?.modelGenerated ? (
        <div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex w-full h-screen flex-col gap-10 justify-center bg-background place-items-center`}
        >
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown">Model jest generowany...</p>
        </div>
      ) : (
        <div
          className={`${!isMobile ? "pl-16" : "pb-16"} w-full  h-screen`}
          style={{ backgroundColor: themeBackground }}
        >
          <ModelSettingsReadOnly
            models={models}
            updateModel={updateModel}
            activeModel={activeModel}
            selectModel={(id) => setActiveModelId(id)}
            type="furniture"
            objectName={objectName}
            setObjectName={setObjectName}
            objectRequest={objectRequest}
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
