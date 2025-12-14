// src/Page/Service/Service04.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { keyframes } from "@mui/system";

type Props = {
  onSubmit?: (selectedItems: {
    fifth?: string[];
    fifthText?: string[]; // array for multiple lines
    seventhRows?: string[]; // [row1Value, row2LabelText, ...]
  }) => void;
};

// Fifth group: two lines/items
const CHECKBOX_ITEMS_FIFTH = ["الاسم", "رقم الجوال"];

// Seventh section rows definitions (labels)
const SEVENTH_ROWS = [
  { label: "الرجاء التواصل على هذا الرقم", hasInput: true },
  { label: "أو اترك تفاصيل وسنعاود الاتصال بك لاحقا", hasInput: false },
];

const TAJAWAL = "'Tajawal', sans-serif";

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.995); }
  60% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";
const COLOR_SECONDARY = "#06caa6"; // Teal/Green-Cyan (used for outlines/highlights)


// *** START: SQUARE STYLE CHECKBOX IMPLEMENTATION ***
const ToggleIcon = ({ checked }: { checked?: boolean }) => {
  const SIZE = 24; // Size of the square checkbox

  return (
    <Box
      sx={{
        width: SIZE,
        height: SIZE,
        // *** STYLE CHANGE 1: Use 6px border radius for square/rounded corner look ***
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        transition: "all 260ms cubic-bezier(.2,.9,.2,1)",

        // *** STYLE CHANGE 2: Checked state is a solid gradient background ***
        background: checked ? GRADIENT : "#fff", 

        // *** STYLE CHANGE 3: Adjusted border/shadow for checked and unchecked states ***
        border: checked ? `1px solid ${COLOR_SECONDARY}` : `1px solid ${COLOR_SECONDARY}`, // Teal/Cyan outline when unchecked
        boxShadow: checked ? `0 4px 12px rgba(6, 249, 243, 0.3)` : "none", // Softer cyan shadow when checked
      }}
    >
      {checked ? (
        // Checkmark Icon - using white for visibility on the dark gradient
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* White checkmark for contrast on the dark Blue/Cyan background */}
          <path d="M12.6 1.1L5.6 8.1 1.4 3.9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : null}
    </Box>
  );
};
// *** END: SQUARE STYLE CHECKBOX IMPLEMENTATION ***


// small scroll delay so layout can stabilise before scroll
const SCROLL_DELAY_MS = 120;

const Service04: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to top/ref on mount
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, SCROLL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const [selectedFifth, setSelectedFifth] = React.useState<Record<number, boolean>>({});
  const [fifthText, setFifthText] = React.useState<Record<number, string>>({});
  const [seventhText, setSeventhText] = React.useState<Record<number, string>>({});

  const toggleFifth = (i: number) => setSelectedFifth((s) => ({ ...s, [i]: !s[i] }));
  const handleFifthTextChange = (i: number, val: string) => setFifthText((s) => ({ ...s, [i]: val }));
  const handleSeventhTextChange = (i: number, val: string) => setSeventhText((s) => ({ ...s, [i]: val }));

  const handleSubmit = () => {
    const chosenFifth = CHECKBOX_ITEMS_FIFTH.filter((_, i) => !!selectedFifth[i]);
    const fifthTextArr = CHECKBOX_ITEMS_FIFTH.map((_, i) => (fifthText[i] ?? "").trim());

    const seventhRowsArr = SEVENTH_ROWS.map((r, i) => (r.hasInput ? (seventhText[i] ?? "").trim() : r.label));

    if (onSubmit) {
      onSubmit({
        fifth: chosenFifth,
        fifthText: fifthTextArr,
        seventhRows: seventhRowsArr,
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 4, md: 8 },
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
      }}
    >
      <div ref={topRef} />

      <Box sx={{ mb: 4 }}>
        {/* Seventh Group */}
        <Box sx={{ mt: 5, mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: '#023B4E',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              تشطيب العقار
            </Typography>
          </Box>

          <Box
            sx={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)",
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              boxShadow: "0 18px 50px rgba(7,22,23,0.06)",
              border: "1px solid rgba(3,59,66,0.04)",
            }}
          >
            <Box sx={{ display: "grid", gap: 2, maxWidth: 1100, mx: "auto" }}>
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
                  <Typography sx={{ fontWeight: 700, minWidth: { sm: "220px" }, fontFamily: TAJAWAL }}>
                    {r.label}
                  </Typography>

                  {r.hasInput ? (
                    <TextField
                      value={seventhText[i] ?? ""}
                      onChange={(e) => handleSeventhTextChange(i, e.target.value)}
                      placeholder="أدخل قيمة..."
                      fullWidth
                      inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL } }}
                      sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
                    />
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Fifth Group */}
        <Box sx={{ mt: 0 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}></Box>

          <Box
            sx={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)",
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              boxShadow: "0 18px 50px rgba(7,22,23,0.06)",
              border: "1px solid rgba(3,59,66,0.04)",
            }}
          >
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gap: 2 }}>
                  {CHECKBOX_ITEMS_FIFTH.map((label, i) => {
                    const checked = !!selectedFifth[i];
                    const delay = `${i * 80}ms`;
                    return (
                      <Box key={`fifth-row-${i}`} sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", gap: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={() => toggleFifth(i)}
                              inputProps={{ "aria-label": label }}
                              disableRipple
                              icon={<ToggleIcon checked={false} />}
                              checkedIcon={<ToggleIcon checked={true} />}
                              // Adjusted padding/margin for the square style
                              sx={{ p: 0, mr: 1.4, "& .MuiSvgIcon-root": { display: "none" } }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: { xs: "1rem", md: "1.15rem" }, fontWeight: 700, fontFamily: TAJAWAL }}>
                              {label}
                            </Typography>
                          }
                          sx={{
                            m: 0,
                            p: 1.2,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            // Styling adjusted for Blue/Cyan theme with border/background
                            border: checked ? `1px solid ${COLOR_SECONDARY}` : "1px solid #eef3f3",
                            backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                            transition: "all 220ms ease",
                            animation: `${fadeUp} 480ms ease both`,
                            animationDelay: delay,
                            "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                            minWidth: { sm: "260px" },
                          }}
                        />

                        <TextField
                          value={fifthText[i] ?? ""}
                          onChange={(e) => handleFifthTextChange(i, e.target.value)}
                          placeholder="أدخل ملاحظة أو تفاصيل..."
                          fullWidth
                          inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL } }}
                          sx={{
                            "& .MuiInputBase-root": { borderRadius: 2 },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </FormGroup>

              {/* Submit button */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    px: 4,
                    py: 1.25,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontFamily: TAJAWAL ,
                    textTransform: "none",
                    // Use the new gradient for the button background
                    background: GRADIENT, 
                    boxShadow: "0 8px 28px rgba(2,59,78,0.08)",
                  }}
                >
                  إرسال
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Service04;