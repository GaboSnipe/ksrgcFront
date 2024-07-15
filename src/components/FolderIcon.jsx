import React from 'react';
import axios from "../axios";
import { FaFolder } from 'react-icons/fa';

const FolderIcon = ({ name, setFileList, choseText, setchoseText, uuid, setIsFileList, setChoosedFileUuid }) => {

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/expertise/folder/${uuid}/details/`);
      setFileList(response.data.files);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsFileList(true);
    if (choseText) {
      setchoseText(choseText + " - " + name);
    }
    setChoosedFileUuid(uuid);
  };
  return (
    <div className="relative flex flex-col items-center justify-center">
      <button onClick={fetchData} className="relative">
        <div>
          <FaFolder className="text-yellow-500 text-6xl" />

        </div>
      </button>
      <span className="mt-2 text-sm text-content max-w-[5rem] truncate">{name}</span>

    </div>


  );
};

export default FolderIcon;
