
import { ImageCard } from "./ImageCard";

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
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
