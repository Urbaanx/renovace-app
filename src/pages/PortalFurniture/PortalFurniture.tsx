import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../PortalPage/NavbarPortal";
import FurnitureCard from "../PortalPage/FurnitureCardPortal";
import Header from "./Header";
import InfoSection from "./InfoSection";
import Paginator from "../PortalRenovations/Paginator";
import {
  useGetApiPortalObject,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";

const itemsPerPage = 12;

export default function PortalFurniture() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "shop">("name");

  const { data: furnitureData }: { data?: { returnedObjects: any[] } } =
    useGetApiPortalObject();
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

  const handleSearch = (query: string, type: "name" | "shop") => {
    setSearchQuery(query.toLowerCase());
    setSearchType(type);
    setCurrentPage(1);
  };

  const filteredFurnitures = furnitures.filter((f) => {
    const field = searchType === "name" ? f.name : f.author;
    return field?.toLowerCase().includes(searchQuery);
  });

  const totalPages = Math.ceil(filteredFurnitures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = filteredFurnitures.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen bg-mainColorText">
      <NavBar />
      <main className="flex-grow">
        <Header onSearch={handleSearch} />
        <InfoSection />
        <div className="max-w-6xl p-8 mx-auto">
          <div className="flex flex-wrap gap-2 mb-20">
            {currentCards.map((furniture) => (
              <FurnitureCard
                key={furniture.id}
                id={furniture.ownerId}
                name={furniture.name}
                thumbnail={thumbnails[furniture.id]}
                shop={furniture.author}
                ownerId={furniture.ownerId}
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

      <Footer />
    </div>
  );
}
