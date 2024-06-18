import React, { useEffect, useState } from "react";
import { ProductElement, Filters } from "../components";
import "../styles/Body.css";

const Body = ({ userObj }) => {
  return (
    <div className="d-flex flex-column border-right border-left border-gray-800 h-100 d-flex flex-column justify-center p-10" style={{ width: "60%" }}>
      <Filters />

    </div>

  );
};

export default Body;
