// Navbar.tsx
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

const pages = [
  { label: 'الرئيسية', path: '/' },
  { label: 'أقسامنا', path: '/projects' },
  { label: 'من نحن', path: '/من نحن' },
  { label: 'إتصل بنا', path: '/إتصل بنا' },
];

const projectsSubMenu = [
  { label: 'أقسامنا', path: '/projects' },
  { label: 'المشاريع الجارية', path: '/projects/ongoing' },
  { label: 'المشاريع المكتملة', path: '/projects/completed' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [projectsMenuAnchor, setProjectsMenuAnchor] = React.useState<null | HTMLElement>(null);
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

  const normalize = (p: string) => {
    try {
      let s = decodeURIComponent(p || '');
      s = s.replace(/\s+/g, ' ').trim();
      while (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
      if (!s.startsWith('/')) s = '/' + s;
      return s || '/';
    } catch (e) {
      let s = (p || '').replace(/\s+/g, ' ').trim();
      while (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
      if (!s.startsWith('/')) s = '/' + s;
      return s || '/';
    }
  };

  const currentPath = normalize(location.pathname);

  const projectParentPaths = ['/projects', '/أقسامنا'];

  const isActive = (path: string) => {
    const np = normalize(path);
    if (currentPath === np) return true;
    if (np !== '/' && currentPath.indexOf(np + '/') === 0) return true;
    if (projectParentPaths.includes(np)) {
      return projectParentPaths.some(pp => {
        const npp = normalize(pp);
        return currentPath === npp || (npp !== '/' && currentPath.indexOf(npp + '/') === 0);
      });
    }
    return false;
  };

  const isProjectParentActive = () =>
    projectParentPaths.some(pp => {
      const npp = normalize(pp);
      return currentPath === npp || (npp !== '/' && currentPath.indexOf(npp + '/') === 0);
    });

  const menuFont = 'Tajawal, sans-serif';

  return (
    <>
      <AppBar
        position="fixed"
        dir="rtl"
        elevation={6}
        sx={(theme) => ({
          direction: 'rtl',
          backgroundColor: '#023B4E',
          color: '#A69196',
          fontFamily: menuFont,
          fontWeight: 500,
          width: '100%',
          zIndex: theme.zIndex.drawer + 2, // ensure above drawer & content
        })}
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
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
                {pages.map(({ label, path }) => {
                  if (label === 'أقسامنا') {
                    const dropdownActive = isProjectParentActive();

                    return (
                      <React.Fragment key={label}>
                        <Button
                          onClick={(e) => setProjectsMenuAnchor(e.currentTarget)}
                          aria-haspopup="true"
                          aria-expanded={Boolean(projectsMenuAnchor)}
                          aria-controls={projectsMenuAnchor ? 'projects-menu' : undefined}
                          aria-current={dropdownActive ? 'page' : undefined}
                          sx={{
                            backgroundColor: dropdownActive ? activeBg : 'transparent',
                            color: dropdownActive ? activeColor : 'white',
                            fontFamily: menuFont,
                            fontWeight: 500,
                            fontSize: '20px',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            borderRadius: 2,
                            px: 1.5,
                            '&:hover': {
                              backgroundColor: dropdownActive ? activeBg : 'rgba(255,255,255,0.08)',
                            },
                          }}
                        >
                          {label}
                          <KeyboardArrowDownIcon
                            sx={{
                              fontSize: 24,
                              transition: '0.3s',
                              color: dropdownActive ? activeColor : 'white',
                              transform: projectsMenuAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          />
                        </Button>

                        <Menu
                          id="projects-menu"
                          anchorEl={projectsMenuAnchor}
                          open={Boolean(projectsMenuAnchor)}
                          onClose={() => setProjectsMenuAnchor(null)}
                          MenuListProps={{ sx: { direction: 'rtl' } }}
                        >
                          {projectsSubMenu.map((item) => (
                            <MenuItem
                              key={item.label}
                              component={Link}
                              to={item.path}
                              onClick={() => setProjectsMenuAnchor(null)}
                              sx={{
                                fontFamily: menuFont,
                                fontWeight: 500,
                                fontSize: '18px',
                                backgroundColor: isActive(item.path) ? activeBg : 'transparent',
                                color: isActive(item.path) ? activeColor : 'black',
                                justifyContent: 'flex-end',
                                borderRadius: 1,
                                '&:hover': { backgroundColor: isActive(item.path) ? activeBg : 'rgba(0,0,0,0.04)' },
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
                      aria-current={isActive(path) ? 'page' : undefined}
                      sx={{
                        backgroundColor: isActive(path) ? activeBg : 'transparent',
                        color: isActive(path) ? activeColor : 'white',
                        fontFamily: menuFont,
                        fontWeight: 500,
                        fontSize: '20px',
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 1.5,
                        '&:hover': {
                          backgroundColor: isActive(path) ? activeBg : 'rgba(255,255,255,0.08)',
                        },
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Box>
            ) : (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#A69196' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer so page content is not covered by the fixed AppBar */}
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 340,
            direction: 'rtl',
            borderRadius: '16px 0 0 16px',
            fontFamily: menuFont,
            fontWeight: 500,
            zIndex: (theme) => theme.zIndex.appBar + 1,
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="img"
              src="https://i.ibb.co/yn0gbKdZ/Gemini-Generated-Image-pua0mbpua0mbpua0-removebg-preview.png"
              alt="Logo"
              sx={{ maxHeight: 70 }}
            />
          </Box>

          <List sx={{ textAlign: 'right' }}>
            {pages.map(({ label, path }) => (
              <React.Fragment key={label}>
                {label === 'أقسامنا' ? (
                  <>
                    <ListItemButton
                      onClick={() => setMobileProjectsOpen((prev) => !prev)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: isProjectParentActive() ? activeBg : 'transparent',
                      }}
                    >
                      <ListItemText
                        primary={label}
                        primaryTypographyProps={{
                          fontFamily: menuFont,
                          fontWeight: 500,
                          fontSize: '19px',
                          color: isProjectParentActive() ? activeColor : 'black',
                          textAlign: 'right',
                        }}
                      />
                      <KeyboardArrowDownIcon
                        sx={{
                          transform: mobileProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: isProjectParentActive() ? activeColor : 'black',
                        }}
                      />
                    </ListItemButton>

                    {mobileProjectsOpen &&
                      projectsSubMenu.map((item) => (
                        <ListItemButton
                          key={item.label}
                          component={Link}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)}
                          sx={{
                            pr: 4,
                            borderRadius: 2,
                            backgroundColor: isActive(item.path) ? activeBg : 'transparent',
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
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: isActive(path) ? activeBg : 'transparent',
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
    </>
  );
}
