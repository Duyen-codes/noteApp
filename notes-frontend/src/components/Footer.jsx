import React from "react";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

export default Footer;
