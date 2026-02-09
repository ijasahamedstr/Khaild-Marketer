import * as React from "react";
import { Link, useLocation } from "react-router-dom";
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
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginIcon from "@mui/icons-material/Login";

import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/* -------------------- DATA -------------------- */
const pages = [
  { label: "الرئيسية", path: "/" },
  { label: "أقسامنا", path: "/projects" },
  { label: "من نحن", path: "/من نحن" },
  { label: "إتصل بنا", path: "/إتصل بنا" },
];

const projectsSubMenu = [
  { label: "بيع العقار", path: "/services/بيع العقار" },
  { label: "شراء العقار", path: "/services/شراء العقار" },
  { label: "إيجار العقار", path: "/services/إيجار العقار" },
  { label: "تشطيب العقار", path: "/services/تشطيب العقار" },
  { label: "تسليم واستلام العقار", path: "/services/تسليم واستلام العقار" },
  { label: "النظام يجيب", path: "/services/النظام يجيب" },
  { label: "محكم معتمد", path: "/services/محكم معتمد" },
  { label: "خدمات التوثيق", path: "/services/خدمات التوثيق" },
  { label: "خدمات التصوير العقاري", path: "/services/خدمات التصوير العقاري" },
  { label: "التقييم العقاري", path: "/services/التقييم العقاري" },
  { label: "تملّك الأجانب للعقارات", path: "/services/تملّك الأجانب للعقارات" },
  { label: "الوقف العقاري", path: "/services/الوقف العقاري" },
  { label: "القسم النسائي", path: "/services/القسم النسائي" },
  { label: "قسم التمويل العقاري", path: "/services/قسم التمويل العقاري" },
];

const socialLinks = [
  { icon: <FaXTwitter size={22} />, link: "https://x.com/digilasersa" },
  { icon: <FaInstagram size={25} />, link: "https://www.instagram.com/digilasersa" },
  { icon: <FaLinkedin size={25} />, link: "https://www.linkedin.com/company/digilasersa" },
  { icon: <FaYoutube size={25} />, link: "https://youtube.com/@digilaserSa" },
  { icon: <FaSnapchat size={25} />, link: "https://www.snapchat.com/add/digilasersa" },
  { icon: <FaTiktok size={25} />, link: "https://www.tiktok.com/@digilasersa" },
  { icon: <FaWhatsapp size={25} />, link: "http://wa.me/966571978888" },
];

/* -------------------- COMPONENT -------------------- */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [projectsMenuAnchor, setProjectsMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  React.useEffect(() => {
    setDrawerOpen(false);
    setProjectsMenuAnchor(null);
  }, [location]);

  const activeColor = "#CC9D2F";
  const activeBg = "rgba(204,157,47,0.15)";
  const menuFont = "Tajawal, sans-serif";

  const normalize = (p: string) => {
    try {
      let s = decodeURIComponent(p || "");
      s = s.replace(/\s+/g, " ").trim();
      while (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
      if (!s.startsWith("/")) s = "/" + s;
      return s || "/";
    } catch {
      return "/";
    }
  };

  const currentPath = normalize(location.pathname);
  const projectParentPaths = ["/projects", "/أقسامنا"];
  const isActive = (path: string) => {
    const np = normalize(path);
    return currentPath === np || (np !== "/" && currentPath.startsWith(np + "/"));
  };
  const isProjectParentActive = () =>
    projectParentPaths.some((pp) => {
      const npp = normalize(pp);
      return currentPath === npp || currentPath.startsWith(npp + "/");
    });

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <AppBar
        position="fixed"
        dir="rtl"
        elevation={6}
        sx={{
          backgroundColor: "#023B4E",
          fontFamily: menuFont,
          zIndex: 1201,
        }}
      >
        <Container maxWidth={false} sx={{ px: 0 }}>
          <Toolbar
            disableGutters
            sx={{
              px: 3,
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* RIGHT SIDE: LOGO + DESKTOP MENU */}
            {/* ------------------------------------------------------------- */}
            {/* CHANGED: Increased 'gap' from 6 to 15 (Change this number to adjust space) */}
            {/* ------------------------------------------------------------- */}
            <Box sx={{ display: "flex", alignItems: "center", gap: isDesktop ? 15 : 2 }}>
              {/* LOGO */}
              <Box
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://i.ibb.co/XR3RFDD/logo-DAR.webp"
                  alt="Logo"
                  sx={{ maxHeight: 100 }}
                />
              </Box>

              {/* DESKTOP MENU */}
              {isDesktop && (
                <Box sx={{ display: "flex", gap: 3 }}>
                  {pages.map(({ label, path }) =>
                    label === "أقسامنا" ? (
                      <React.Fragment key={label}>
                        <Button
                          onClick={(e) => setProjectsMenuAnchor(e.currentTarget)}
                          sx={{
                            fontSize: "20px",
                            fontFamily: menuFont,
                            color: isProjectParentActive() ? activeColor : "white",
                          }}
                        >
                          {label}
                          <KeyboardArrowDownIcon />
                        </Button>
                        <Menu
                          anchorEl={projectsMenuAnchor}
                          open={Boolean(projectsMenuAnchor)}
                          onClose={() => setProjectsMenuAnchor(null)}
                          MenuListProps={{ sx: { direction: "rtl" } }}
                        >
                          {projectsSubMenu.map((item) => (
                            <MenuItem
                              key={item.label}
                              component={Link}
                              to={item.path}
                              onClick={() => setProjectsMenuAnchor(null)}
                              sx={{
                                fontFamily: menuFont,
                                fontSize: "18px",
                                backgroundColor: isActive(item.path) ? activeBg : "transparent",
                                color: isActive(item.path) ? activeColor : "black",
                              }}
                            >
                              {item.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </React.Fragment>
                    ) : (
                      <Button
                        key={label}
                        component={Link}
                        to={path}
                        sx={{
                          fontSize: "20px",
                          fontFamily: menuFont,
                          color: isActive(path) ? activeColor : "white",
                        }}
                      >
                        {label}
                      </Button>
                    )
                  )}
                </Box>
              )}
            </Box>

            {/* LEFT SIDE: LOGIN BUTTON + MOBILE ICON */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={
                  <LoginIcon
                    sx={{
                      transform: "rotate(180deg)",
                      ml: 1.5, // Adds space between icon and text in RTL
                    }}
                  />
                }
                sx={{
                  color: "white",
                  borderColor: activeColor,
                  fontFamily: menuFont,
                  borderRadius: "25px",
                  fontSize: isDesktop ? "18px" : "14px",
                  px: isDesktop ? 4 : 2,
                  display: "flex",
                  alignItems: "center",
                  "& .MuiButton-startIcon": {
                    marginRight: "0px",
                    marginLeft: "8px",
                  },
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: activeBg,
                  },
                }}
              >
                دخول
              </Button>

              {!isDesktop && (
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: "#fff" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* OFFSET */}
      <Toolbar sx={{ height: 90 }} />

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: 340,
            direction: "rtl",
            fontFamily: menuFont,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {pages.map(({ label, path }) => (
              <ListItemButton
                key={label}
                component={Link}
                to={path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontFamily: menuFont,
                    fontSize: "19px",
                    textAlign: "right",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ================= SOCIAL SIDEBAR ================= */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1,
          zIndex: 1200,
          pl: 2,
        }}
      >
        {socialLinks.map(({ icon, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ direction: "ltr" }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.2)" },
              }}
            >
              {icon}
            </Box>
          </a>
        ))}
      </Box>
    </>
  );
}