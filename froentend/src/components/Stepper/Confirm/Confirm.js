import React from "react";

const Confirm = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "70%",
          backgroundColor: "white",
          height: "30%",
          display: "flex",
          margin: "1em",
        }}
      >
        <div>
          <div
            style={{ display: "flex", flexDirection: "column", padding: "1em" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ marginRight: "0.5em" }}>iPhone 12</h1>
            </div>
            <p>
              Quantity:<strong>1</strong>
            </p>
            <p>
              Category:<strong>Electronics</strong>
            </p>
            <p>
              A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED
              display.
            </p>
            <p style={{ color: "red", fontSize: "1.5em" }}>
              Total Price: ₹ 100000
            </p>
          </div>
        </div>
        <div
          style={{
            borderLeft: "1px solid  rgba(211,211,211,0.5)",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            lineHeight: "0.3em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginRight: "0.5em", marginBottom: "1em   " }}>
              Address Details:
            </h1>
          </div>
          <p>Lucknow Home</p>
          <p>Contact Number: 7903710346</p>
          <p>Police Line,Lucknow</p>
          <p>Uttar Pradesh</p>
          <p>723990</p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
