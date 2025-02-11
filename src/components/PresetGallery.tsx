
import { ImageCard } from "./ImageCard";

const PRESET_IMAGES = [
  "/preset1.jpg",
  "/preset2.jpg",
  "/preset3.jpg"
];

interface PresetGalleryProps {
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

export const PresetGallery = ({
  selectedImage,
  onImageSelect,
}: PresetGalleryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {PRESET_IMAGES.map((image, index) => (
        <ImageCard
          key={index}
          src={image}
          alt={`Preset ${index + 1}`}
          isSelected={selectedImage === image}
          onClick={() => onImageSelect(image)}
        />
      ))}
    </div>
  );
};
