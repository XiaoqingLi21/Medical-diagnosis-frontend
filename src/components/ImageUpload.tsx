// ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Button, Box, Alert } from '@mui/material';

interface ImageUploadProps {
  setUploadedImageUrl: (url: string) => void;
  setUploadedDoctorImageUrl: (url: string) => void; // 添加这一行
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setUploadedImageUrl, setUploadedDoctorImageUrl }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an image file (jpeg, png, gif).');
      return;
    }

    // Prepare file for upload
    const formData = new FormData();
    formData.append('file', file);

    // TODO: Replace URL with your actual upload endpoint
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.filename) {
        const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl); // 立即显示上传的舌头图片

        // Update the doctor image with a predefined local image
        // Adjust the path according to your project structure
        const doctorImageUrl = '/picture/good-results.jpg';
        setUploadedDoctorImageUrl(doctorImageUrl);
        setError(null);
      } else {
        setError('Failed to upload image.');
      }
    })
    .catch(() => {
      setError('Failed to upload image.');
    });
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        type="file"
        onChange={handleImageChange}
      />
      <Button
        variant="outlined"
        component="span"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default ImageUpload;
