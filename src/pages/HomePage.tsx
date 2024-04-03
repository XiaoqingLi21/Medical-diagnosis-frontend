// src/components/HomePage.tsx
import { Grid, Typography, Button, Box, Paper, AppBar, Toolbar, IconButton } from '@mui/material';
//import MenuIcon from '@mui/icons-material/Menu'; // 如果需要的话
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';

const HomePage: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedDoctorImageUrl, setUploadedDoctorImageUrl] = useState<string>('picture/doctor.png'); // 默认医生图片路径

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      {/* 核心内容 */}
      <Grid container justifyContent="center" alignItems="flex-start" sx={{ minHeight: 'auto', bgcolor: 'background.default', p: 4 }}>

        {/* 标题和副标题 */}
        <Grid item xs={12} sx={{ mb: 4 }}>
          {/* 将对齐方式改为flex-start，即左对齐 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 28 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
              Tongue Diagnosis
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: '1.75rem', ml: 54 }}>
              智慧舌苔图像诊疗平台
            </Typography>
            <Box sx={{ width: '100%', borderTop: '1px solid #e0e0e0', my: 0, }} />
          </Box>
        </Grid>


        {/* 上传区域和诊断结果区域 */}
        {/* 减少间距 */}
        <Grid container spacing={20} justifyContent="center" sx={{ px: 0, py: 2 }}>

          {/* 上传区域 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '450px', maxWidth: '450px' }}>
              {/* 条件渲染：如果有上传的图片就显示它，否则显示默认图片 */}

              <Box sx={{ width: '100%' }}>
                {uploadedImageUrl ? (
                  <img src={uploadedImageUrl} alt="Tongue" style={{ width: '100%', height: 'auto' }} />
                ) : (
                  <img src="/picture/tongue.png" alt="Tongue" style={{ width: '100%', height: 'auto' }} />
                )}
              </Box>
              <Typography variant="h6" sx={{ mt: 1, alignSelf: 'flex-start' }}>Your Tongue Here</Typography>
              <Typography sx={{ my: 1, alignSelf: 'flex-start' }}>Improving the clarity of images can help with accurate diagnostic results</Typography>

              <ImageUpload setUploadedImageUrl={setUploadedImageUrl} setUploadedDoctorImageUrl={setUploadedDoctorImageUrl} />
            </Paper>
          </Grid>

          {/* 诊断结果区域 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '450px', maxWidth: '450px' }}>
              {/* <Typography variant="h6" sx={{ mb: 1 }}>
                Diagnosis Results:
              </Typography> */}
              <Box sx={{ width: '100%', alignSelf: 'center' }}>
                <img src={uploadedDoctorImageUrl} alt="Doctor" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
              <Typography sx={{ mt: 0, alignSelf: 'flex-start', fontSize: '1.5rem' }}> Diagnosis Results:</Typography>
              <Typography variant="caption" sx={{ mt: 1, fontSize: '1.3rem', marginLeft: 'auto', mr: 10 }}>
                unknown
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default HomePage;


