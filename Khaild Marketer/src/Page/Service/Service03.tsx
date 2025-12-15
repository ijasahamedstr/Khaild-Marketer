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
  Select,
  MenuItem,
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

// *** NEW: Dropdown options for CHECKBOX_ITEMS_THIRD (اختر الحي) ***
const DROPDOWN_OPTIONS = [
  { value: "الرياض", label: "الرياض" },
  { value: "جدة", label: "جدة" },
  { value: "الدمام", label: "الدمام" },
  { value: "الخبر", label: "الخبر" },
  { value: "مكة المكرمة", label: "مكة المكرمة" },
  // Add more options as needed...
];
// ****************************

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

const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)"; // Purple to Pink

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
        border: checked ? "1px solid rgba(168,85,247,0.2)" : "1px solid #A855F7", // Purple outline when unchecked
        boxShadow: checked ? "0 4px 12px rgba(168,85,247,0.3)" : "none", // Softer purple shadow when checked
      }}
    >
      {checked ? (
        // Checkmark Icon
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White checkmark for contrast on the dark purple/pink background */}
          <path
            d="M12.6 1.1L5.6 8.1 1.4 3.9"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </Box>
  );
};
// *** END: SQUARE STYLE CHECKBOX IMPLEMENTATION ***

const Service03: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll to the very top of the window instead of a specific element
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const [selectedFirst, setSelectedFirst] = React.useState<
    Record<number, boolean>
  >({});
  const [selectedSecond, setSelectedSecond] = React.useState<
    Record<number, boolean>
  >({});
  const [selectedThird, setSelectedThird] = React.useState<
    Record<number, boolean>
  >({});
  // *** UPDATED: State for the dropdown value (replaces thirdTexts) ***
  const [thirdDropdownValues, setThirdDropdownValues] = React.useState<
    Record<number, string>
  >({});
  // *******************************************************************
  const [selectedFourth, setSelectedFourth] = React.useState<
    Record<number, boolean>
  >({});
  const [fourthTexts, setFourthTexts] = React.useState<Record<number, string>>(
    {}
  );
  const [fourthTexts2, setFourthTexts2] = React.useState<
    Record<number, string>
  >({});
  const [selectedFifth, setSelectedFifth] = React.useState<
    Record<number, boolean>
  >({});
  const [sixthSearchQuery, setSixthSearchQuery] = React.useState<string>("");

  const toggleFirst = (i: number) =>
    setSelectedFirst((s) => ({ ...s, [i]: !s[i] }));
  const toggleSecond = (i: number) =>
    setSelectedSecond((s) => ({ ...s, [i]: !s[i] }));
  const toggleThird = (i: number) =>
    setSelectedThird((s) => ({ ...s, [i]: !s[i] }));
  const toggleFourth = (i: number) =>
    setSelectedFourth((s) => ({ ...s, [i]: !s[i] }));
  const toggleFifth = (i: number) =>
    setSelectedFifth((s) => ({ ...s, [i]: !s[i] }));

  // *** UPDATED: Handler for the dropdown Select component (replaces handleThirdTextChange) ***
  const handleThirdDropdownChange = (i: number, value: string) =>
    setThirdDropdownValues((s) => ({ ...s, [i]: value }));
  // ******************************************************************************************
  const handleFourthTextChange = (i: number, value: string) =>
    setFourthTexts((s) => ({ ...s, [i]: value }));
  const handleFourthText2Change = (i: number, value: string) =>
    setFourthTexts2((s) => ({ ...s, [i]: value }));

  const handleSubmit = () => {
    const chosenSecond = CHECKBOX_ITEMS_SECOND.filter((
      _,
      i
    ) => !!selectedSecond[i]);

    // *** UPDATED: Logic uses thirdDropdownValues now ***
    const chosenThird = CHECKBOX_ITEMS_THIRD.map((label, i) => {
      if (!selectedThird[i]) return null;
      const selectedValue = (thirdDropdownValues[i] || "").trim(); // Use the selected dropdown value
      return selectedValue ? `${label} — ${selectedValue}` : label;
    }).filter(Boolean) as string[];
    // **************************************************

    const chosenFourthCheckboxes = CHECKBOX_ITEMS_FOURTH.map((label, i) =>
      selectedFourth[i] ? label : null
    ).filter(Boolean) as string[];

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

    const chosenFourth = [
      ...chosenFourthCheckboxes,
      ...chosenFourthTexts1,
      ...chosenFourthTexts2,
    ];

    const chosenFifth = CHECKBOX_ITEMS_FIFTH.filter((_, i) => !!selectedFifth[i]);

    if (onSubmit)
      onSubmit({
        second: chosenSecond,
        third: chosenThird,
        fourth: chosenFourth,
        fifth: chosenFifth,
        search: sixthSearchQuery,
      });
  };

  const gridCols = { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" };

  // 🛠️ Defined a minimalist style for the group wrappers
  const minimalistGroupStyle = { p: { xs: 2, md: 3 } };

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
      <Box
        ref={topRef}
        sx={{
          textAlign: "center",
          mb: 3,
          animation: `${float} 6s ease-in-out infinite`,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
            // Keeping original title color for strong contrast
            background: "#023B4E",
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
        {/* Second Group */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: "#023B4E",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              نوع العقار
            </Typography>
          </Box>
          {/* Applied minimalist style */}
          <Box sx={minimalistGroupStyle}>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}
            >
              <FormGroup>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    gap: { xs: 1.25, md: 2 },
                  }}
                >
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
                            sx={{
                              p: 0,
                              mr: 1.4,
                              "& .MuiSvgIcon-root": { display: "none" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: "1rem", md: "1.9rem" },
                              fontWeight: 700,
                              fontFamily: TAJAWAL,
                            }}
                          >
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
                          gap: 2,
                          border: checked
                            ? "1px solid #A855F7"
                            : "1px solid #eef3f3",
                          backgroundColor: checked
                            ? "rgba(168, 85, 247, 0.08)"
                            : "#70aabdff",
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

        {/* Third Group (Now with Dropdown Menu) */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: "#023B4E",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              الحي المرغوب فيه الشراء
            </Typography>
          </Box>
          {/* Applied minimalist style */}
          <Box sx={minimalistGroupStyle}>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}
            >
             <FormGroup>
              <Box
                sx={{
                  display: "grid",
                  // MODIFICATION: 1 column on mobile/small (xs), 2 columns on desktop (md and up)
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
                  gap: { xs: 1.25, md: 2 },
                }}
              >
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
                        // Keeping box/container styles from previous update (Purple/Pink theme)
                        border: checked
                          ? "1px solid #A855F7"
                          : "1px solid #eef3f3",
                        backgroundColor: checked
                          ? "rgba(168, 85, 247, 0.08)"
                          : "#70aabdff",
                        transition: "all 220ms ease",
                        animation: `${fadeUp} 480ms ease both`,
                        animationDelay: `${i * 80}ms`,
                        gap: 2,
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
                            sx={{
                              p: 0,
                              mr: 1.4,
                              "& .MuiSvgIcon-root": { display: "none" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: "1rem", md: "1.9rem" },
                              fontWeight: 700,
                              fontFamily: TAJAWAL,
                            }}
                          >
                            {label}
                          </Typography>
                        }
                        sx={{
                          m: 0,
                          p: 0,
                          flex: "0 0 auto",
                          "& .MuiFormControlLabel-label": {
                            px: { xs: 1, sm: 2 },
                            fontFamily: TAJAWAL,
                          },
                        }}
                      />

                      {/* --- REPLACEMENT START: TextField is replaced with Select --- */}
                      <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                          mt: { xs: 1, sm: 0 },
                          fontSize: { xs: "1rem", md: "1.9rem" },
                          ml: { sm: 2 },
                          minWidth: { sm: 220 },
                          "& .MuiInputBase-input": { fontFamily: TAJAWAL },
                          "& .MuiInputLabel-root": { fontFamily: TAJAWAL },
                        }}
                      >
                        
                        <Select
                          labelId={`select-label-${i}`}
                          id={`select-${i}`}
                          // *** Using the new state for dropdown value ***
                          value={thirdDropdownValues[i] || ""} 
                          label="اختر خيارًا (اختياري)"
                          // *** Using the new handler ***
                          onChange={(e) =>
                            handleThirdDropdownChange(i, e.target.value as string)
                          }
                          inputProps={{ "aria-label": `${label}-select` }}
                        >
                          <MenuItem value="" sx={{ fontFamily: TAJAWAL }}>
                            <em>لا شيء</em>
                          </MenuItem>
                          {/* Mapping through the new DROPDOWN_OPTIONS */}
                          {DROPDOWN_OPTIONS.map((option, index) => (
                            <MenuItem
                              key={`option-${index}`}
                              value={option.value}
                              sx={{ fontFamily: TAJAWAL }}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* --- REPLACEMENT END --- */}
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
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: "#023B4E",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              المعلومات المالية
            </Typography>
          </Box>
          {/* Applied minimalist style */}
          <Box sx={minimalistGroupStyle}>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}
            >
              {/* Apply grid layout to the container Box */}
              <Box
                sx={{
                  display: "grid",
                  // Add the new grid properties here
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 1.25, md: 18 },
                }}
              >
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
                        // Keep the flex layout for the content *inside* each checkbox item
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // Keeping box/container styles from previous update (Purple/Pink theme)
                        border: checked
                          ? "1px solid #A855F7"
                          : "1px solid #eef3f3",
                        backgroundColor: checked
                          ? "rgba(168, 85, 247, 0.08)"
                          : "#70aabdff",
                        transition: "all 220ms ease",
                        animation: `${fadeUp} 480ms ease both`,
                        animationDelay: `${i * 80}ms`,
                        gap: 10,
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
                            sx={{
                              p: 0,
                              mr: 1.4,
                              "& .MuiSvgIcon-root": { display: "none" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: "1rem", md: "1.9rem" },
                              fontWeight: 700,
                              fontFamily: TAJAWAL,
                            }}
                          >
                            {label}
                          </Typography>
                        }
                        sx={{
                          m: 0,
                          p: 0,
                          flex: "0 0 auto",
                          "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL },
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          width: { xs: "100%", sm: "auto" },
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.45rem", md: "1.9rem" },
                            background: "#023B4E",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                            fontFamily: TAJAWAL,
                          }}
                        >
                          من
                        </Typography>

                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.45rem", md: "1.9rem" },
                            background: "#023B4E",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                            fontFamily: TAJAWAL,
                          }}
                        >
                          إلى
                        </Typography>


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
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: "#023B4E",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              طرية الدفع
            </Typography>
          </Box>
          {/* Applied minimalist style */}
          <Box sx={minimalistGroupStyle}>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}
            >
              <FormGroup>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    gap: { xs: 1.25, md: 2 },
                  }}
                >
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
                            sx={{
                              p: 0,
                              mr: 1.4,
                              "& .MuiSvgIcon-root": { display: "none" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: "1rem", md: "1.9rem" },
                              fontWeight: 700,
                              fontFamily: TAJAWAL,
                            }}
                          >
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
                          gap: 2,
                          border: checked
                            ? "1px solid #A855F7"
                            : "1px solid #eef3f3",
                          backgroundColor: checked
                            ? "rgba(168, 85, 247, 0.08)"
                            : "#70aabdff",
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
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: "#023B4E",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              ابحث
            </Typography>
          </Box>
          {/* Applied minimalist style */}
          <Box sx={minimalistGroupStyle}>
            <FormControl sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="ابحث هنا..."
                  value={sixthSearchQuery}
                  onChange={(e) => setSixthSearchQuery(e.target.value)}
                  size="small"
                  variant="outlined"
                  inputProps={{
                    "aria-label": "sixth-search",
                    style: { fontFamily: TAJAWAL },
                  }}
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
                    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)",
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