// ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Button, Box, Alert } from '@mui/material';

interface FileUploadProps {
  setUploadedImageUrl: (url: string) => void;
  setUploadedDoctorImageUrl: (url: string) => void;
  setBasicResult1: (result: string) => void;
  setBasicResult2: (result: string) => void; // 修正函数声明
  setDetailedResult: (result: string) => void;
}

const ImageUpload: React.FC<FileUploadProps> = ({ setUploadedImageUrl, setUploadedDoctorImageUrl, setBasicResult1, setBasicResult2,setDetailedResult }) => {
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
        setBasicResult1(data.basic_result1);
        setBasicResult2(data.basic_result2);
        setDetailedResult(data.detailed_result);
        setError(null);
      } else {
        setError('Failed to upload image.');
      }

      if (data.message && data.message === 'Percent too low') {
        alert('舌象清晰度太低或距离舌头距离太远，请重新上传图片');
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
        style={{ fontSize: "20px", padding: "10px 20px" }} // 调整字体大小和内边距
      >
        点击上传图像
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default ImageUpload;
