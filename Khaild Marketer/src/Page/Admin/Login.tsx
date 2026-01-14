import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Paper,
  CircularProgress,
  Alert,
  Fade
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined, 
  PersonOutline, 
  ShieldOutlined,
  ArrowForward
} from "@mui/icons-material";

/**
 * LOGIN COMPONENT
 * Handles secure authentication with Google Authenticator (2FA) support.
 * Synchronizes user profile data (Name & Image) with LocalStorage for the Top Bar.
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // UI & Flow States
  const [step, setStep] = useState<"password" | "otp">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Data States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [adminId, setAdminId] = useState("");

  // Design Constants
  const menuFont = "Tajawal, sans-serif";
  const primaryTeal = "#004652";
  const accentGold = "#CC9D2F";
  const BASE_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  /**
   * STEP 1: INITIAL LOGIN
   * Sends Email/Password to Backend. 
   * If 2FA is required, switches UI. If not, redirects to Dashboard.
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
      
      if (response.data.requires2FA) {
        // Prepare for OTP Verification
        setAdminId(response.data.adminId);
        setStep("otp"); 
      } else {
        // ✅ SUCCESS: Save session data
        localStorage.setItem("token", response.data.token);
        // ✅ SAVE USER PROFILE (NAME & IMAGE) FOR TOP BAR
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
        
        // Force immediate redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "خطأ في تسجيل الدخول، تأكد من البيانات");
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 2: 2FA VERIFICATION
   * Sends 6-digit Google Authenticator code to Backend.
   */
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("يرجى إدخال الرمز المكون من 6 أرقام");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/verify-2fa`, { 
        adminId, 
        token: otp 
      });

      if (response.data.success) {
        // ✅ SUCCESS: Save session data
        localStorage.setItem("token", response.data.token || "logged_in_token");
        // ✅ SAVE USER PROFILE (NAME & IMAGE) FOR TOP BAR
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
        
        // Force immediate redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        bgcolor: "#E2E8F0",
        py: { xs: 4, md: 10 },
        display: "flex",
        alignItems: "center",
        direction: "rtl", 
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 7 },
              borderRadius: 10,
              textAlign: "right",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 25px 60px rgba(0, 70, 82, 0.18)",
              border: "1px solid rgba(255,255,255,0.3)"
            }}
          >
            {/* --- BRANDING ICON --- */}
            <Box
              sx={{
                width: 90,
                height: 90,
                bgcolor: primaryTeal,
                borderRadius: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 30px",
                boxShadow: "0 10px 25px rgba(0, 70, 82, 0.3)",
                transform: "rotate(-4deg)"
              }}
            >
              {step === "password" ? (
                <LockOutlined sx={{ color: accentGold, fontSize: 48 }} />
              ) : (
                <ShieldOutlined sx={{ color: "#10B981", fontSize: 48 }} />
              )}
            </Box>

            {/* --- TEXT TITLES --- */}
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, color: primaryTeal, mb: 1.5, fontFamily: menuFont, textAlign: 'center' }}
            >
              {step === "password" ? "تسجيل الدخول" : "تحقق الأمان (2FA)"}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{ color: "#64748B", mb: 5, fontFamily: menuFont, fontSize: "1.15rem", textAlign: 'center', lineHeight: 1.6 }}
            >
              {step === "password" 
                ? "مرحباً بك مجدداً، يرجى إدخال بياناتك للوصول إلى لوحة التحكم" 
                : "تم تفعيل حماية Authenticator. يرجى إدخال الرمز من تطبيقك"}
            </Typography>

            {/* --- ERROR ALERT --- */}
            {error && (
              <Alert 
                severity="error" 
                variant="filled"
                sx={{ mb: 4, fontFamily: menuFont, borderRadius: 3, fontWeight: 700 }}
              >
                {error}
              </Alert>
            )}

            {/* --- FORM SECTION --- */}
            <Box 
              component="form" 
              onSubmit={step === "password" ? handleLoginSubmit : handleOtpSubmit} 
              noValidate
            >
              {step === "password" ? (
                <>
                  <TextField
                    fullWidth
                    label="البريد الإلكتروني"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ sx: { fontFamily: menuFont, right: 30, left: "auto", transformOrigin: "right", fontWeight: 700 } }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: primaryTeal, ml: 1 }} /></InputAdornment>,
                    }}
                    sx={{ 
                      "& .MuiOutlinedInput-root": { borderRadius: 4, bgcolor: "#F8FAFC", height: 65 },
                      "& input": { textAlign: 'right', fontFamily: menuFont }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ sx: { fontFamily: menuFont, right: 30, left: "auto", transformOrigin: "right", fontWeight: 700 } }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: primaryTeal, ml: 1 }} /></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end" sx={{ p: 2 }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      "& .MuiOutlinedInput-root": { borderRadius: 4, bgcolor: "#F8FAFC", height: 65 },
                      "& input": { textAlign: 'right', fontFamily: menuFont }
                    }}
                  />
                  
                  <Box sx={{ textAlign: "left", mt: 1, mb: 4 }}>
                    <Typography
                      component={Link}
                      to="/forgot-password"
                      sx={{ color: accentGold, textDecoration: "none", fontSize: "1rem", fontWeight: 800, fontFamily: menuFont }}
                    >
                      نسيت كلمة المرور؟
                    </Typography>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  label="رمز التحقق"
                  placeholder="000 000"
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '2.5rem', letterSpacing: '12px', fontWeight: 900, color: primaryTeal } }}
                  InputLabelProps={{ sx: { fontFamily: menuFont, right: 30, left: "auto", transformOrigin: "right", fontWeight: 700 } }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5, bgcolor: "#F8FAFC", py: 2 }, mb: 5 }}
                />
              )}

              {/* --- ACTION BUTTON --- */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 2.2,
                  borderRadius: 5,
                  bgcolor: primaryTeal,
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  fontFamily: menuFont,
                  boxShadow: "0 12px 30px rgba(0, 70, 82, 0.25)",
                  transition: "0.3s",
                  "&:hover": { bgcolor: "#065f6e", transform: "translateY(-2px)" },
                }}
              >
                {loading ? (
                  <CircularProgress size={28} sx={{ color: "#fff" }} />
                ) : (
                  step === "password" ? "دخول آمن للنظام" : "تأكيد والذهاب للوحة التحكم"
                )}
              </Button>

              {/* --- BACK BUTTON (For OTP Step) --- */}
              {step === "otp" && (
                <Button 
                  fullWidth 
                  onClick={() => setStep("password")}
                  startIcon={<ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />}
                  sx={{ mt: 3, color: "#64748B", fontFamily: menuFont, fontWeight: 800, fontSize: '1rem' }}
                >
                  العودة لتعديل بيانات الدخول
                </Button>
              )}
            </Box>
          </Paper>
        </Fade>

        {/* --- FOOTER --- */}
        <Typography sx={{ mt: 5, textAlign: "center", color: "#64748B", fontSize: "1rem", fontFamily: menuFont, fontWeight: 600 }}>
          ديجي ليزر العقارية © {new Date().getFullYear()} | نظام محمي ومشفر
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;