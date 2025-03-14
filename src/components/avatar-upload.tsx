"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Upload, X } from "lucide-react";

interface AvatarUploadProps {
  initialImageUrl?: string;
  userInitials: string;
  onUpload?: (file: File) => Promise<void>;
}

export default function AvatarUpload({
  initialImageUrl,
  userInitials,
  onUpload,
}: AvatarUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    if (onUpload) {
      try {
        setIsUploading(true);
        await onUpload(file);
      } catch (error) {
        console.error("Error uploading avatar:", error);
        // Revert to previous image on error
        setImageUrl(initialImageUrl);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(undefined);
    // In a real implementation, you would also call an API to remove the image
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
            {imageUrl ? null : userInitials}
          </AvatarFallback>
        </Avatar>

        {imageUrl && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          asChild
          disabled={isUploading}
        >
          <label>
            <Upload className="h-4 w-4" />
            <span>{isUploading ? "Uploading..." : "Upload Avatar"}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </Button>
      </div>
    </div>
  );
}
