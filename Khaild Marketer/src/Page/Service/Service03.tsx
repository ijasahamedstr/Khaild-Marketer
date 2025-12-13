// src/Page/Service/Service01.tsx
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
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { keyframes } from "@mui/system";

type Props = {
  onSubmit?: (selectedItems: {
    second: string[];
    third: string[];
    fourth: string[];
    fifth?: string[];
    search?: string;
  }) => void;
};

const CHECKBOX_ITEMS_SECOND = [
  "أرض",
  "فيلا",
  "دوبلكس",
  "شقة",
  "قصر",
  "تاون هاوس",
  "روف",
  "مستودعات",
];
const CHECKBOX_ITEMS_THIRD = ["اختر الحي"];
const CHECKBOX_ITEMS_FOURTH = ["السعر المقترح"];
const CHECKBOX_ITEMS_FIFTH = ["كاش", "تحويل بنكي", "مدعوم"];

const FOURTH_TEXT_LABEL_1 = "من";
const FOURTH_TEXT_LABEL_2 = "إلى";

const TAJAWAL = "'Tajawal', sans-serif";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0) }
`;

// Removed unused 'delay' parameter to fix TS6133
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.995); }
  60% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";

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

const Service03: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll to the topRef element when component mounts
    if (topRef.current) {
      // slight timeout can help if the page still lays out heavy content
      // but kept immediate — smooth scroll to the first section/header
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: scroll to window top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const [selectedSecond, setSelectedSecond] = React.useState<Record<number, boolean>>({});
  const [selectedThird, setSelectedThird] = React.useState<Record<number, boolean>>({});
  const [thirdTexts, setThirdTexts] = React.useState<Record<number, string>>({});
  const [selectedFourth, setSelectedFourth] = React.useState<Record<number, boolean>>({});
  const [fourthTexts, setFourthTexts] = React.useState<Record<number, string>>({});
  const [fourthTexts2, setFourthTexts2] = React.useState<Record<number, string>>({});
  const [selectedFifth, setSelectedFifth] = React.useState<Record<number, boolean>>({});
  const [sixthSearchQuery, setSixthSearchQuery] = React.useState<string>("");

  const toggleSecond = (i: number) => setSelectedSecond((s) => ({ ...s, [i]: !s[i] }));
  const toggleThird = (i: number) => setSelectedThird((s) => ({ ...s, [i]: !s[i] }));
  const toggleFourth = (i: number) => setSelectedFourth((s) => ({ ...s, [i]: !s[i] }));
  const toggleFifth = (i: number) => setSelectedFifth((s) => ({ ...s, [i]: !s[i] }));

  const handleThirdTextChange = (i: number, value: string) => setThirdTexts((s) => ({ ...s, [i]: value }));
  const handleFourthTextChange = (i: number, value: string) => setFourthTexts((s) => ({ ...s, [i]: value }));
  const handleFourthText2Change = (i: number, value: string) => setFourthTexts2((s) => ({ ...s, [i]: value }));

  const handleSubmit = () => {
    const chosenSecond = CHECKBOX_ITEMS_SECOND.filter((_, i) => !!selectedSecond[i]);

    const chosenThird = CHECKBOX_ITEMS_THIRD
      .map((label, i) => {
        if (!selectedThird[i]) return null;
        const txt = (thirdTexts[i] || "").trim();
        return txt ? `${label} — ${txt}` : label;
      })
      .filter(Boolean) as string[];

    const chosenFourthCheckboxes = CHECKBOX_ITEMS_FOURTH
      .map((label, i) => (selectedFourth[i] ? label : null))
      .filter(Boolean) as string[];

    const chosenFourthTexts1 = Object.entries(fourthTexts)
      .map(([, txt]) => {
        const trimmed = (txt || "").trim();
        if (!trimmed) return null;
        return `${FOURTH_TEXT_LABEL_1} — ${trimmed}`;
      })
      .filter(Boolean) as string[];

    const chosenFourthTexts2 = Object.entries(fourthTexts2)
      .map(([, txt]) => {
        const trimmed = (txt || "").trim();
        if (!trimmed) return null;
        return `${FOURTH_TEXT_LABEL_2} — ${trimmed}`;
      })
      .filter(Boolean) as string[];

    const chosenFourth = [...chosenFourthCheckboxes, ...chosenFourthTexts1, ...chosenFourthTexts2];

    const chosenFifth = CHECKBOX_ITEMS_FIFTH.filter((_, i) => !!selectedFifth[i]);

    if (onSubmit) onSubmit({second: chosenSecond, third: chosenThird, fourth: chosenFourth, fifth: chosenFifth, search: sixthSearchQuery });
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
        fontFamily: TAJAWAL, // set base font for container
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
          استئجار العقار
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        {/* First Group */}

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
               الحي المرغوب فيه الشراء
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr" }, gap: { xs: 1.25, md: 2 } }}>
                  {CHECKBOX_ITEMS_THIRD.map((label, i) => {
                    const checked = !!selectedThird[i];
                    return (
                      <Box
                        key={`third-row-${i}`}
                        sx={{
                          m: 0,
                          p: 1.2,
                          borderRadius: 3,
                          width: "100%",
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "stretch", sm: "center" },
                          justifyContent: "space-between",
                          border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                          backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                          transition: "all 220ms ease",
                          animation: `${fadeUp} 480ms ease both`,
                          animationDelay: `${i * 80}ms`,
                          gap: 1,
                        }}
                      >
                        <FormControlLabel
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
                          label={<Typography sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 700, fontFamily: TAJAWAL }}>{label}</Typography>}
                          sx={{ m: 0, p: 0, flex: "0 0 auto", "& .MuiFormControlLabel-label": { px: { xs: 1, sm: 2 }, fontFamily: TAJAWAL } }}
                        />

                        <TextField
                          placeholder="أدخل نصًا (اختياري)"
                          value={thirdTexts[i] || ""}
                          onChange={(e) => handleThirdTextChange(i, e.target.value)}
                          size="small"
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: { xs: 1, sm: 0 },
                            ml: { sm: 2 },
                            minWidth: { sm: 220 },
                            "& .MuiInputBase-input": { fontFamily: TAJAWAL },
                            "& .MuiInputLabel-root": { fontFamily: TAJAWAL },
                          }}
                          inputProps={{ "aria-label": `${label}-text`, style: { fontFamily: TAJAWAL } }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Fourth Group */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               المعلومات المالية
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <Box sx={{ display: "grid", gap: 2 }}>
                {CHECKBOX_ITEMS_FOURTH.map((label, i) => {
                  const checked = !!selectedFourth[i];
                  return (
                    <Box
                      key={`fourth-row-${i}`}
                      sx={{
                        m: 0,
                        p: 1.2,
                        borderRadius: 3,
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "flex-start",
                        border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                        backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                        transition: "all 220ms ease",
                        animation: `${fadeUp} 480ms ease both`,
                        animationDelay: `${i * 80}ms`,
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => toggleFourth(i)}
                            inputProps={{ "aria-label": label }}
                            disableRipple
                            icon={<ToggleIcon checked={false} />}
                            checkedIcon={<ToggleIcon checked={true} />}
                            sx={{ p: 0, mr: 1.4, "& .MuiSvgIcon-root": { display: "none" } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 700, fontFamily: TAJAWAL }}>
                            {label}
                          </Typography>
                        }
                        sx={{ m: 0, p: 0, flex: "0 0 auto", "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL } }}
                      />

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", width: { xs: "100%", sm: "auto" }, alignItems: "center" }}>
                        <TextField
                          label={FOURTH_TEXT_LABEL_1}
                          placeholder={FOURTH_TEXT_LABEL_1}
                          value={fourthTexts[i] || ""}
                          onChange={(e) => handleFourthTextChange(i, e.target.value)}
                          size="small"
                          variant="outlined"
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            "& .MuiInputBase-input": { fontFamily: TAJAWAL },
                            "& .MuiInputLabel-root": { fontFamily: TAJAWAL },
                          }}
                          inputProps={{ "aria-label": `${label}-note1`, style: { fontFamily: TAJAWAL } }}
                          InputLabelProps={{ shrink: Boolean(fourthTexts[i]) }}
                        />

                        <TextField
                          label={FOURTH_TEXT_LABEL_2}
                          placeholder={FOURTH_TEXT_LABEL_2}
                          value={fourthTexts2[i] || ""}
                          onChange={(e) => handleFourthText2Change(i, e.target.value)}
                          size="small"
                          variant="outlined"
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            "& .MuiInputBase-input": { fontFamily: TAJAWAL },
                            "& .MuiInputLabel-root": { fontFamily: TAJAWAL },
                          }}
                          inputProps={{ "aria-label": `${label}-note2`, style: { fontFamily: TAJAWAL } }}
                          InputLabelProps={{ shrink: Boolean(fourthTexts2[i]) }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </FormControl>
          </Box>
        </Box>

        {/* Fifth Group */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               طرية الدفع
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gridTemplateColumns: gridCols, gap: { xs: 1.25, md: 2 } }}>
                  {CHECKBOX_ITEMS_FIFTH.map((label, i) => {
                    const checked = !!selectedFifth[i];
                    return (
                      <FormControlLabel
                        key={`fifth-${label}-${i}`}
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

        {/* Sixth Group (Search) */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", fontFamily: TAJAWAL }}>
               
            </Typography>
          </Box>
          <Box sx={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)", borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: "0 18px 50px rgba(7,22,23,0.06)", border: "1px solid rgba(3,59,66,0.04)" }}>
            <FormControl sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
                <TextField
                  fullWidth
                  placeholder="ابحث هنا..."
                  value={sixthSearchQuery}
                  onChange={(e) => setSixthSearchQuery(e.target.value)}
                  size="small"
                  variant="outlined"
                  inputProps={{ "aria-label": "sixth-search", style: { fontFamily: TAJAWAL } }}
                  InputLabelProps={{ style: { fontFamily: TAJAWAL } }}
                  sx={{
                    "& .MuiInputBase-input": { fontFamily: TAJAWAL },
                    "& .MuiInputLabel-root": { fontFamily: TAJAWAL },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    whiteSpace: "nowrap",
                    px: 3,
                    py: 1,
                    fontWeight: 700,
                    alignSelf: { xs: "stretch", md: "center" },
                    width: { xs: "100%", md: "auto" },
                    background: GRADIENT,
                    boxShadow: "0 10px 30px rgba(3,80,75,0.08)",
                    fontFamily: TAJAWAL,
                  }}
                >
                  ابحث
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Service03;
