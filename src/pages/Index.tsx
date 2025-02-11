
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { PresetGallery } from "@/components/PresetGallery";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setResultImage(null);
    // Create preview URL for the uploaded image
    const previewUrl = URL.createObjectURL(file);
    setUploadedImagePreview(previewUrl);
  };

  const handleFaceSwap = async () => {
    if (!selectedPreset || !uploadedImage) {
      toast.error("Please select a preset image and upload your photo");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Create form data
      const formData = new FormData();

      // First, fetch the preset image and convert it to a file
      const presetResponse = await fetch(selectedPreset);
      const presetBlob = await presetResponse.blob();
      const presetFile = new File([presetBlob], "target.jpg", { type: "image/jpeg" });

      formData.append("target_file", presetFile);
      formData.append("source_file", uploadedImage);

      // Make the API call
      const response = await fetch("http://127.0.0.1:8000/swap_faces/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Face swap failed");
      }

      // Convert the response to a blob and create an object URL
      const resultBlob = await response.blob();
      const resultUrl = URL.createObjectURL(resultBlob);
      setResultImage(resultUrl);
      toast.success("Face swap completed successfully!");
    } catch (error) {
      console.error("Face swap error:", error);
      toast.error("Failed to swap faces. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <div className="container max-w-6xl py-12 space-y-12">
        <div className="text-center space-y-4 animate-slideUp">
          <div className="inline-flex items-center px-4 py-1.5 bg-soft-purple rounded-full text-secondary text-sm font-medium">
            Face Swap Magic
          </div>
          <h1 className="text-4xl font-bold text-primary">
            Transform Your Photos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a preset image, upload your photo, and watch the magic happen.
            Our AI-powered face swap technology will create a seamless blend.
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4 animate-slideUp" style={{ "--delay": "0.2s" } as any}>
            <h2 className="text-2xl font-semibold text-primary">
              Choose a Preset Image
            </h2>
            <PresetGallery
              selectedImage={selectedPreset}
              onImageSelect={setSelectedPreset}
            />
          </section>

          <section className="space-y-4 animate-slideUp" style={{ "--delay": "0.4s" } as any}>
            <h2 className="text-2xl font-semibold text-primary">
              Upload Your Photo
            </h2>
            <ImageUpload onImageSelect={handleImageUpload} />
            
            {uploadedImagePreview && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={uploadedImagePreview} 
                  alt="Uploaded Preview" 
                  className="w-full h-auto max-h-[300px] object-contain"
                />
              </div>
            )}
          </section>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-gray-600">Processing your image...</p>
            </div>
          )}

          {resultImage && (
            <section className="space-y-4 animate-slideUp">
              <h2 className="text-2xl font-semibold text-primary">Result</h2>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={resultImage} 
                  alt="Face Swap Result" 
                  className="w-full h-auto"
                />
              </div>
            </section>
          )}

          <div className="flex justify-center pt-4 animate-slideUp" style={{ "--delay": "0.6s" } as any}>
            <Button
              size="lg"
              onClick={handleFaceSwap}
              disabled={!selectedPreset || !uploadedImage || isProcessing}
              className="bg-accent hover:bg-accent/90 text-white"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Swap Faces
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
