import React, { useState } from 'react';
import axios from '../axios';
import { FaArrowLeft, FaFolderPlus } from 'react-icons/fa';

import {FolderIcon,FileIcon,FolderCreatePage} from "./index";

const FileList = ({ fileList, choseText, setchoseText, setFileList, setIsFileList, isFileList }) => {
  const [seeFolderCreate, setSeeFolderCreate] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/expertise/folder/list/`);
      setFileList(response.data);
     setIsFileList(false);

    } catch (error) {
      console.error('Error:', error);
    }
    setchoseText("სამუშაო გარემო");
  };
  const folderCreateShow = () =>{
    setSeeFolderCreate(!seeFolderCreate);
  }


  return (
    <>
    <div className="w-full rounded-lg p-4  container">
    <div className="flex flex-wrap gap-8">
  {fileList.length === 0 ? (
    <div className="flex justify-center items-center w-full ">
      <p className="text-4xl">ცარიელია</p>
    </div>
  ) : (
    fileList.map((file, index) =>
      isFileList ? (
        <FileIcon
          choseText={choseText}
          setchoseText={setchoseText}
          setIsFileList={setIsFileList}
          key={index}
          name={file.title}
        />
      ) : (
        <FolderIcon
          choseText={choseText}
          setchoseText={setchoseText}
          setIsFileList={setIsFileList}
          key={index}
          name={file.title}
          uuid={file.uuid}
          setFileList={setFileList}
        />
      )
    )
  )}
  {isFileList ? (
    <button className="btn bg-blue-600 flex" onClick={fetchData}>
      <FaArrowLeft className="text-xl" />
    </button>
  ) : (
    <div className="flex flex-col items-center">
      <button onClick={folderCreateShow}>
        <FaFolderPlus className="text-gray-600 text-6xl" />
      </button>
    </div>
  )}
</div>

    </div>
    {seeFolderCreate && (
      <FolderCreatePage folderCreateShow={folderCreateShow} setSeeFolderCreate={setSeeFolderCreate} />
      
    )}
    </>
  );
};

export default FileList;
