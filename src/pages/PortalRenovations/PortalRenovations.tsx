import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../PortalPage/NavbarPortal";
import RenovationCard from "../PortalPage/RenovationCardPortal";
import Header from "./Header";
import InfoSection from "./InfoSection";
import Paginator from "./Paginator";
import {
  useGetApiPortalRenovation,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";

const itemsPerPage = 12;

export default function PortalRenovations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "author">("name");

  const { data: renovationData }: { data?: { returnedObjects: any[] } } =
    useGetApiPortalRenovation();
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

  const handleSearch = (query: string, type: "name" | "author") => {
    setSearchQuery(query.toLowerCase());
    setSearchType(type);
    setCurrentPage(1);
  };

  const filteredRenovations = renovations.filter((r) => {
    const field = searchType === "name" ? r.name : r.author;
    return field?.toLowerCase().includes(searchQuery);
  });

  const totalPages = Math.ceil(filteredRenovations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = filteredRenovations.slice(
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
            {currentCards.map((renovation) => (
              <RenovationCard
                key={renovation.id}
                id={renovation.ownerId}
                name={renovation.name}
                thumbnail={thumbnails[renovation.id]}
                author={renovation.author}
                ownerId={renovation.ownerId}
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
