import React from "react";
import { Filters, AllDocInfo } from "../components";

import "../styles/Body.css";

const Body = ({ userObj, setSelectedDoc, allDocView }) => {
  return (
    <div className="flex flex-col border-r border-l border-gray-800 h-full p-10" style={{ width: "60%" }}>
      <Filters />
      {allDocView && (
      <div className="overflow-y-auto max-h-72 block">
        <AllDocInfo setSelectedDoc={setSelectedDoc} />
      </div>
      )}
    </div>
  );
};

export default Body;
