import React from "react";

const Footer: React.FC = () => {
  const footerStyle = {
    backgroundColor: "#444",
    opacity: "0.5",
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#ccc",
    position: "sticky",
    top: "100vh",
  };

  return (
    <footer style={footerStyle}>
      <p>© Apex Legends Map Rotation. All rights reserved.</p>
      <p>このサイトは非公式のファンサイトです。公式情報ではありません。</p>
      <p>取得した情報の著作権は各所有者に帰属します。</p>
    </footer>
  );
};

export default Footer;
