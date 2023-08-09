/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Alert({ type, message }) {
  return (
    <>
      <div className={`col-3 alert alert-${type || "primary"}`}>{message}</div>
    </>
  );
}
