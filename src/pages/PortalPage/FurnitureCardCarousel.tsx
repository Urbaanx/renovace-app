import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import FurnitureCardPortal from "./FurnitureCardPortal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useGetApiPortalObject,
  getApiPortalThumbnailId,
} from "../../api/endpoints/api";
import { MoonLoader } from "react-spinners";

const FurnitureCardCarousel: React.FC = () => {
  const {
    data: furnitureData,
    isLoading: furnitureLoading,
  }: { data?: { returnedObjects: any[] }; isLoading: boolean } =
    useGetApiPortalObject();
  const furnitures = furnitureData?.returnedObjects || [];
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

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
            } catch (e) {
              console.error("Error fetching thumbnail:", e);
            }
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
  }, [furnitureData]);

  const settings = {
    dots: false,
    infinite: furnitures.length > 4,
    speed: 500,
    slidesToShow: Math.max(1, Math.min(4, furnitures.length)),
    slidesToScroll: 1,
    centerMode: furnitures.length > 4,
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, furnitures.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, furnitures.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, furnitures.length),
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-visible px-5">
      {furnitureLoading && (
        <div className="pt-10  flex justify-center">
          <MoonLoader />
        </div>
      )}
      {furnitures.length != 0 && !furnitureLoading && (
        <Slider {...settings}>
          {furnitures.map((furniture) => (
            <div key={furniture.id} className="px-4 py-10">
              <FurnitureCardPortal
                name={furniture.name}
                thumbnail={thumbnails[furniture.id]}
                shop={furniture.author}
                id={furniture.id}
                ownerId={furniture.ownerId}
              />
            </div>
          ))}
        </Slider>
      )}
      {furnitures.length === 0 && !furnitureLoading && (
        <div className="pt-10">Obecnie brak dostępnych mebli</div>
      )}
    </div>
  );
};

export default FurnitureCardCarousel;
