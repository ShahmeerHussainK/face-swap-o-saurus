
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type.startsWith("image/")) {
          onImageSelect(file);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Please upload an image file");
        }
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 border-2 border-dashed rounded-lg cursor-pointer
        transition-all duration-200 bg-soft-gray/50
        ${isDragging ? "border-accent bg-soft-purple/20" : "border-gray-300"}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-gray-600">
        <Upload className="w-10 h-10" />
        <p className="text-center">
          Drag & drop your image here, or click to select
        </p>
        <p className="text-sm text-gray-500">Supports JPG, JPEG, PNG</p>
      </div>
    </div>
  );
};
