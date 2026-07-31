
function BFFM({ value = "", onChange, readOnly }) {

  return (
    <div style={{marginTop: "15px",border: "1px solid #ccc", background: "white",
      padding: "2px",direction: "ltr",display: "flex",alignItems: "center", borderRadius: "10px"}}>

      <h4 style={{ fontWeight: "bold", width: "80px" }}>BFFM:</h4>

      <input
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        style={{width: "200px"}}
      />

      {!readOnly && (<div className="quick-buttons">
        <button style={{marginRight:"5px", marginLeft:"5px"}} 
        type="button" className="btn" onClick={() => onChange("Positive")}>Positive</button>

        <button type="button" className="btn" onClick={() => onChange("Negative")}>Negative</button>
      </div>)}

    </div>
  );

}

export default BFFM;