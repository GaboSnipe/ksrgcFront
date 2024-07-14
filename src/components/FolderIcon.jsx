import React from 'react';
import axios from "../axios";
import { FaFolder } from 'react-icons/fa';

const FolderIcon = ({ name, setFileList, choseText, setchoseText, uuid, setIsFileList }) => {

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/expertise/folder/${uuid}/details/`);
      setFileList(response.data.files);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsFileList(true);
    setchoseText(choseText + " - " + name );
  };
  return (
    <div className="flex flex-col items-center">
      <button onClick={fetchData}>
      <FaFolder  className="text-yellow-500 text-6xl" />
      </button>
      <span className="mt-2 text-sm text-content">{name}</span>
    </div>
  );
};

export default FolderIcon;
