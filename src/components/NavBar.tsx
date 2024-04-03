import React from 'react';
import { AppBar, Toolbar, Button, Typography, useTheme } from '@mui/material';

const NavBar: React.FC = () => {
  const theme = useTheme(); // 使用主题钩子获取主题

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}> {/* 移除阴影和背景色 */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 30, color: 'green' , fontSize: '1.5rem'}}>
          Xiaoqing's App
        </Typography>
        <Button color="inherit" sx={{ color: 'black' , fontSize: '1rem'}}>About me</Button>
        <Button color="inherit" sx={{ color: 'black' , fontSize: '1rem'}}>Newsstand</Button>
        <Button color="inherit" sx={{ color: 'black' , fontSize: '1rem'}}>Who we are</Button>
        <Button color="inherit" sx={{ color: 'black' , fontSize: '1rem'}}>My account</Button>
        <Button
          color="inherit"
          sx={{
            backgroundColor: theme.palette.success.main, // 使用主题中的颜色
            '&:hover': {
              backgroundColor: theme.palette.success.dark, // 悬浮时的颜色
              fontSize: '1.5rem'
            },
            color: 'white', // 按钮文字颜色
            marginRight: 30 // 右边距
          }}
        >
          Exit
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
