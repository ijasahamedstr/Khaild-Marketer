// src/Page/Service/Service02.tsx
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
    first: string[];
    second: string[];
    third: string[];
    fifth?: string[];
    search?: string;
    fifthText?: string[]; // now an array for multiple lines
    sixthButtons?: string[]; // buttons pressed/toggled in sixth section
  }) => void;
};

const CHECKBOX_ITEMS_FIRST = ["جاهز", "على الخارطة"];

const CHECKBOX_ITEMS_SECOND = [
  "أرض",
  "فيلا",
  "دوبلكس",
  "شقة",
  "قصر",
  "روف",
  "مستودعات",
  "فيلا",
];

const CHECKBOX_ITEMS_THIRD = [
  "رقم المخطط",
  "بلوك",
  "رقم القطعة",
  "العنوان الوطني",
  "مساحة العقار",
  "اسم المطور العقاري",
  "عقار رقم",
];

// Fifth group: now two lines/items
const CHECKBOX_ITEMS_FIFTH = ["الحد", "السعر المقترح"];

// Sixth group: two full-width buttons (labels shown inside buttons)
const SIXTH_BUTTONS = ["صور للعقار", "رابط فيديو يوتيوب"];

const TAJAWAL = "'Tajawal', sans-serif";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0) }
`;

// Removed unused 'delay' parameter to fix TS6133 — use a plain keyframes
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.995); }
  60% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

// The gradient you requested — reused for active button background
const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";

// SCROLL delay (ms) — small delay helps if the page needs layout/rendering
const SCROLL_DELAY_MS = 120;

const ToggleIcon = ({ checked }: { checked?: boolean }) => {
  return (
    <Box
      sx={{
        width: 46,
        height: 28,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        p: "4px",
        boxSizing: "border-box",
        transition: "all 260ms cubic-bezier(.2,.9,.2,1)",
        background: checked ? GRADIENT : "#fff",
        border: checked ? "1px solid rgba(2,59,78,0.16)" : "1px solid #dfeef0",
        boxShadow: checked ? "0 10px 28px rgba(3,80,75,0.12)" : "0 6px 18px rgba(9,12,15,0.03)",
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: checked ? "#fff" : "#06caa6",
          transform: checked ? "translateX(18px)" : "translateX(0px)",
          transition: "transform 240ms cubic-bezier(.2,.9,.2,1), background 240ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked ? (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6 1.1L4.6 7.1 1.4 3.9" stroke="#023B4E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : null}
      </Box>
    </Box>
  );
};

const Service02: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  // On mount, scroll to the topRef (first/header) — small timeout lets layout finish
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

  const [selectedFirst, setSelectedFirst] = React.useState<Record<number, boolean>>({});
  const [selectedSecond, setSelectedSecond] = React.useState<Record<number, boolean>>({});
  const [selectedThird, setSelectedThird] = React.useState<Record<number, boolean>>({});
  const [selectedFifth, setSelectedFifth] = React.useState<Record<number, boolean>>({});
  const [sixthButtonsState, setSixthButtonsState] = React.useState<Record<number, boolean>>({});
  // fifthText -> store per-line text
  const [fifthText, setFifthText] = React.useState<Record<number, string>>({});

  const toggleFirst = (i: number) => setSelectedFirst((s) => ({ ...s, [i]: !s[i] }));
  const toggleSecond = (i: number) => setSelectedSecond((s) => ({ ...s, [i]: !s[i] }));
  const toggleThird = (i: number) => setSelectedThird((s) => ({ ...s, [i]: !s[i] }));
  const toggleFifth = (i: number) => setSelectedFifth((s) => ({ ...s, [i]: !s[i] }));

  const handleFifthTextChange = (i: number, val: string) => {
    setFifthText((s) => ({ ...s, [i]: val }));
  };

  // Toggle sixth button state (pressed / active)
  const toggleSixthButton = (i: number) => {
    setSixthButtonsState((s) => ({ ...s, [i]: !s[i] }));
  };

  const handleSubmit = () => {
    const chosenFirst = CHECKBOX_ITEMS_FIRST.filter((_, i) => !!selectedFirst[i]);
    const chosenSecond = CHECKBOX_ITEMS_SECOND.filter((_, i) => !!selectedSecond[i]);
    const chosenThird = CHECKBOX_ITEMS_THIRD.filter((_, i) => !!selectedThird[i]);
    const chosenFifth = CHECKBOX_ITEMS_FIFTH.filter((_, i) => !!selectedFifth[i]);

    // convert fifthText record to array keeping indices order
    const fifthTextArr = CHECKBOX_ITEMS_FIFTH.map((_, i) => (fifthText[i] ?? "").trim());

    // sixth: collect labels of buttons that are active/toggled
    const sixthButtonsArr = SIXTH_BUTTONS.filter((_, i) => !!sixthButtonsState[i]);

    if (onSubmit)
      onSubmit({
        first: chosenFirst,
        second: chosenSecond,
        third: chosenThird,
        fifth: chosenFifth,
        fifthText: fifthTextArr,
        sixthButtons: sixthButtonsArr,
      });
  };

  const gridCols = { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" };

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
      {/* Header (target for scroll on load) */}
      <Box ref={topRef} sx={{ textAlign: "center", mb: 3, animation: `${float} 6s ease-in-out infinite` }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            fontFamily: TAJAWAL,
          }}
        >
          البيع
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        {/* First Group */}
        <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
          <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
            <FormGroup>
              <Box sx={{ display: "grid", gridTemplateColumns: gridCols, gap: { xs: 1.25, md: 2 } }}>
                {CHECKBOX_ITEMS_FIRST.map((label, i) => {
                  const checked = !!selectedFirst[i];
                  return (
                    <FormControlLabel
                      key={`first-${label}-${i}`}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={() => toggleFirst(i)}
                          inputProps={{ "aria-label": label }}
                          disableRipple
                          icon={<ToggleIcon checked={false} />}
                          checkedIcon={<ToggleIcon checked={true} />}
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
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                        backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                        transition: "all 220ms ease",
                        animation: `${fadeUp} 480ms ease both`,
                        animationDelay: `${i * 80}ms`,
                        "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                      }}
                    />
                  );
                })}
              </Box>
            </FormGroup>
          </FormControl>
        </Box>

        {/* Second Group */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               نوع العقار
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gridTemplateColumns: gridCols, gap: { xs: 1.25, md: 2 } }}>
                  {CHECKBOX_ITEMS_SECOND.map((label, i) => {
                    const checked = !!selectedSecond[i];
                    return (
                      <FormControlLabel
                        key={`second-${label}-${i}`}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => toggleSecond(i)}
                            inputProps={{ "aria-label": label }}
                            disableRipple
                            icon={<ToggleIcon checked={false} />}
                            checkedIcon={<ToggleIcon checked={true} />}
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
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                          backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                          transition: "all 220ms ease",
                          animation: `${fadeUp} 480ms ease both`,
                          animationDelay: `${i * 80}ms`,
                          "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                        }}
                      />
                    );
                  })}
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Third Group */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               معلومات العقار
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gridTemplateColumns: gridCols, gap: { xs: 1.25, md: 2 } }}>
                  {CHECKBOX_ITEMS_THIRD.map((label, i) => {
                    const checked = !!selectedThird[i];
                    return (
                      <FormControlLabel
                        key={`third-${label}-${i}`}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => toggleThird(i)}
                            inputProps={{ "aria-label": label }}
                            disableRipple
                            icon={<ToggleIcon checked={false} />}
                            checkedIcon={<ToggleIcon checked={true} />}
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
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                          backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                          transition: "all 220ms ease",
                          animation: `${fadeUp} 480ms ease both`,
                          animationDelay: `${i * 80}ms`,
                          "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                        }}
                      />
                    );
                  })}
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Fifth Group (two lines: checkbox + label + textbox each) */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               المعلومات المالية
            </Typography>
          </Box>

          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gap: 2 }}>
                  {CHECKBOX_ITEMS_FIFTH.map((label, i) => {
                    const checked = !!selectedFifth[i];
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
                            border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                            backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                            transition: "all 220ms ease",
                            animation: `${fadeUp} 480ms ease both`,
                            animationDelay: `${i * 80}ms`,
                            "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                            minWidth: { sm: "260px" },
                          }}
                        />

                        <TextField
                          value={fifthText[i] ?? ""}
                          onChange={(e) => handleFifthTextChange(i, e.target.value)}
                          placeholder="أدخل ملاحظة أو تفاصيل..."
                          fullWidth
                          inputProps={{ dir: 'rtl', style: { fontFamily: TAJAWAL } }}
                          sx={{
                            '& .MuiInputBase-root': { borderRadius: 2 },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Sixth Group (two full-width buttons, with gradient background when active) */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
              صور توضيحية
            </Typography>
          </Box>

          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <Box sx={{ display: "grid", gap: 2, maxWidth: 1100, mx: "auto" }}>
              {SIXTH_BUTTONS.map((label, i) => {
                const active = !!sixthButtonsState[i];
                return (
                  <Button
                    key={`sixth-btn-${i}`}
                    fullWidth
                    variant={active ? "contained" : "outlined"}
                    onClick={() => toggleSixthButton(i)}
                    sx={{
                      py: 1.6,
                      fontWeight: 700,
                      fontFamily: TAJAWAL,
                      textTransform: "none",
                      ...(active
                        ? {
                            background: GRADIENT,
                            color: "#fff",
                            border: "none",
                            boxShadow: "0 8px 28px rgba(2,59,78,0.12)",
                            "&:hover": {
                              filter: "brightness(0.95)",
                              boxShadow: "0 10px 30px rgba(2,59,78,0.14)",
                            },
                          }
                        : {
                            background: "transparent",
                          }),
                    }}
                  >
                    {active ? `${label} — مفعّل` : label}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              px: 5,
              py: 1.8,
              fontSize: "1.2rem",
              fontWeight: 800,
              fontFamily: TAJAWAL,
              background: GRADIENT,
              color: "#fff",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(2,59,78,0.18)",
              "&:hover": { filter: "brightness(0.95)" },
            }}
          >
            إرسال البيانات
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Service02;
