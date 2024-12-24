import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="static"
        color="primary"
        elevation={1}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            dir="rtl"
            disableGutters
            sx={{ justifyContent: "flex-start" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                ml: 2,
                color: "white",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: "white",
              }}
            >
              GLOBAL TERRORISM
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                sx={{ color: "white" }}
              >
                <HomeIcon />
              </IconButton>

              <IconButton
                color="inherit"
                sx={{
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 כל הזכויות שמורות
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
