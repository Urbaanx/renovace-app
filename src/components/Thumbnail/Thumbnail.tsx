import { MoonLoader } from "react-spinners";
import { memo } from "react";
import { useThumbnailsCardsCache } from "../../pages/HomePage/subpages/useThumbnailsCardsCacheFunction";

interface ThumbnailProps {
  name: string;
  id: string;
  type: string;
  modelGenerated: boolean;
  error: string | null;
}

function Thumbnail({ name, id, type, modelGenerated, error }: ThumbnailProps) {
  const { thumbnailData, thumbnailError, isThumbnailLoading } =
    useThumbnailsCardsCache(id, type, modelGenerated, error);

  return isThumbnailLoading ? (
    <div className="flex flex-col h-40 place-items-center items-center place-content-center gap-5 text-background">
      <MoonLoader size={40} />
      Ładowanie...
    </div>
  ) : thumbnailError ? (
    <div className="flex items-center justify-center h-full">
      Błąd wczytania obrazka
    </div>
  ) : (
    <img
      src={thumbnailData || "default_image_url"}
      alt={name}
      className="w-full h-full object-cover"
    />
  );
}

export default memo(Thumbnail);
