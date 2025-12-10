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
  // IMPORTANT:
  // Ensure these `path` values match your router paths.
  // If your router uses english slugs (e.g. '/about'), put that in `path`
  // and keep `label` Arabic (e.g. 'من نحن').
  { label: 'الرئيسية', path: '/' },
  { label: 'أقسامنا', path: '/projects' }, // <-- adjust to '/أقسامنا' if your router uses Arabic path
  { label: 'من نحن', path: '/من نحن' },     // <-- adjust to '/about' if your router uses english slug
  { label: 'إتصل بنا', path: '/إتصل بنا' }, // <-- adjust to '/contact' if needed
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

  // robust normalize + isActive for Arabic paths (handles %20, multiple spaces, trailing slash, subpaths)
  const normalize = (p: string) => {
    try {
      let s = decodeURIComponent(p || '');
      // collapse multiple whitespace into single space, trim both ends
      s = s.replace(/\s+/g, ' ').trim();
      // remove trailing slashes (but keep root '/')
      while (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
      // ensure it starts with a slash
      if (!s.startsWith('/')) s = '/' + s;
      return s || '/';
    } catch (e) {
      // fallback if decodeURI fails
      let s = (p || '').replace(/\s+/g, ' ').trim();
      while (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
      if (!s.startsWith('/')) s = '/' + s;
      return s || '/';
    }
  };

  const currentPath = normalize(location.pathname);

  // If your parent menu label (أقسامنا) should be active for multiple paths, list them here.
  // Adjust as needed to match your router.
  const projectParentPaths = ['/projects', '/أقسامنا'];

  const isActive = (path: string) => {
    const np = normalize(path);

    // exact match (including root)
    if (currentPath === np) return true;

    // match subpath: currentPath starts with np + '/'
    if (np !== '/' && currentPath.indexOf(np + '/') === 0) return true;

    // special: allow parent mapping (in case label path differs)
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

  const marginTopValue = isDesktop || isMarginTop57px ? '' : '0px';

  const menuFont = 'Tajawal, sans-serif';

  // debug helper (uncomment to inspect paths)
  // console.log('currentPath=', currentPath, 'normalized pages=', pages.map(p => normalize(p.path)));

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
                  // Parent active when any of the project paths or their subpaths are active
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

                // Normal page button
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
    </AppBar>
  );
}
