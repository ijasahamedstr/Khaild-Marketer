// src/Page/Service/Service02.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { keyframes } from "@mui/system";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type Props = {
  onSubmit?: (selectedItems: {
    rowsSelected?: string[];
    files?: File[];
    whatsapp?: string;
    note?: string;
  }) => void;
};

const ROWS = [
  { id: 0, label: "ارفع لنا صورة صك الملكية", type: "file" },
  { id: 1, label: "أو تواصل معنا على الواتس اب", type: "phone" },
  { id: 2, label: "ارسل لنا رقمك لنتواصل معك لاحقا", type: "text" },
  { id: 3, label: "أو يمكنكم التواصل مع قسم بيع العقارات على هذا الرقم", type: "none" },
];

const TAJAWAL = "'Tajawal', sans-serif";
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0) }
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
        boxShadow: checked
          ? "0 10px 28px rgba(3,80,75,0.12)"
          : "0 6px 18px rgba(9,12,15,0.03)",
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

const ACCEPTED_EXT = [".pdf"];

const Service02: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const [checkedRows, setCheckedRows] = React.useState<Record<number, boolean>>({});
  const [files, setFiles] = React.useState<File[]>([]);
  const [whatsapp, setWhatsapp] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [dragError, setDragError] = React.useState<string | null>(null);

  const toggleRow = (i: number) => setCheckedRows((s) => ({ ...s, [i]: !s[i] }));

  const validateFiles = (incoming: FileList | null) => {
    if (!incoming) return [];
    const arr = Array.from(incoming);
    // allow only accepted extensions, filter others
    const accepted = arr.filter((f) => {
      const ext = "." + f.name.split(".").pop()!.toLowerCase();
      return ACCEPTED_EXT.includes(ext);
    });
    return accepted;
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragError(null);
    const f = e.target.files;
    if (!f) return;
    const accepted = validateFiles(f);
    if (accepted.length === 0) {
      setDragError(`الملف غير مدعوم — الصيغ المسموح بها: ${ACCEPTED_EXT.join(", ")}`);
      return;
    }
    setFiles(accepted);
    setCheckedRows((s) => ({ ...s, [0]: true }));
  };

  const onDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDragOver(false);
    setDragError(null);
    const dt = ev.dataTransfer;
    if (!dt || !dt.files || dt.files.length === 0) return;
    const accepted = validateFiles(dt.files);
    if (accepted.length === 0) {
      setDragError(`الملف غير مدعوم — الصيغ المسموح بها: ${ACCEPTED_EXT.join(", ")}`);
      return;
    }
    setFiles(accepted);
    setCheckedRows((s) => ({ ...s, [0]: true }));
  };

  const onDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDragOver(true);
  };
  const onDragLeave = (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDragOver(false);
  };

  const handleSubmit = () => {
    const rowsSelected = ROWS.filter((r) => !!checkedRows[r.id]).map((r) => r.label);
    if (onSubmit)
      onSubmit({
        rowsSelected,
        files,
        whatsapp: whatsapp.trim(),
        note: note.trim(),
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
        <Box
          sx={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.95), #fff)",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            boxShadow: "0 18px 50px rgba(7,22,23,0.06)",
            border: "1px solid rgba(3,59,66,0.04)",
          }}
        >
          <FormGroup>
            <Box sx={{ display: "grid", gap: 2 }}>
              {ROWS.map((row) => {
                const checked = !!checkedRows[row.id];

                return (
                  <Box key={`row-${row.id}`} sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={() => toggleRow(row.id)}
                          disableRipple
                          icon={<ToggleIcon checked={false} />}
                          checkedIcon={<ToggleIcon checked={true} />}
                          sx={{
                            p: 0,
                            mr: 1.4,
                            "& .MuiSvgIcon-root": { display: "none" },
                          }}
                          inputProps={{ "aria-label": row.label }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontFamily: TAJAWAL,
                          }}
                        >
                          {row.label}
                        </Typography>
                      }
                      sx={{
                        m: 0,
                        minWidth: { sm: "240px" },
                        py: 1,
                        px: 1.25,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        border: checked ? "1px solid rgba(34,197,94,0.12)" : "1px solid #eef3f3",
                        backgroundColor: checked ? "rgba(234,255,246,0.7)" : "#fff",
                        transition: "all 220ms ease",
                        textTransform: "none",
                        "& .MuiFormControlLabel-label": { fontFamily: TAJAWAL, fontSize: "1rem" },
                      }}
                    />

                    {/* FILE DROPZONE */}
                    {row.type === "file" && (
                      <Box sx={{ width: "100%" }}>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED_EXT.join(",")}
                          multiple
                          style={{ display: "none" }}
                          onChange={handleFilePick}
                        />

                        <Box
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={onDrop}
                          onDragOver={onDragOver}
                          onDragLeave={onDragLeave}
                          role="button"
                          tabIndex={0}
                          sx={{
                            cursor: "pointer",
                            borderRadius: 2,
                            border: "2px dashed rgba(2,59,78,0.2)",
                            background: isDragOver ? "rgba(2,59,78,0.03)" : "transparent",
                            py: 3,
                            px: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            transition: "all .18s ease",
                            "&:hover": {
                              borderColor: "rgba(2,59,78,0.35)",
                              background: "rgba(2,59,78,0.02)",
                            },
                          }}
                        >
                          {/* Cloud icon */}
                          <Box
                            sx={{
                              width: 68,
                              height: 54,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            aria-hidden
                          >
                            <svg width="68" height="54" viewBox="0 0 68 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M46.5 16.5C44.7 9.2 38.1 3.5 30 3.5c-9.6 0-17.4 7-18.6 16.3C5.7 20 0 26.9 0 34.9 0 44.3 7.7 52 17.2 52h31.6C54.3 52 62 44.3 62 34.9c0-8-6.1-14.3-15.5-14.4z" fill="none" stroke="#059FD6" strokeWidth="2"/>
                              <path d="M34 22v12" stroke="#059FD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M26 30l8-8 8 8" stroke="#059FD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Box>

                          <Typography sx={{ fontSize: "0.95rem", color: "text.primary", fontFamily: TAJAWAL }}>
                            Drag & Drop Files here Or
                          </Typography>

                          <Button variant="contained" size="small" onClick={() => fileInputRef.current?.click()} sx={{ textTransform: "none", background: "rgba(2,59,78,0.9)" }}>
                            Browse
                          </Button>

                          <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.5, fontFamily: TAJAWAL }}>
                            (<Typography component="span" sx={{ color: "error.main", fontWeight: 700 }}>{`file extension allowed:`}</Typography> {ACCEPTED_EXT.join(", ")})
                          </Typography>
                        </Box>

                        {/* error or file list */}
                        <Box sx={{ mt: 1 }}>
                          {dragError && (
                            <Typography sx={{ color: "error.main", fontSize: "0.9rem", fontFamily: TAJAWAL }}>{dragError}</Typography>
                          )}

                          {!dragError && files.length === 0 && (
                            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", fontFamily: TAJAWAL, mt: 1 }}>
                              لا توجد ملفات مختارة
                            </Typography>
                          )}

                          {files.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              {files.map((f, idx) => (
                                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                  <UploadFileIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                                  <Typography sx={{ fontSize: "0.95rem", fontFamily: TAJAWAL }}>{f.name}</Typography>
                                </Box>
                              ))}
                              <Button
                                size="small"
                                onClick={() => {
                                  setFiles([]);
                                  setCheckedRows((s) => ({ ...s, [0]: false }));
                                }}
                                sx={{ mt: 1, textTransform: "none" }}
                              >
                                إزالة الملفات
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* PHONE INPUT */}
                    {row.type === "phone" && (
                      <TextField
                        placeholder="أدخل رقم واتساب مع الماكينة (مثال: +9665... )"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        fullWidth
                        inputProps={{ dir: "ltr", style: { fontFamily: TAJAWAL } }}
                      />
                    )}

                    {/* TEXTAREA */}
                    {row.type === "text" && (
                      <TextField
                        placeholder="أضف تفاصيل أو وصفًا إضافيًا..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                        multiline
                        minRows={2}
                        inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL } }}
                      />
                    )}

                    {/* NONE */}
                    {row.type === "none" && (
                      <Box sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
                        اضغط للموافقة
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </FormGroup>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
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
