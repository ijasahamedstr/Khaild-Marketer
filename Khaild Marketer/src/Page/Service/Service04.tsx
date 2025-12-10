// Service04.tsx
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
    search?: string;
    fifthText?: string[]; // array for multiple lines
    sixthButtons?: string[]; // buttons pressed/toggled in sixth section
    seventhRows?: string[]; // [row1Value, row2LabelText, row3LabelText]
  }) => void;
};

// Fifth group: two lines/items
const CHECKBOX_ITEMS_FIFTH = ["تفاصيل إضافية 1", "تفاصيل إضافية 2"];

// Sixth group: two full-width buttons (labels shown inside buttons)
const SIXTH_BUTTONS = ["إجراء 1", "إجراء 2"];

// Seventh section rows definitions (labels)
const SEVENTH_ROWS = [
  { label: "سطر 1 — إدخال", hasInput: true },
  { label: "سطر 2 — نص فقط", hasInput: false },
];

const TAJAWAL = "'Tajawal', sans-serif";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0) }
`;

const fadeUp = (delay = 0) => keyframes`
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
            <path d="M10.6 1.1L4.6 7.1 1.4 3.9" stroke="#023B4E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </Box>
    </Box>
  );
};

const Service04: React.FC<Props> = ({ onSubmit }) => {
  const [selectedFifth, setSelectedFifth] = React.useState<Record<number, boolean>>({});
  const [sixthButtonsState, setSixthButtonsState] = React.useState<Record<number, boolean>>({});
  const [sixthSearchQuery, setSixthSearchQuery] = React.useState<string>("");
  const [fifthText, setFifthText] = React.useState<Record<number, string>>({});
  const [seventhText, setSeventhText] = React.useState<Record<number, string>>({});

  const toggleFifth = (i: number) => setSelectedFifth((s) => ({ ...s, [i]: !s[i] }));
  const handleFifthTextChange = (i: number, val: string) => setFifthText((s) => ({ ...s, [i]: val }));
  const toggleSixthButton = (i: number) => setSixthButtonsState((s) => ({ ...s, [i]: !s[i] }));
  const handleSeventhTextChange = (i: number, val: string) =>
    setSeventhText((s) => ({ ...s, [i]: val }));

  const handleSubmit = () => {
    const chosenFifth = CHECKBOX_ITEMS_FIFTH.filter((_, i) => !!selectedFifth[i]);
    const fifthTextArr = CHECKBOX_ITEMS_FIFTH.map((_, i) => fifthText[i] ?? "");
    const sixthButtonsArr = SIXTH_BUTTONS.filter((_, i) => !!sixthButtonsState[i]);

    const seventhRowsArr = SEVENTH_ROWS.map((r, i) =>
      r.hasInput ? (seventhText[i] ?? "") : r.label
    );

    if (onSubmit)
      onSubmit({
        fifth: chosenFifth,
        search: sixthSearchQuery,
        fifthText: fifthTextArr,
        sixthButtons: sixthButtonsArr,
        seventhRows: seventhRowsArr,
      });
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
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3, animation: `${float} 6s ease-in-out infinite` }}>
      </Box>

      <Box sx={{ mb: 4 }}>
        {/* Seventh Group */}
        <Box sx={{ mt: 5, mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              معلومات إضافية
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
                  <Typography
                    sx={{ fontWeight: 700, minWidth: { sm: "220px" }, fontFamily: TAJAWAL }}
                  >
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
        <Box sx={{ mt: 0 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", md: "2rem" },
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: TAJAWAL,
              }}
            >
              ملاحظة إضافية
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
            <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
              <FormGroup>
                <Box sx={{ display: "grid", gap: 2 }}>
                  {CHECKBOX_ITEMS_FIFTH.map((label, i) => {
                    const checked = !!selectedFifth[i];
                    const delay = `${i * 80}ms`;
                    return (
                      <Box
                        key={`fifth-row-${i}`}
                        sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", gap: 2 }}
                      >
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
                            <Typography
                              sx={{
                                fontSize: { xs: "1rem", md: "1.15rem" },
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                            backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                            transition: "all 220ms ease",
                            animation: `${fadeUp()} 480ms ease both`,
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
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Service04;
