/**
 * MedicalRecordModal
 * Displays MedicalRecordResponse: { id, appointmentId, symptoms, diagnosis, notes }
 * Prop `record` shape: { doctorName, date, symptoms, diagnosis, notes }
 */
export default function MedicalRecordModal({ open, onClose, record, loading }) {
  if (!open) return null;

  const hasContent = record?.symptoms || record?.diagnosis || record?.notes;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff", borderRadius: "16px",
          width: "100%", maxWidth: "520px",
          maxHeight: "85vh", overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #f0f0f0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: "10px",
                background: "#EEF2FF",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <line x1="9" y1="12" x2="15" y2="12"/>
                <line x1="9" y1="16" x2="13" y2="16"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>Medical Record</p>
              <p style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>{record?.date || "—"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: "8px",
              border: "1px solid #e5e7eb", background: "#f9fafb",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", color: "#6b7280", lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ overflowY: "auto", padding: "1.25rem 1.5rem", flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#9ca3af", fontSize: "14px" }}>
              Loading medical record...
            </div>
          ) : !hasContent ? (
            <div
              style={{
                textAlign: "center", padding: "2.5rem 1rem",
                background: "#f9fafb", borderRadius: "12px",
                border: "1px dashed #e5e7eb",
              }}
            >
              <svg width="32" height="32" style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
              <p style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>No medical record found</p>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>The doctor has not filed a record for this appointment yet.</p>
            </div>
          ) : (
            <>
              {/* Doctor */}
              <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "10px 14px", marginBottom: "1rem" }}>
                <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "3px" }}>Doctor</p>
                <p style={{ fontSize: "14px", color: "#111", fontWeight: 500 }}>{record?.doctorName || "—"}</p>
              </div>

              {/* Clinical fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1rem" }}>
                {[
                  { label: "Symptoms",  value: record?.symptoms  },
                  { label: "Diagnosis", value: record?.diagnosis },
                ].map(({ label, value }) =>
                  value ? (
                    <div
                      key={label}
                      style={{ background: "#f8f9fa", borderRadius: "10px", padding: "10px 14px" }}
                    >
                      <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</p>
                      <p style={{ fontSize: "14px", color: "#111", lineHeight: 1.6 }}>{value}</p>
                    </div>
                  ) : null
                )}
              </div>

              {/* Notes — "notes" field per spec */}
              {record?.notes && (
                <div
                  style={{
                    background: "#FFF8E7", border: "1px solid #FDE68A",
                    borderRadius: "10px", padding: "10px 14px",
                    display: "flex", gap: "8px", alignItems: "flex-start",
                  }}
                >
                  <svg width="15" height="15" style={{ flexShrink: 0, marginTop: "2px" }} viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  <div>
                    <p style={{ fontSize: "11px", color: "#92400e", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "3px" }}>Notes</p>
                    <p style={{ fontSize: "13px", color: "#92400e", lineHeight: 1.6 }}>{record.notes}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
