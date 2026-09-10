"use client";

import { useState } from "react";
import { Upload, Loader2, Check, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  name: string;
  defaultValue?: string;
  label?: string;
}

export function ImageUploader({ name, defaultValue = "", label = "Image" }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setImageUrl(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      
      {/* Hidden input to submit with standard Form Actions */}
      <input type="hidden" name={name} value={imageUrl} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {imageUrl ? (
          <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-border bg-secondary">
            <img src={imageUrl} alt="Uploaded preview" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/50 text-muted-foreground">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading to Cloudinary...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Choose File & Upload
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {imageUrl && (
              <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                <Check className="h-3.5 w-3.5" /> Uploaded
              </span>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground">
            Or paste image URL directly:
          </p>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-lg border border-border bg-input px-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
