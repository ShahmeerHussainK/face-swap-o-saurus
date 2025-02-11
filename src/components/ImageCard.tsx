
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ImageCard = ({ src, alt, isSelected, onClick }: ImageCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-lg",
        "transform hover:scale-[1.02]",
        isSelected && "ring-4 ring-accent"
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
