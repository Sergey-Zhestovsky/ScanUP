import React from "react";

import Button from "../../../../../utils/Button/Button";

import styles from "../Form.module.less";

export default function FormSubmit(props) {
  return (
    <div className={styles["form-submit-wrapper"]}>
      <Button className={styles["form-submit"]} {...props} />
    </div>
  );
}