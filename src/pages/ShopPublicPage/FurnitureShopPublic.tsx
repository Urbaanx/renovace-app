import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../PortalPage/NavbarPortal";
import FurnitureCard from "../PortalPage/FurnitureCardPortal";
import Paginator from "../PortalRenovations/Paginator";
import {
  useGetApiPortalObject,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";

const itemsPerPage = 12;

export default function FurnitureShopPublic() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const ownerId = searchParams.get("id");
  const { data: furnitureData }: { data?: { returnedObjects: any[] } } =
    useGetApiPortalObject({ ownerFilter: ownerId || "" });
  const furnitures = furnitureData?.returnedObjects || [];
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchedUrls: string[] = [];

    const fetchThumbnails = async () => {
      const fetchedThumbnails: { [key: string]: string } = {};
      await Promise.all(
        furnitures.map(async (furniture) => {
          const thumbnailId = furniture.id;
          if (thumbnailId) {
            try {
              const thumbnailBlob = await getApiPortalThumbnailId(thumbnailId, {
                type: 1,
              });
              if (thumbnailBlob) {
                const objectUrl = URL.createObjectURL(thumbnailBlob);
                fetchedThumbnails[thumbnailId] = objectUrl;
                fetchedUrls.push(objectUrl);
              }
            } catch (e) {}
          }
        })
      );
      if (isMounted) setThumbnails(fetchedThumbnails);
    };

    fetchThumbnails();

    return () => {
      isMounted = false;
      fetchedUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [furnitures]);

  const totalPages = Math.ceil(furnitures.length / itemsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = furnitures.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-mainColorText text-background">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-2 pl-3">
            Zobacz, jak meble tego sklepu będą wyglądać w Twoim domu!
          </h1>
          <p className="font-light text-sm mb-10 pl-3">
            Zapoznaj się z produktami, które ten sklep ma w swojej ofercie.
            Sprawdź, jak pasują do Twojego wnętrza!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {currentCards.map((furniture) => (
              <FurnitureCard
                key={furniture.id}
                id={furniture.id}
                ownerId={furniture.ownerId}
                name={furniture.name}
                thumbnail={thumbnails[furniture.id]}
                shop={furniture.author}
              />
            ))}
          </div>
        </div>
      </main>

      <div className="py-4">
        <div className="max-w-6xl mx-auto px-8">
          <Paginator
            pages={totalPages}
            onChangePage={handlePageChange}
            startingPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
