import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Paper,
  Divider
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, PersonOutline } from "@mui/icons-material";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Secure Login Attempt:", { email, password });
  };

  const menuFont = "Tajawal, sans-serif";

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        bgcolor: "#E2E8F0",
        py: { xs: 6, md: 10 },
        display: "flex",
        alignItems: "center",
        direction: "rtl", 
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 5,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 50px rgba(0, 70, 82, 0.15)",
          }}
        >
          {/* Header Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#004652",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 20px rgba(0, 70, 82, 0.3)",
            }}
          >
            <LockOutlined sx={{ color: "#CC9D2F", fontSize: 40 }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#004652",
              mb: 1,
              fontFamily: menuFont,
            }}
          >
            تسجيل الدخول
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#64748B", mb: 4, fontFamily: menuFont, fontSize: "1.1rem" }}
          >
            الرجاء إدخال بياناتك للوصول الآمن
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <TextField
              fullWidth
              label="المستخدم أو البريد الإلكتروني"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                sx: {
                  fontFamily: menuFont,
                  fontSize: "1.2rem", // Made Label Big
                  right: 28, 
                  left: "auto",
                  transformOrigin: "right",
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    transform: "translate(14px, -12px) scale(0.75)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: "#004652", ml: 1, fontSize: "1.5rem" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  fontSize: "1.1rem", // Made Typed Text Big
                  "& fieldset": { borderColor: "#CBD5E1", textAlign: "right" },
                  "&:hover fieldset": { borderColor: "#004652" },
                  "&.Mui-focused fieldset": { borderColor: "#CC9D2F" },
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                sx: {
                  fontFamily: menuFont,
                  fontSize: "1.2rem", // Made Label Big
                  right: 28,
                  left: "auto",
                  transformOrigin: "right",
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    transform: "translate(14px, -12px) scale(0.75)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#004652", ml: 1, fontSize: "1.5rem" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  fontSize: "1.1rem", // Made Typed Text Big
                  "& fieldset": { borderColor: "#CBD5E1", textAlign: "right" },
                  "&:hover fieldset": { borderColor: "#004652" },
                  "&.Mui-focused fieldset": { borderColor: "#CC9D2F" },
                },
              }}
            />

            <Box sx={{ textAlign: "left", mt: 1, mb: 3 }}>
              <Typography
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "#CC9D2F",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontFamily: menuFont,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                نسيت كلمة المرور؟
              </Typography>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.8,
                borderRadius: 3,
                bgcolor: "#004652",
                fontSize: "1.2rem",
                fontWeight: 700,
                fontFamily: menuFont,
                boxShadow: "0 10px 20px rgba(0, 70, 82, 0.2)",
                "&:hover": {
                  bgcolor: "#065f6e",
                  transform: "translateY(-2px)",
                },
                transition: "0.3s",
              }}
            >
              دخول آمن
            </Button>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography sx={{ px: 2, color: "#94A3B8", fontSize: "0.9rem", fontFamily: menuFont }}>
              أو
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
             <Typography sx={{ color: "#64748B", fontFamily: menuFont, fontSize: "1.1rem" }}>
                ليس لديك حساب؟
             </Typography>
             <Typography
              component={Link}
              to="/register"
              sx={{
                color: "#CC9D2F",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: menuFont,
                fontSize: "1.1rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              إنشاء حساب جديد
            </Typography>
          </Box>
        </Paper>

        <Typography
          sx={{
            mt: 4,
            textAlign: "center",
            color: "#64748B",
            fontSize: "0.9rem",
            fontFamily: menuFont,
          }}
        >
          جميع الحقوق محفوظة © {new Date().getFullYear()} ديجي ليزر العقارية | نظام مشفر
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;