import React, { useState } from 'react';
import axios from '../axios';
import { FaArrowLeft } from 'react-icons/fa';

import {FolderIcon,FileIcon} from "./index";

const FileList = ({ fileList, choseText, setchoseText, setFileList, setIsFileList, isFileList }) => {

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

  return (
    <div className="w-full md:w-3/4 rounded-lg p-4">
      <div className="flex space-x-8">
        {fileList.length === 0 ? (
          <div className="flex justify-center items-center w-full">
            <p className="text-4xl">ცარიელია</p>
          </div>
        ) : (
          fileList.map((file, index) => (
            isFileList ? (
              <FileIcon choseText={choseText} setchoseText={setchoseText} setIsFileList={setIsFileList} key={index} name={file.title}/>
            ) : (
              <FolderIcon choseText={choseText} setchoseText={setchoseText} setIsFileList={setIsFileList} key={index} name={file.title} uuid={file.uuid} setFileList={setFileList} />
            )
          ))
        )}
        {isFileList ? (
        <button className='btn bg-blue-600' onClick={fetchData}><FaArrowLeft className="text-xl" /></button>):null}
      </div>
    </div>
  );
};

export default FileList;
