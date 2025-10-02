import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../PortalPage/NavbarPortal";
import RenovationCard from "../PortalPage/RenovationCardPortal";
import Paginator from "../PortalRenovations/Paginator";
import {
  useGetApiPortalRenovation,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";

const itemsPerPage = 12;

export default function RenovationsDecoratorPublic() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const ownerId = searchParams.get("id");

  if (ownerId != null) {
  }
  const { data: renovationData }: { data?: { returnedObjects: any[] } } =
    useGetApiPortalRenovation({ ownerFilter: ownerId || "" });
  const renovations = renovationData?.returnedObjects || [];

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
        renovations.map(async (renovation) => {
          const thumbnailId = renovation.id;
          if (thumbnailId) {
            try {
              const thumbnailBlob = await getApiPortalThumbnailId(thumbnailId, {
                type: 0,
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
  }, [renovations]);

  const totalPages = Math.ceil(renovations.length / itemsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = renovations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-mainColorText text-background">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-2 pl-3">
            Zobacz renowacje dekoratora wnętrz 
          </h1>
          <p className="text-sm font-light mb-10 pl-3">
            Zapoznaj się z portfolio i odkryj, jak może wyglądać Twoje wymarzone
            wnętrze.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {currentCards.map((renovation) => (
              <RenovationCard
                key={renovation.id}
                id={renovation.id}
                ownerId={renovation.ownerId}
                name={renovation.name}
                thumbnail={thumbnails[renovation.id]}
                author={renovation.author}
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
