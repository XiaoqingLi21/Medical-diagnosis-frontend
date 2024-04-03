// ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Button, Box, Alert } from '@mui/material';

const ImageUpload: React.FC<{ setUploadedImageUrl: (url: string) => void }> = ({ setUploadedImageUrl }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const file = event.target.files ? event.target.files[0] : null;
    if (file && validTypes.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl); // 更新父组件的状态
      setError(null);
    } else {
      setError('Please upload an image file (jpeg, png, gif).');
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <Button
        variant="outlined" // 或者 "contained"，取决于您想要的风格
        component="span"
        onClick={() => fileInputRef.current?.click()}
        sx={{
          mt: 2,
          py: 1.5, // 增加垂直内边距
          px: 3, // 增加水平内边距
          fontSize: '1rem', // 增大字体大小
          borderRadius: '0', // 移除圆角效果
          textTransform: 'none', // 取消大写字母样式
          // 其他您希望的样式调整...
        }}
      >
        Upload Tongue Image
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default ImageUpload;
