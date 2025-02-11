
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { PresetGallery } from "@/components/PresetGallery";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wand2 } from "lucide-react";

const Index = () => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  const handleFaceSwap = async () => {
    if (!selectedPreset || !uploadedImage) {
      toast.error("Please select a preset image and upload your photo");
      return;
    }

    setIsProcessing(true);
    // TODO: Implement face swap logic
    setTimeout(() => {
      toast.info("Face swap feature coming soon!");
      setIsProcessing(false);
    }, 2000);
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
          </section>

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
