// src/Page/Service/Service04.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  styled,
  FormControl,
} from "@mui/material";
import { keyframes } from "@mui/system";

// ----------------------------------------------------
// *** REQUIRED CONSTANTS AND TYPES FOR COMPILATION ***
// ----------------------------------------------------

type FormData = {
  name: string;
  mobile: string;
  message: string;
};

const FORM_BACKGROUND_COLOR = "#fff"; // White background for the main form
const COLOR_PRIMARY_CYAN = "#E7E5E4"; // Used for borders
const GRADIENT1 = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)"; // Purple to Pink

// Define custom styling for the form fields
// *** TEXT BOX EFFECT REMOVED: No transition, no hover background change, no focus box shadow/border change ***
const DarkTextField = styled(TextField)(({}) => ({
  "& .MuiFilledInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Input field background (fixed)
    color: "#000", // Black text color inside the input
    border: `1px solid ${COLOR_PRIMARY_CYAN}`,
    transition: "none", // REMOVED TRANSITION EFFECT
    
    // EFFECT REMOVED: Remove hover styles
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Keep background fixed on hover
    },
    
    // EFFECT REMOVED: Remove focus styles
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Keep background fixed on focus
      borderColor: COLOR_PRIMARY_CYAN, // Keep border fixed on focus
      boxShadow: `none`, // Remove focus shadow
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 12px",
    color: "#000",
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.5)",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-filled": {
    color: "#000",
  },
}));

// // Define the label component for the form fields
// const FieldLabel: React.FC<{ label: string }> = ({ label }) => (
//   <Typography
//     sx={{
//       fontWeight: 700,
//       minWidth: { xs: "50px", sm: "70px" },
//       fontFamily: TAJAWAL,
//       color: "#000", // Label color set to black
//       textAlign: "right",
//       pt: 1.8,
//       flexShrink: 0,
//     }}
//   >
//     {label}
//   </Typography>
// );

// ----------------------------------------------------
// *** ORIGINAL COMPONENT CODE STARTS HERE ***
// ----------------------------------------------------

type Props = {
  onSubmit?: (selectedItems: {
    seventhRows?: string[]; // [row1Value, row2LabelText, ...]
  }) => void;
};

// Seventh section rows definitions (labels)
const SEVENTH_ROWS = [
  { label: " التواصل مباشرةعلى هذا الرقم", hasInput: true },
  { label: "", hasInput: false },
];

const TAJAWAL = "'Tajawal', sans-serif";

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.995); }
  60% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;


const Service04: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to top/ref on mount
  React.useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  
  // State for the Seventh Group (تشطيب العقار) inputs
  const [seventhText, setSeventhText] = React.useState<Record<number, string>>({});

  // State for the main contact form fields
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    mobile: '',
    message: '',
  });

  // Handlers for state changes
  const handleSeventhTextChange = (i: number, val: string) => setSeventhText((s) => ({ ...s, [i]: val }));
  
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const seventhRowsArr = SEVENTH_ROWS.map((r, i) => (r.hasInput ? (seventhText[i] ?? "").trim() : r.label));
    
    console.log("Contact Form Data:", formData);

    if (onSubmit) {
      onSubmit({
        seventhRows: seventhRowsArr,
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 4, md: 8 },
        // Ensure the container has bottom margin for overall page spacing
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
        backgroundColor: FORM_BACKGROUND_COLOR, // White background
        borderRadius: '16px',
        py: { xs: 4, md: 8 },
      }}
    >
      <div ref={topRef} />

           <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "2.4rem" },
                  color: '#023B4E',
                  fontFamily: TAJAWAL,
                }}
              >
                تشطيب العقار
              </Typography>
            </Box>

      <Box sx={{ mb: 0 }}>
        
        {/* Seventh Group - تشطيب العقار Section */}

       <Box
        sx={{
          mt: 5,
          mb: 4,
          p: 3,
          backgroundColor: "rgba(2, 59, 78, 0.05)",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 3,
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          {SEVENTH_ROWS.map((r, i) => (
            <Box
              key={`seventh-row-${i}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {/* ================= LABEL (50%) ================= */}
              <Box
                sx={{
                  flexBasis: { sm: "50%" },
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "24px", sm: "32px" }, // ⬅️ VERY BIG LABEL
                    fontFamily: TAJAWAL,
                    color: "#000",
                    lineHeight: 1.3,
                  }}
                >
                  {r.label}
                </Typography>
              </Box>

              {/* ================= INPUT (50%) ================= */}
              {r.hasInput && (
                <Box
                  sx={{
                    flexBasis: { sm: "50%" },
                    width: "100%",
                  }}
                >
                  <TextField
                    value={seventhText[i] ?? ""}
                    onChange={(e) =>
                      handleSeventhTextChange(i, e.target.value)
                    }
                    placeholder="أدخل قيمة..."
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    inputProps={{
                      dir: "rtl",
                      style: {
                        fontFamily: TAJAWAL,
                        color: "#000",
                        fontSize: "14px",
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        transition: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          boxShadow: "none",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "12px 14px",
                      },
                      "& .MuiFilledInput-underline:before": {
                        borderBottom: "none",
                      },
                      "& .MuiFilledInput-underline:after": {
                        borderBottom: "none",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>




      

        {/* Fifth Group (Main Contact Form) */}
        <Box sx={{ mt: 6, p: 4, borderRadius: '16px', animation: `${fadeUp} 1000ms 300ms backwards` }}>
          <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
            
            {/* Form Title Section */}
            <Box sx={{ mb: 4, textAlign: "right" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "2.2rem" },
                  color: '#023B4E',
                  fontFamily: TAJAWAL,
                  mb: 1,
                }}
              >
                أو الرجاء ترك الإسم ورقم الجوال وسوف نعاود الإتصال بك
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.2rem", md: "1.6rem" },
                  color: '#000',
                  fontFamily: TAJAWAL,
                }}
              >
              </Typography>
            </Box>

            {/* Form Fields Section */}
            <Box sx={{ display: "grid", gap: 3, width: "100%", mx: "auto" }}>
              
              {/* Name Field (الاسم) */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "top" }}>
                <Typography
                  sx={{
                    fontFamily: TAJAWAL,
                    fontSize: "28px",  // حجم طبيعي
                    fontWeight: 600,   // متوسط الوزن
                    color: "#000",
                    lineHeight: 1.5,
                  }}
                >
                  الاسم
                </Typography>

                <Box sx={{ width: "40%" }}>
                <DarkTextField
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="أدخل الاسم"
                  fullWidth
                  variant="filled"
                  hiddenLabel
                  inputProps={{
                    dir: "rtl",
                    style: { fontFamily: TAJAWAL, color: "#000" },
                  }}
                />
              </Box>
              </Box>

              {/* Mobile Field (جوال) */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "top" }}>
                <Typography
                  sx={{
                    fontFamily: TAJAWAL,
                    fontSize: "28px",  // حجم طبيعي
                    fontWeight: 600,   // متوسط الوزن
                    color: "#000",
                    lineHeight: 1.5,
                  }}
                >
                  جوال
                </Typography>
                <Box sx={{ width: "40%" }}>
                <DarkTextField
                  value={formData.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  placeholder="أدخل رقم الجوال"
                  fullWidth
                  variant="filled"
                  hiddenLabel
                  inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL, color: '#000' } }}
                />
              </Box>
              </Box>

            </Box>

            {/* Submit button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontFamily: TAJAWAL,
                  fontSize: '1.2rem',
                  textTransform: "none",
                  background: GRADIENT1, 
                  color: "#000",
                  boxShadow: "0 8px 28px rgba(6, 249, 243, 0.4)",
                  // *** FIXED: Removed hover effect to align with "No eFFECT" request ***
                  '&:hover': {
                    background: GRADIENT1, // Keep background fixed on hover
                    boxShadow: "0 8px 28px rgba(6, 249, 243, 0.4)", // Keep shadow fixed on hover
                  }
                }}
              >
                إرسال
              </Button>
            </Box>
          
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default Service04;