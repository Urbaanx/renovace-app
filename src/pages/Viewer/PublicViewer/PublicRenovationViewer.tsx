import { Canvas } from "@react-three/fiber";
import Model from "../Model.tsx";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Mode, SplatModel } from "../SplatModel.tsx";
import Options from "../Options.tsx";
import ControlInfo from "../ControlInfo.tsx";

import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  getApiObjectModelId,
  getApiPortalObjectId,
  useGetApiPortalModelRenovationIdRoomId,
  useGetApiPortalObjectsInRenovations,
  useGetApiPortalRenovationId,
  useGetApiPortalRoomId,
  useGetApiPortalRoomsInRenovations,
} from "../../../api/endpoints/api.ts";

import { useQueries } from "react-query";
import { MoonLoader } from "react-spinners";
import Button from "../../../components/Button/Button.tsx";
import ModelSettingsPublic from "./ModelSettingsPublic.tsx";
import SideBarPublicViewer from "../../../components/Sidebar/SidebarPublicViewer.tsx";

interface PublicRenovationViewerProps {
  isMobile: boolean;
}

export default function PublicRenovationViewer({
  isMobile,
}: PublicRenovationViewerProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [models, setModels] = useState<SplatModel[]>([]);
  //const [deleteModelsList, setDeleteModelsList] = useState<SplatModel[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>();
  const [mode, setMode] = useState<Mode>("translate");
  const [activeMesh, setActiveMesh] = useState<boolean>(true);
  const [renovationName, setRenovationName] = useState<string>("Renowacja");
  const [themeBackground, setThemeBackground] = useState<string>(
    () => localStorage.getItem("themeBackground") || "#000000"
  );

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

  /*Renovation and Room data*/
  const renovationId = id;

  const renovationRequest = useGetApiPortalRenovationId(
    renovationId?.toString() || ""
  );

  useEffect(() => {
    if (!renovationRequest.data?.public && !renovationRequest.isLoading) {
      navigate("/not-found");
      return;
    }
  }, [renovationRequest, navigate]);

  const roomInRenovation = useGetApiPortalRoomsInRenovations<{
    returnedObjects: Array<{
      id: string;
      roomId: string;
      visible: boolean;
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      scaleX: number;
    }>;
  }>({
    renovationIdFilter: renovationId,
  });

  const roomId = roomInRenovation.data?.returnedObjects?.[0]?.roomId;
  const roomInRenovationId = roomInRenovation.data?.returnedObjects?.[0]?.id;
  const roomRequest = useGetApiPortalRoomId(roomId || "");

  const roomModelRequest = useGetApiPortalModelRenovationIdRoomId(
    renovationId?.toString() || "",
    roomId?.toString() || ""
  );
  const roomModel = roomModelRequest.data;
  const roomModelLoading = roomModelRequest.isLoading;
  const roomModelError = roomModelRequest.isError;

  /*Objects Data*/
  const objectsInRenovation = useGetApiPortalObjectsInRenovations<{
    returnedObjects: Array<{
      id: string;
      objectId: string;
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      scaleX: number;
      visible: boolean;
    }>;
  }>({
    renovationIdFilter: renovationId,
  });

  const objects = objectsInRenovation.data?.returnedObjects || [];

  /*Fetch data all objects*/
  const fetchObjectData = async (id: string) => {
    const response = await getApiPortalObjectId(id);
    return response;
  };

  useEffect(() => {
    queries.forEach((query) => {
      query.refetch();
    });
  }, []);

  const queries = useQueries(
    objects.map((object: { objectId: string }) => {
      return {
        queryKey: ["object", object.objectId],
        queryFn: () => fetchObjectData(object.objectId),
        staleTime: 0,
      };
    })
  );

  const allQueriesReady = queries.every(
    (query) => !query.isLoading && !query.isError
  );

  /*Add Model Function */
  const addModel = useCallback(
    async (
      id: string = uuidv4(),
      modelId: string,
      name: string,
      url: string,
      isNewObject: boolean,
      isRoom: boolean,
      position: [number, number, number] = [0, 0, 0],
      rotation: [number, number, number] = [0, 0, 0],
      scale: number = 1,
      visible: boolean = true,
      idInRenovation?: string
    ) => {
      const newModel: SplatModel = {
        id: id,
        modelId: modelId,
        name: name,
        url: url,
        isNewObject: isNewObject,
        isRoom: isRoom,
        position: position,
        rotation: rotation,
        scale: scale,
        visible: visible,
        idInRenovation: idInRenovation || null,
      };
      setModels((prev) => {
        const updatedModels = [...prev, newModel];
        return updatedModels;
      });
    },
    [models.length]
  );

  const fetchObjectModel = async (id: string) => {
    const response = getApiObjectModelId(id);
    return response;
  };

  /* Add Room and Objects from database to state models */
  useEffect(() => {
    if (
      !renovationRequest.isLoading &&
      (!renovationRequest.data ||
        renovationRequest.error ||
        roomRequest.data?.error !== null) &&
      !roomRequest.isLoading &&
      allQueriesReady
    ) {
      //navigate("/not-found");
    } else if (!renovationRequest.isLoading && !roomRequest.isLoading) {
      if (renovationRequest?.data?.name) {
        setRenovationName(renovationRequest?.data?.name);
      }
      const position: [number, number, number] = [
        roomInRenovation.data?.returnedObjects[0]?.x || 0,
        roomInRenovation.data?.returnedObjects[0]?.y || 0,
        roomInRenovation.data?.returnedObjects[0]?.z || 0,
      ];
      const rotation: [number, number, number] = [
        roomInRenovation.data?.returnedObjects[0]?.rotationX || 0,
        roomInRenovation.data?.returnedObjects[0]?.rotationY || 0,
        roomInRenovation.data?.returnedObjects[0]?.rotationZ || 0,
      ];
      const scale = roomInRenovation.data?.returnedObjects[0]?.scaleX || 1;
      const visible = roomInRenovation.data?.returnedObjects[0]?.visible;

      setModels([]);
      const roomData = roomRequest?.data;
      const timer = setTimeout(async () => {
        const url = await roomModel?.text();

        /*Add Room from database*/
        const executeAsyncTasks = async () => {
          const alreadyHasRoom = models.some(
            (m) => m.isRoom && m.modelId === (roomId || "")
          );
          if (!alreadyHasRoom) {
            await addModel(
              uuidv4(),
              roomId || "",
              roomData?.name || "Pokoj",
              url || "",
              false,
              true,
              position,
              rotation,
              scale,
              visible,
              roomInRenovationId
            );
          }

          /*Add Objects from database*/
          if (allQueriesReady) {
            let objectsInRenovation: Array<{
              id: string;
              objectId: string;
              x: number;
              y: number;
              z: number;
              rotationX: number;
              rotationY: number;
              rotationZ: number;
              scaleX: number;
              visible: boolean;
            }> = [];
            const uniqueObjectIds = new Set<string>();
            queries.forEach((query) => {
              const foundObjects = objects.filter(
                (object: { id: string; objectId: string }) =>
                  object.objectId === query.data?.objectId
              );

              foundObjects.forEach(
                (object: {
                  id: string;
                  objectId: string;
                  x: number;
                  y: number;
                  z: number;
                  rotationX: number;
                  rotationY: number;
                  rotationZ: number;
                  scaleX: number;
                  visible: boolean;
                }) => {
                  if (!uniqueObjectIds.has(object.id)) {
                    uniqueObjectIds.add(object.id);
                    objectsInRenovation.push(object);
                  }
                }
              );
            });

            const updateModels = async () => {
              const roomModel = models.find((model) => model.isRoom);
              const updatedModels = roomModel ? [roomModel] : [];

              const processObjects = async () => {
                for (const objectInRenovation of objectsInRenovation) {
                  const object = queries.find(
                    (query) =>
                      (query.data as { objectId: string })?.objectId ===
                      objectInRenovation.objectId
                  )?.data as { name: string; objectId: string };

                  if (object) {
                    try {
                      const objectModelData = await fetchObjectModel(
                        objectInRenovation.objectId
                      );

                      if (objectModelData) {
                        const url = await objectModelData.text();

                        updatedModels.push({
                          id: uuidv4(),
                          modelId: objectInRenovation.objectId,
                          name: object.name,
                          url: url,
                          isNewObject: false,
                          isRoom: false,
                          position: [
                            objectInRenovation.x,
                            objectInRenovation.y,
                            objectInRenovation.z,
                          ],
                          rotation: [
                            objectInRenovation.rotationX,
                            objectInRenovation.rotationY,
                            objectInRenovation.rotationZ,
                          ],
                          scale: objectInRenovation.scaleX,
                          visible: objectInRenovation.visible,
                          idInRenovation: objectInRenovation.id,
                        });
                      }
                    } catch (error) {
                      console.error("Error fetching object model:", error);
                    }
                  }
                }
              };

              await processObjects();
              setModels((prev) => [...prev, ...updatedModels]);
            };

            updateModels();
          }
        };
        await executeAsyncTasks();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    renovationRequest.data,
    renovationRequest.isLoading,
    renovationRequest.error,
    roomRequest.isLoading,
    roomRequest.data,
    allQueriesReady,
    objects,
    navigate,
    roomModelLoading,
    roomModelError,
    roomModel,
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

  return (
    <>
      <SideBarPublicViewer isMobile={isMobile} />

      {renovationRequest.isLoading || roomModelLoading ? (
        <motion.div
          className={`${
            !isMobile ? "pl-16" : "pb-16"
          } flex w-full h-screen flex-col gap-10 justify-center bg-background place-items-center`}
        >
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown">Ładowanie Renowacji...</p>
        </motion.div>
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
            onClick={() => navigate("/renovations")}
          >
            Wróć do Listy Renowacji
          </Button>
        </div>
      ) : (
        <motion.div
          className={`${!isMobile ? "pl-16" : "pb-16"} w-full  h-screen`}
          style={{ backgroundColor: themeBackground }}
        >
          <ModelSettingsPublic
            models={models}
            updateModel={updateModel}
            activeModel={activeModel}
            selectModel={(id) => setActiveModelId(id)}
            renovationName={renovationName}
            type="renovations"
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
        </motion.div>
      )}
    </>
  );
}
