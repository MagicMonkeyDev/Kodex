export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB for base64
  if (file.size > MAX_SIZE) {
    throw new Error('Image must be less than 2MB');
  }
};