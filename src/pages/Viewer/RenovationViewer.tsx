import { Canvas } from "@react-three/fiber";
import Model from "./Model.tsx";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import ModelSettings from "./ModelSettings.tsx";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Mode, SplatModel } from "./SplatModel.tsx";
import Options from "./Options.tsx";
import ControlInfo from "./ControlInfo.tsx";
import SideBar from "../../components/Sidebar/Sidebar.tsx";
import { useNavigate, useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  getApiObjectId,
  getApiObjectModelId,
  useDeleteApiObjectsInRenovationsId,
  useGetApiObjectAvailable,
  useGetApiObjectPerms,
  useGetApiObjectsInRenovationsAvailable,
  useGetApiRenovationId,
  useGetApiRenovationPermissions,
  useGetApiRoomId,
  useGetApiRoomModelId,
  useGetApiRoomPermissions,
  useGetApiRoomsInRenovationsAvailable,
  usePostApiObjectsInRenovations,
  usePutApiObjectsInRenovations,
  usePutApiRoomsInRenovations,
} from "../../api/endpoints/api.ts";
import { useQueries } from "react-query";
import SuccessNotification from "../../components/SuccessNotification/SuccessNotification.tsx";
import FailedNotification from "../../components/FailedNotification/FailedNotification.tsx";
import { MoonLoader } from "react-spinners";
import Button from "../../components/Button/Button.tsx";

interface RenovationViewerProps {
  isMobile: boolean;
}

export default function RenovationViewer({ isMobile }: RenovationViewerProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [models, setModels] = useState<SplatModel[]>([]);
  const [deleteModelsList, setDeleteModelsList] = useState<SplatModel[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>();
  const [mode, setMode] = useState<Mode>("translate");
  const [activeMesh, setActiveMesh] = useState<boolean>(true);
  const [renovationName, setRenovationName] = useState<string>("Renowacja");
  const [renovationCanEdit, setRenovationCanEdit] = useState<boolean>(false);
  const [themeBackground, setThemeBackground] = useState<string>(
    () => localStorage.getItem("themeBackground") || "#000000"
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function closeNotificationSuccess() {
    setIsSuccess(false);
  }

  function closeNotificationFailed() {
    setIsFailed(false);
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } else if (isFailed) {
      setTimeout(() => {
        setIsFailed(false);
      }, 5000);
    }
  }, [isSuccess, setIsSuccess, isFailed, setIsFailed]);

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

  const updateObjectModels = usePutApiObjectsInRenovations();
  const postObjectModel = usePostApiObjectsInRenovations();
  const updateRoomModel = usePutApiRoomsInRenovations();
  const deleteObjectModel = useDeleteApiObjectsInRenovationsId();
  const objectsRequest = useGetApiObjectAvailable({
    modelGeneratedFilter: true,
  });
  const renovationsInPermission = useGetApiRenovationPermissions<{
    returnedObjects: Array<{ renovationId: string }>;
  }>();
  const roomsInPermission = useGetApiRoomPermissions<{
    returnedObjects: Array<{ roomId: string }>;
  }>();
  const objectsInPermission = useGetApiObjectPerms<{
    returnedObjects: Array<{ objectId: string; error: string | null }>;
  }>();

  /*Renovation and Room data*/
  const renovationId = id;

  const renovationRequest = useGetApiRenovationId(
    renovationId?.toString() || ""
  );

  useEffect(() => {
    const renovationInPermUser =
      renovationsInPermission?.data?.returnedObjects?.find(
        (renovation: { renovationId: string }) =>
          renovation.renovationId === renovationRequest?.data?.renovationId
      );

    if (
      renovationRequest.data?.renovationId !==
        renovationInPermUser?.renovationId &&
      !renovationRequest.isLoading &&
      !renovationsInPermission.isLoading
    ) {
      navigate("/not-found");
      return;
    } else {
      setRenovationCanEdit(true);
    }
  }, [renovationRequest, navigate, renovationsInPermission]);

  const roomInRenovation = useGetApiRoomsInRenovationsAvailable<{
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
  const roomRequest = useGetApiRoomId(roomId || "");

  const {
    data: roomModel,
    isLoading: roomModelLoading,
    isError: roomModelError,
  } = useGetApiRoomModelId(roomId?.toString() || "");

  /*Objects Data*/
  const objectsInRenovation = useGetApiObjectsInRenovationsAvailable<{
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
  const objectData = objectsRequest.data?.returnedObjects;

  const filteredObjectData =
    (objectData as Array<{ objectId: string; error: string | null }>)?.filter(
      (object) =>
        objectsInPermission?.data?.returnedObjects
          ?.map((perm: { objectId: string }) => perm.objectId)
          .includes(object.objectId) && object.error === null
    ) || [];

  /*Fetch data all objects*/
  const fetchObjectData = async (id: string) => {
    const response = await getApiObjectId(id);
    return response;
  };

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
    const roomInPermUser = roomsInPermission?.data?.returnedObjects.find(
      (room: { roomId: string }) => {
        return room.roomId === roomRequest?.data?.roomId;
      }
    );

    if (
      !renovationRequest.isLoading &&
      roomRequest.data?.roomId !== roomInPermUser?.roomId &&
      (!renovationRequest.data ||
        renovationRequest.error ||
        roomRequest.data?.error !== null) &&
      !roomRequest.isLoading &&
      allQueriesReady
    ) {
      navigate("/not-found");
    } else if (
      !renovationRequest.isLoading &&
      !roomRequest.isLoading &&
      !roomsInPermission.isLoading
    ) {
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
                (object: { objectId: string }) =>
                  object.objectId ===
                  (query.data as { objectId: string })?.objectId
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
                    const objectInPermsUser =
                      objectsInPermission?.data?.returnedObjects.find(
                        (objectInPerm: { objectId: string }) => {
                          return (
                            objectInPerm.objectId ===
                            objectInRenovation.objectId
                          );
                        }
                      );

                    if (objectInPermsUser && objectInPermsUser?.error == null) {
                      try {
                        const objectModelData = await fetchObjectModel(
                          objectInPermsUser.objectId
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

  const removeModel = useCallback(
    (id: string) => {
      /* Add objects to deleteList which has a flag isNewObject == true */
      const modelToRemove = models.find((model) => model.id === id);
      if (modelToRemove && !modelToRemove.isNewObject) {
        setDeleteModelsList((prev) => [...prev, modelToRemove]);
      }

      setModels((prev) => prev.filter((model) => model.id !== id));
    },
    [models]
  );
  /* Save Room and Objects to database */
  const saveModelToDatabase = useCallback(async () => {
    let success = true;
    if (models.length > 0 || models !== null) {
      /* Save Room */
      try {
        await updateRoomModel.mutateAsync({
          data: {
            id: models[0].idInRenovation || "",
            roomId: models[0].modelId,
            renovationId: renovationId,
            x: models[0].position[0],
            y: models[0].position[1],
            z: models[0].position[2],
            rotationX: models[0].rotation[0],
            rotationY: models[0].rotation[1],
            rotationZ: models[0].rotation[2],
            scaleX: models[0].scale,
            scaleY: models[0].scale,
            scaleZ: models[0].scale,
            visible: models[0].visible,
          },
          params: {
            roomInRenovationId: models[0].idInRenovation || undefined,
          },
        });
      } catch (error) {
        console.error("Error saving room:", error);
        setErrorMessage("Błąd zapisania pokoju!");
        success = false;
      }

      /* Save Objects */
      for (const model of models.slice(1)) {
        try {
          if (!model.isNewObject) {
            await updateObjectModels.mutateAsync({
              data: {
                id: model.idInRenovation || "",
                objectId: model.modelId,
                renovationId: renovationId,
                x: model.position[0],
                y: model.position[1],
                z: model.position[2],
                rotationX: model.rotation[0],
                rotationY: model.rotation[1],
                rotationZ: model.rotation[2],
                scaleX: model.scale,
                scaleY: model.scale,
                scaleZ: model.scale,
                visible: model.visible,
              },
              params: {
                objectInRenovationId: model.idInRenovation || undefined,
              },
            });
          } else {
            /* If objects is new Added to models then post to database */
            const responseNewObject = await postObjectModel.mutateAsync({
              data: {
                renovationId: renovationId,
                objectId: model.modelId,
                x: model.position[0],
                y: model.position[1],
                z: model.position[2],
                rotationX: model.rotation[0],
                rotationY: model.rotation[1],
                rotationZ: model.rotation[2],
                scaleX: model.scale,
                scaleY: model.scale,
                scaleZ: model.scale,
                visible: model.visible,
              },
            });
            /* After post change flag isNewObject to false and add idInRenovation from post response */
            if (responseNewObject) {
              model.idInRenovation =
                (responseNewObject as any)?.id || responseNewObject.toString();
            } else {
              success = false;
            }
            model.isNewObject = false;
          }
        } catch (error) {
          console.error("Error saving object:", error);
          setErrorMessage(`Błąd zapisania mebla ${model.name}!`);
          success = false;
        }
      }
    }
    /* Delete Models which have flag isNewObject == true */
    if (deleteModelsList.length > 0) {
      for (const deleteModel of deleteModelsList) {
        try {
          await deleteObjectModel.mutateAsync({
            id: deleteModel.idInRenovation || "",
          });
        } catch (error) {
          console.error("Error deleting object:", error);
          setErrorMessage(`Błąd usunięcia mebla ${deleteModel.name}!`);
          success = false;
        }
      }
      setDeleteModelsList([]);
    }
    if (success) {
      setIsSuccess(true);
    } else {
      setIsFailed(true);
    }
  }, [models, roomInRenovationId, renovationId]);

  return (
    <>
      <SideBar isMobile={isMobile} />

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
          <ModelSettings
            models={models}
            updateModel={updateModel}
            removeModel={removeModel}
            activeModel={activeModel}
            selectModel={(id) => setActiveModelId(id)}
            handleAddModel={(
              id: string,
              modelId: string,
              name: string,
              url: string
            ) => {
              addModel(id, modelId, name, url, true, false);
            }}
            saveModelsToDatabase={saveModelToDatabase}
            furniture={filteredObjectData}
            renovationName={renovationName}
            setRenovationName={setRenovationName}
            renovationRequest={renovationRequest}
            renovationCanEdit={renovationCanEdit}
            setIsFailed={setIsFailed}
            setErrorMessage={setErrorMessage}
          />
          <Options
            setMode={setMode}
            setActiveMesh={setActiveMesh}
            activeMesh={activeMesh}
            setColorPicker={setThemeBackground}
            color={themeBackground}
          />
          <ControlInfo />
          <AnimatePresence>
            {isSuccess && (
              <SuccessNotification
                text="Twoja renowacja została zapisana!"
                closeNotification={closeNotificationSuccess}
              />
            )}

            {isFailed && (
              <FailedNotification
                text={errorMessage}
                closeNotification={closeNotificationFailed}
              />
            )}
          </AnimatePresence>

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
