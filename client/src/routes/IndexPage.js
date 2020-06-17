import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <a
        onClick={() => {
          window.location.href = "#/list";
        }}
      >
        列表
      </a>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
