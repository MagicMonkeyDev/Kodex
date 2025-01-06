import { useState } from 'react';
import { validateImageFile, convertToBase64 } from '../utils/fileValidation';

export const useImageUpload = (onImageUploaded: (url: string) => void) => {
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      setError(null);
      setUploading(true);

      try {
        validateImageFile(file);
      } catch (validationError) {
        setError(validationError instanceof Error ? validationError.message : 'Invalid file');
        return;
      }

      // Convert to base64
      const base64Data = await convertToBase64(file);
      setPreview(base64Data);
      onImageUploaded(base64Data);

    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to upload image. Please try again.';
      console.error('Image upload error:', err);
      setError(errorMessage);
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  return {
    preview,
    uploading,
    error,
    handleFileChange
  };
};