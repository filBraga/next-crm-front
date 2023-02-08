import React from "react";
import styles from "./Style.module.scss";

const Detail = () => {
  return (
    <div className={styles.div2}>
      <h1>esquerda</h1>
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: 0,
        }}
      >
        {" "}
        <h1>direita</h1>
      </div>
    </div>
  );
};

export default Detail;
