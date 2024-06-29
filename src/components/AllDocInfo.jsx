import React, { useEffect, useState } from "react";
import axios from "../axios";
import { DocInfo } from ".";

const AllDocInfo = ({ setSelectedDoc }) => {
  const [docList, setDocList] = useState(null);

  useEffect(() => {
    axios.get('/api/eDocumentFlow/document/list/')
      .then(response => {
        setDocList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
  };

  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-base-200 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">title</th>
        <th scope="col" className="px-6 py-3">documentNumber</th>
        <th scope="col" className="px-6 py-3">owner</th>
        <th scope="col" className="px-6 py-3">created_at</th>
      </tr>
    </thead>
    <tbody>
      {docList?.map((item) => (
        <DocInfo key={item.id} docInfo={item} onClick={() => handleDocClick(item)} />
      ))}
    </tbody>
  </table>
</div>
  );
};

export default AllDocInfo;
