// src/components/Footer.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'grey.200', py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" color="text.secondary" align="center">
          © 2024 Xiaoqing's App, Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
