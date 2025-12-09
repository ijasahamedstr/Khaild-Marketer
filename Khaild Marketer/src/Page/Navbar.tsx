import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/* --- Arabic pages (removed duplicate 'أقسامنا') --- */
const pages = [
  { label: 'الرئيسية', path: '/' },
  { label: 'أقسامنا', path: '/أقسامنا' },
  { label: 'من نحن', path: '/من نحن' },
  { label: 'إتصل بنا', path: '/إتصل بنا' },
];

/* --- Projects dropdown --- */
const projectsSubMenu = [
  { label: 'أقسامنا', path: '/projects' },
  { label: 'المشاريع الجارية', path: '/projects/ongoing' },
  { label: 'المشاريع المكتملة', path: '/projects/completed' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [projectsMenuAnchor, setProjectsMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const [mobileProjectsOpen, setMobileProjectsOpen] = React.useState(false);

  const location = useLocation();

  const isDesktop = useMediaQuery('(min-width:1024px)');
  const isMarginTop57px = useMediaQuery(
    '(min-width:768px) and (max-width:1024px), (min-width:820px) and (max-width:1180px), (min-width:853px) and (max-width:1280px), (min-width:912px) and (max-width:1368px)'
  );

  React.useEffect(() => {
    setDrawerOpen(false);
    setProjectsMenuAnchor(null);
    setMobileProjectsOpen(false);
  }, [location]);

  const activeColor = '#CC9D2F';
  const activeBg = 'rgba(204,157,47,0.15)';

  const isActive = (path: string) => location.pathname === path;

  const marginTopValue = isDesktop || isMarginTop57px ? '' : '0px';
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handleProjectsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProjectsMenuAnchor(event.currentTarget);
  };

  const handleProjectsMenuClose = () => {
    setProjectsMenuAnchor(null);
  };

  const isProjectsMenuOpen = Boolean(projectsMenuAnchor);

  // central font for all menu items
  const menuFont = 'Tajawal, sans-serif';

  return (
    <AppBar
      position="static"
      dir="rtl"
      sx={{
        direction: 'rtl',
        backgroundColor: '#023B4E',
        color: '#A69196',
        fontFamily: menuFont,
          fontWeight: 500,
                          
        transition: 'margin-top 0.3s ease',
        marginTop: marginTopValue,
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: isDesktop ? 'flex-start' : 'space-between',
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Box
              component="img"
              src="https://i.ibb.co/yn0gbKdZ/Gemini-Generated-Image-pua0mbpua0mbpua0-removebg-preview.png"
              alt="Logo"
              sx={{ maxHeight: 90, width: 'auto' }}
            />
          </Box>

          {/* Desktop Menu */}
          {isDesktop ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, mr: 3 }}>
              {pages.map(({ label, path }, index) => {
                // Use label check to determine the projects dropdown (robust to array changes)
                if (label === 'أقسامنا') {
                  const dropdownActive = location.pathname.includes('/projects');

                  return (
                    <React.Fragment key={label}>
                      <Button
                        onClick={handleProjectsMenuOpen}
                        sx={{
                          color: dropdownActive ? activeColor : 'white',
                          fontFamily: menuFont,
          fontWeight: 500,
                          
                          fontSize: '20px',
                          
                          textTransform: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {label}
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: 24,
                            transition: '0.3s',
                            color: dropdownActive ? activeColor : 'white',
                            transform: isProjectsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </Button>

                      <Menu
                        anchorEl={projectsMenuAnchor}
                        open={isProjectsMenuOpen}
                        onClose={handleProjectsMenuClose}
                      >
                        {projectsSubMenu.map((item) => (
                          <MenuItem
                            key={item.label}
                            component={Link}
                            to={item.path}
                            onClick={handleProjectsMenuClose}
                            sx={{
                              fontFamily: menuFont,
          fontWeight: 500,
                          
                              fontSize: '18px',
                              backgroundColor: isActive(item.path) ? activeBg : 'transparent',
                              color: isActive(item.path) ? activeColor : 'black',
                              justifyContent: 'flex-end',
                            }}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  );
                }

                return (
                  <Button
                    key={label}
                    component={Link}
                    to={path}
                    sx={{
                      color: isActive(path) ? activeColor : 'white',
                      fontFamily: menuFont,
          fontWeight: 500,
                          
                      fontSize: '20px',
                      
                      textTransform: 'none',
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#A69196' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 340,
            direction: 'rtl',
            borderRadius: '16px 0 0 16px',
            fontFamily: menuFont,
          fontWeight: 500,
                          
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'right' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="img"
              src="https://i.ibb.co/yn0gbKdZ/Gemini-Generated-Image-pua0mbpua0mbpua0-removebg-preview.png"
              alt="Logo"
              sx={{ maxHeight: 70 }}
            />
          </Box>

          <List sx={{ textAlign: 'right', fontFamily: menuFont,
          fontWeight: 500 }}>
            {pages.map(({ label, path }, index) => (
              <React.Fragment key={label}>
                {/* المشاريع Dropdown Mobile: use label check instead of fixed index */}
                {label === 'أقسامنا' ? (
                  <>
                    <ListItemButton
                      onClick={() => setMobileProjectsOpen((prev) => !prev)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: location.pathname.includes('/projects') ? activeBg : 'transparent',
                        fontFamily: menuFont,
          fontWeight: 500,
                          
                      }}
                    >
                      <ListItemText
                        primary={label}
                        primaryTypographyProps={{
                          fontFamily: menuFont,
          fontWeight: 500,
                          
                          fontSize: '19px',
                          
                          color: location.pathname.includes('/projects') ? activeColor : 'black',
                          textAlign: 'right',
                        }}
                      />
                      <KeyboardArrowDownIcon
                        sx={{
                          transform: mobileProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: location.pathname.includes('/projects') ? activeColor : 'black',
                        }}
                      />
                    </ListItemButton>

                    {mobileProjectsOpen &&
                      projectsSubMenu.map((item) => (
                        <ListItemButton
                          key={item.label}
                          component={Link}
                          to={item.path}
                          onClick={handleDrawerToggle}
                          sx={{
                            pr: 4,
                            borderRadius: 2,
                            backgroundColor: isActive(item.path) ? activeBg : 'transparent',
                            fontFamily: menuFont,
          fontWeight: 500,
                          
                          }}
                        >
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontFamily: menuFont,
          fontWeight: 500,
                          
                              fontSize: '17px',
                              color: isActive(item.path) ? activeColor : 'black',
                              textAlign: 'right',
                            }}
                          />
                        </ListItemButton>
                      ))}
                  </>
                ) : (
                  <ListItemButton
                    component={Link}
                    to={path}
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: isActive(path) ? activeBg : 'transparent',
                      fontFamily: menuFont,
          fontWeight: 500,
                          
                    }}
                  >
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontFamily: menuFont,
          fontWeight: 500,
                          
                        fontSize: '19px',
                        
                        color: isActive(path) ? activeColor : 'black',
                        textAlign: 'right',
                      }}
                    />
                  </ListItemButton>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
