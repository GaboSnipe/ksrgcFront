import React from 'react';
import axios from "../axios";
import { FaFile } from 'react-icons/fa';



const FileIcon = ({ name, choseText, setchoseText, setFileList, setIsFileList }) => {

  const fetchData = async () => {
   
  };
  return (
    <div className="flex flex-col items-center">
      <button onClick={fetchData}>
      <FaFile  className="text-gray-500 text-6xl" />
      </button>
      <span className="mt-2 text-sm text-content">{name}</span>
    </div>
  );
};

export default FileIcon;
