import React, { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import RenovationCardPortal from "./RenovationCardPortal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useGetApiPortalRenovation,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";
import { MoonLoader } from "react-spinners";

const RenovationCardCarousel: React.FC = () => {
  const {
    data: renovationData,
    isLoading: renovationLoading,
  }: { data?: { returnedObjects: any[] }; isLoading: boolean } =
    useGetApiPortalRenovation();

  const renovations = useMemo(
    () => renovationData?.returnedObjects || [],
    [renovationData]
  );

  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    let isMounted = true;
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
      Object.values(thumbnails).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [renovationData]);

  const settings = {
    dots: false,
    infinite: renovations.length > 4,
    speed: 500,
    slidesToShow:
      renovations.length > 0 ? Math.max(1, Math.min(4, renovations.length)) : 1,
    slidesToScroll: 1,
    centerMode: renovations.length > 4,
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, renovations.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, renovations.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, renovations.length),
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-visible px-5">
      {renovationLoading && (
        <div className="pt-10  flex justify-center">
          <MoonLoader />
        </div>
      )}
      {renovations.length != 0 && !renovationLoading && (
        <Slider {...settings}>
          {renovations.map((renovation) => (
            <div key={renovation.id} className="px-4 py-10">
              <RenovationCardPortal
                name={renovation.name}
                thumbnail={thumbnails[renovation.id]}
                author={renovation.author}
                ownerId={renovation.ownerId}
                id={renovation.id}
              />
            </div>
          ))}
        </Slider>
      )}
      {renovations.length === 0 && !renovationLoading && (
        <div className="pt-10 justify-start">
          Obecnie brak dostępnych renowacji
        </div>
      )}
    </div>
  );
};

export default RenovationCardCarousel;
