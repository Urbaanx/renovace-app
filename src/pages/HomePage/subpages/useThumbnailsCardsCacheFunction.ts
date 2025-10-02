import { useGetApiObjectThumbnailId, useGetApiRenovationThumbnailId, useGetApiRoomThumbnailId } from "../../../api/endpoints/api";
import { useEffect, useState } from "react";

export function useThumbnailsCardsCache(id: string, type: string, modelGenerated: boolean, error: any) {
    
    const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(null);
    
   
    const thumbnailCards = JSON.parse(sessionStorage.getItem("thumbnailCards") || "[]");
    const isThumbnailInCard = thumbnailCards.some((card: {id: string}) => card.id === id);
    const foundCard = isThumbnailInCard ? thumbnailCards.find((card: {id: string}) => card.id === id) : undefined;
    
    const {
        data: thumbnailDataRenovation,
        isLoading: isThumbnailLoadingRenovation,
        error: thumbnailErrorRenovation,
    } = useGetApiRenovationThumbnailId(id, {
        query: {
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: type === "renovation" && !isThumbnailInCard && modelGenerated && error === null
        },
    });

    const {
        data: thumbnailDataRoom,
        isLoading: isThumbnailLoadingRoom,
        error: thumbnailErrorRoom,
    } = useGetApiRoomThumbnailId(id, {
        query: {
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: type === "room" && !isThumbnailInCard && modelGenerated && error === null
        },
    });
    
    const {
        data: thumbnailDataFurniture,
        isLoading: isThumbnailLoadingFurniture,
        error: thumbnailErrorFurniture,
    } = useGetApiObjectThumbnailId(id, {
        query: {
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: type === "furniture" && !isThumbnailInCard && modelGenerated && error === null
        },
    });

   
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    
    useEffect(() => {
        const handleThumbnailData = async () => {
            if (thumbnailDataRenovation && type === "renovation" && !isThumbnailInCard) {
                try {
                   
                    const base64data = await blobToBase64(thumbnailDataRenovation);
                    
                    
                    const newThumbnail = { id: id, thumbnailBase64: base64data };
                    const updatedThumbnails = [...thumbnailCards, newThumbnail];
                    sessionStorage.setItem("thumbnailCards", JSON.stringify(updatedThumbnails));
                    
                   
                    const url = URL.createObjectURL(thumbnailDataRenovation);
                    setCurrentThumbnailUrl(url);
                } catch (error) {
                    console.error("Error while processing thumbnail renovation:", error);
                }
            }
        };
        
        handleThumbnailData();
    }, [thumbnailDataRenovation, id, type, isThumbnailInCard, thumbnailCards]);

   
    useEffect(() => {
        const handleThumbnailData = async () => {
            if (thumbnailDataRoom && type === "room" && !isThumbnailInCard) {
                try {
                    
                    const base64data = await blobToBase64(thumbnailDataRoom);
                    
                    
                    const newThumbnail = { id: id, thumbnailBase64: base64data };
                    const updatedThumbnails = [...thumbnailCards, newThumbnail];
                    sessionStorage.setItem("thumbnailCards", JSON.stringify(updatedThumbnails));
                    
                    
                    const url = URL.createObjectURL(thumbnailDataRoom);
                    setCurrentThumbnailUrl(url);
                } catch (error) {
                    console.error("Error while processing thumbnail room:", error);
                }
            }
        };
        
        handleThumbnailData();
    }, [thumbnailDataRoom, id, type, isThumbnailInCard, thumbnailCards]);

    
    useEffect(() => {
        const handleThumbnailData = async () => {
            if (thumbnailDataFurniture && type === "furniture" && !isThumbnailInCard) {
                try {
                    
                    const base64data = await blobToBase64(thumbnailDataFurniture);
                    
                    
                    const newThumbnail = { id: id, thumbnailBase64: base64data };
                    const updatedThumbnails = [...thumbnailCards, newThumbnail];
                    sessionStorage.setItem("thumbnailCards", JSON.stringify(updatedThumbnails));
                    
                    
                    const url = URL.createObjectURL(thumbnailDataFurniture);
                    setCurrentThumbnailUrl(url);
                } catch (error) {
                    console.error("Error while processing thumbnail furniture:", error);
                }
            }
        };
        
        handleThumbnailData();
    }, [thumbnailDataFurniture, id, type, isThumbnailInCard, thumbnailCards]);

    
    useEffect(() => {
        const loadCachedThumbnail = async () => {
            if (isThumbnailInCard && foundCard && foundCard.thumbnailBase64) {
                try {
                    if (isThumbnailInCard && foundCard && foundCard.thumbnailBase64) {
                    setCurrentThumbnailUrl(foundCard.thumbnailBase64);
                    }
                    // const response = await fetch(foundCard.thumbnailBase64);
                    // const blob = await response.blob();
                    
                    
                    // const url = URL.createObjectURL(blob);
                    // setCurrentThumbnailUrl(url);
                } catch (error) {
                    console.error("Error while processing thumbnail cache:", error);
                }
            }
        };
        
        loadCachedThumbnail();
    }, [isThumbnailInCard, foundCard]);

    
    useEffect(() => {
        return () => {
            if (currentThumbnailUrl) {
                URL.revokeObjectURL(currentThumbnailUrl);
            }
        };
    }, [currentThumbnailUrl]);

    
    return {
        thumbnailData: currentThumbnailUrl,
        isThumbnailLoading: !isThumbnailInCard && (
            type === "renovation" ? isThumbnailLoadingRenovation :
            type === "room" ? isThumbnailLoadingRoom :
            isThumbnailLoadingFurniture
        ),
        thumbnailError: !isThumbnailInCard && (
            type === "renovation" ? thumbnailErrorRenovation :
            type === "room" ? thumbnailErrorRoom :
            thumbnailErrorFurniture
        ),
    };
}