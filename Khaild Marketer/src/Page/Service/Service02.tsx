import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { keyframes } from "@mui/system";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

type Props = {
  onSubmit?: (selectedItems: {
    rowsSelected?: string[];
    files?: File[];
    contactPhone?: string; // Changed from 'whatsapp' to 'contactPhone'
    note?: string;
  }) => void;
};

const ROWS = [
  { id: 0, label: "رفع صورة صك الملكية", type: "file" },
  { id: 1, label: "يمكنك التواصل معنا عبر واتس اب الموقع ", type: "static_phone" }, // New type for static display
  { id: 2, label: "ترك رقم جوالك للتواصل معك لاحقا (مطلوب)", type: "contact_phone_input" }, // New type for required phone input
  { id: 3, label: "ملاحظات إضافية (اختياري)", type: "note_area" }, // New type for optional note
];

const TAJAWAL = "'Tajawal', sans-serif";
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0) }
`;
const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";

const ACCEPTED_EXT = [".pdf"];

const Service02: React.FC<Props> = ({ onSubmit }) => {
  React.useEffect(() => {
    // Scroll to the very top of the window instead of a specific element
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  // State initialization
  const [files, setFiles] = React.useState<File[]>([]);
  const [contactPhone, setContactPhone] = React.useState<string>(""); // New state for contact phone
  const [note, setNote] = React.useState<string>("");
  const [phoneError, setPhoneError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [dragError, setDragError] = React.useState<string | null>(null);

  const validateFiles = (incoming: FileList | null) => {
    if (!incoming) return [];
    const arr = Array.from(incoming);
    const accepted = arr.filter((f) => {
      const ext = "." + f.name.split(".").pop()!.toLowerCase();
      return ACCEPTED_EXT.includes(ext);
    });
    return accepted;
  };

  const validatePhone = (phone: string): boolean => {
    // Simple validation: check if it's non-empty and contains only digits/common characters
    const trimmed = phone.trim();
    if (trimmed.length === 0) {
        setPhoneError("الرجاء إدخال رقم الجوال للتواصل");
        return false;
    }
    // Simple regex for digits, spaces, hyphens, and parentheses (common for phone inputs)
    const phoneRegex = /^[\d\s()+-]+$/; 
    if (!phoneRegex.test(trimmed)) {
        setPhoneError("صيغة رقم الجوال غير صحيحة");
        return false;
    }
    setPhoneError(null);
    return true;
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
    const isPhoneValid = validatePhone(contactPhone);

    if (!isPhoneValid) {
        // Scroll to the phone input if invalid
        document.getElementById('contact-phone-input')?.focus();
        return;
    }

    const rowsSelected = ROWS.map((r) => r.label);
    if (onSubmit)
      onSubmit({
        rowsSelected,
        files,
        contactPhone: contactPhone.trim(),
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
      
      {/* Scroll target is now the absolute top (window.scrollTo) */}
      <Box sx={{ textAlign: "center", mb: 3, animation: `${float} 6s ease-in-out infinite` }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
            background: "#003c46",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            fontFamily: TAJAWAL,
          }}
        >
          بيع العقار
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
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontFamily: TAJAWAL,
              }}
            >
              الرجاء اختيار إحدى الطرق المناسبة لك للتواصل معنا
            </Typography>
          </Box>
          <Box sx={{ display: "grid", gap: 3 }}>
            {ROWS.map((row) => {
              return (
                <Box key={`row-${row.id}`} sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", gap: 2 }}>
                  {/* LABEL */}
                  <Box
                    sx={{
                      minWidth: { sm: "240px" },
                      py: 1,
                      px: 1.25,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      cursor: row.type === "file" ? "pointer" : "default",
                      "&:hover": row.type === "file" ? { textDecoration: "underline" } : {},
                    }}
                    role={row.type === "file" ? "button" : undefined}
                    tabIndex={row.type === "file" ? 0 : undefined}
                    onClick={() => {
                      if (row.type === "file") fileInputRef.current?.click();
                    }}
                    onKeyDown={(e) => {
                      if (row.type === "file" && (e.key === "Enter" || e.key === " ")) {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontFamily: TAJAWAL }}>{row.label}</Typography>
                  </Box>

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
                          لرفع صورة صك الملكية الرجاء الضغط هنا
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
                                if(fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
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

                  {/* STATIC PHONE DISPLAY */}
                  {row.type === "static_phone" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: TAJAWAL,
                        direction: "ltr",
                      }}
                    >
                      <WhatsAppIcon sx={{ color: "#25D366", fontSize: 28 }} />
                      <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                        057 085 9999
                      </Typography>
                    </Box>
                  )}


                  {/* CONTACT PHONE INPUT */}
                  {row.type === "contact_phone_input" && (
                    <TextField
                      id="contact-phone-input"
                      value={contactPhone}
                      onChange={(e) => {
                        setContactPhone(e.target.value);
                        // Optional: clear error on user input
                        if (phoneError) validatePhone(e.target.value);
                      }}
                      error={!!phoneError}
                      helperText={phoneError}
                      size="small"
                      type="tel"
                      sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
                      inputProps={{
                        dir: "ltr", // Phone number should be LTR
                        style: { fontFamily: TAJAWAL, textAlign: 'left' }
                      }}
                    />
                  )}

                  {/* NOTE AREA */}
                  {row.type === "note_area" && (
                      <TextField
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          size="small" 
                          multiline
                          minRows={1} 
                          maxRows={4} 
                          placeholder="اكتب ملاحظاتك هنا..."
                          sx={{ flexGrow: 1 }}
                          inputProps={{
                              dir: "rtl",
                              style: { fontFamily: TAJAWAL } 
                          }}
                      />
                  )}
            
                </Box>
              );
            })}
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
      </Box>
    </Container>
  );
};

export default Service02;