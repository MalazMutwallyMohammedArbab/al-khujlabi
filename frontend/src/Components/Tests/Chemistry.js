import { useState } from "react";

const chemistryTests = [
  { test: "اختر اسم الفحص", unit: "", range: "" },
  // 🔹 السكر
  { test: "FBG", unit: "mg/dL", range: "70-99" },
  { test: "RBG", unit: "mg/dL", range: "70-140" },
  { test: "PPBS", unit: "mg/dL", range: "70-140" },

  // 🔹 وظائف الكلى RFT
  { test: "Urea", unit: "mg/dL", range: "15-45" },
  { test: "Blood Urea Nitrogen(BUN)", unit: "mg/dL", range: "7-20" },
  { test: "Creatinine", unit: "mg/dL", range: "Male: 0.7-1.4, Female: 0.6-1.2" },
  { test: "Uric Acid", unit: "mg/dL", range: "Male: 3.5-7.2, Femle: 2.6-6.0" },

  // 🔹 وظائف الكبد LFT
  { test: "ALT", unit: "U/L", range: "7-56" },
  { test: "AST", unit: "U/L", range: "10-40" },
  { test: "ALP", unit: "U/L", range: "44-147" },
  { test: "GGT", unit: "U/L", range: "Male: 8-61, Female: 5-36" },
  { test: "Total Protein", unit: "g/dL", range: "6.4-8.3" },
  { test: "Albumin", unit: "g/dL", range: "3.5-5.0" },
  { test: "Globulin", unit: "g/dL", range: "2.0-3.5" },
  { test: "ALB/Globulin ratio", unit: "ratio", range: "1.0-2.2" },
  { test: "Bilirubin Total", unit: "mg/dL", range: "0.3-1.2" },
  { test: "Bilirubin Direct", unit: "mg/dL", range: "0.0-0.3" },
  { test: "Bilirubin Indirect", unit: "mg/dL", range: "0.2-0.9" },

  // 🔹 الدهون Lipids
  { test: "Total Cholesterol", unit: "mg/dL", range: "<200" },
  { test: "Triglycerides", unit: "mg/dL", range: "<150" },
  { test: "HDL", unit: "mg/dL", range: "Male: >40, Female: >50" },
  { test: "LDL", unit: "mg/dL", range: "<100" },
  { test: "VLDL", unit: "mg/dL", range: "5-40" },

  // 🔹 العضلات والقلب
  { test: "CK", unit: "U/L", range: "20-200" },
  { test: "CK-MB", unit: "ng/mL", range: "0-5" },
  { test: "LDH", unit: "U/L", range: "140-280" },

    // 🔹 الكهارل Electrolytes
  { test: "Na+", unit: "mmol/L", range: "135-145" },
  { test: "K+", unit: "mmol/L", range: "3.5-5.0" },
  { test: "Cl", unit: "mmol/L", range: "95-106" },
  { test: "Ca+", unit: "mg/dL", range: "8.5-10.5" },
  { test: "Phosphorus(PHO)", unit: "mg/dL", range: "2.5-4.5" },
  { test: "Mg+", unit: "mg/dL", range: "1.7-2.2" },

  // 🔹 فحوصات نقص الحديد
  { test: "Iron", unit: "µg/dL", range: "Male: 65-175, Female: 50-170" },
  { test: "Ferritin", unit: "ng/mL", range: "Male: 30-400, Female: 15-150" },
  { test: "TIBC", unit: "µg/dL", range: "250-450" }

];

function Chemistry({ title="CHEMISTRY", presetTests= chemistryTests, tests = [], onChange, readOnly = false }) {

  const [chemTests, setChemTests] = useState(
    Array.isArray(tests) && tests.length
      ? tests
      : [{ test: "", result: "", unit: "", range: "" }]
  );

  // ================== 🧾 وضع العرض ==================
  if (readOnly) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "25px" }} dir="ltr">
        <h2 style={{ textAlign: "center", fontSize: "27px", marginBottom: "15px" }}>{title}</h2>

        <table className="lab-table" style={{ width: "100%", textAlign: "center"}}>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Unit</th>
              <th>Normal Range</th>
            </tr>
          </thead>

          <tbody>
            {chemTests.map((item, index) => (
              <tr key={index}>
                <td>{item.test}</td>
                <td>{item.result}</td>
                <td>{item.unit}</td>
                <td>{item.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ================== ✍️ وضع الإدخال ==================

  const updateTest = (index, field, value) => {
  const updated = [...chemTests];
  updated[index][field] = value;
  setChemTests(updated);
  if (onChange) onChange([...updated]); // ← مهم: أرسلي نسخة array جديدة
};

  const selectPreset = (index, preset) => {
    updateTest(index, "test", preset.test);
    updateTest(index, "unit", preset.unit);
    updateTest(index, "range", preset.range);
    updateTest(index, "result", chemTests[index]?.result || "");
  };

  const addTest = () => {
    const updated = [...chemTests, { test: "", result: "", unit: "", range: "" }];
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  const removeTest = (index) => {
    const updated = chemTests.filter((_, i) => i !== index);
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div style={{ marginTop: "40px" }} dir="ltr">
      <h2 style={{ textAlign: "center", fontSize: "22px", marginBottom: "10px" }}>{title}</h2>

      {chemTests.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
          {readOnly ? (
            <>
              <div style={{ flex: 2 }}>{item.test}</div>
              <div style={{ flex: 1 }}>{item.result}</div>
              <div style={{ flex: 1 }}>{item.unit}</div>
              <div style={{ flex: 1 }}>{item.range}</div>
            </>
          ) : (
            <>
              <select
                value={item.test}
                onChange={(e) => {
                  const preset = presetTests.find((t) => t.test === e.target.value);
                  if (preset) selectPreset(index, preset);
                  else updateTest(index, "test", e.target.value);
                }}
                style={{ flex: 2, padding: "6px", border: "1px solid #333" }}
              >
                <option value="">اختر اسم الفحص</option>
                {presetTests.map((t, i) => (
                  <option key={i} value={t.test}>{t.test}</option>
                ))}
                <option value="Other">آخر</option>
              </select>
              <input
                type="text"
                placeholder="Result"
                value={item.result}
                onChange={(e) => updateTest(index, "result", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Unit"
                value={item.unit}
                onChange={(e) => updateTest(index, "unit", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Normal range"
                value={item.range}
                onChange={(e) => updateTest(index, "range", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <button onClick={() => removeTest(index)} style={{ padding: "4px 8px", backgroundColor: "#d9534f", color: "white", border: "none", cursor: "pointer" }}>🗑</button>
            </>
          )}
        </div>
      ))}

      {!readOnly && (
        <button onClick={addTest} style={{ marginTop: "10px", padding: "6px 12px", border: "1px solid #333", cursor: "pointer" }}>+</button>
      )}
    </div>
  );
}

export default Chemistry;