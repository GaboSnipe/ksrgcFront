import React, { useState } from 'react';
import axios from '../axios';
import { FaArrowLeft, FaFolderPlus,  FaFileMedical } from 'react-icons/fa';

import { FolderIcon, FileIcon, FolderCreatePage, FileAddPage } from "./index";

const FileList = ({ fileList, choosedFileUuid, setChoosedFileUuid, choseText, setchoseText, setFileList, setIsFileList, isFileList }) => {
  const [seeFolderCreate, setSeeFolderCreate] = useState(false);
  const [seeFileAdd, setSeeFileAdd] = useState(false);

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
  const folderCreateShow = () => {
    setSeeFolderCreate(!seeFolderCreate);
  }

  const fileAddShow = () =>{
    setSeeFileAdd(!seeFileAdd);
  }

  const fileAdd = async () => {
    try {
      const response = await axios.get(`/api/expertise/folder/list/`);
      setFileList(response.data);
      setIsFileList(false);

    } catch (error) {
      console.error('Error:', error);
    }
    setchoseText("სამუშაო გარემო");
  }

  return (
    <>
      <div className="w-full rounded-lg p-4  container">
        <div className="flex flex-wrap gap-8">
          <div className="w-full">
            {isFileList &&
              <span className="w-fit p-1 bg-yellow-600 rounded-md  flex items-center justify-center text-white text- text-content font-bold">
              To Do
            </span>
            }
            
          </div>
          {fileList.map((file, index) =>
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
                  setChoosedFileUuid={setChoosedFileUuid}
                />
              )
            )
          }
          {isFileList ? (
            <>
              <div className="flex flex-col items-center">
              <button onClick={fileAddShow}>
                <FaFileMedical className="text-gray-600 text-6xl" />
              </button>
            </div>
              <button className="btn bg-blue-600 flex" onClick={fetchData}>
                <FaArrowLeft className="text-xl" />
              </button>
            </>
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
      {seeFileAdd && (
        <FileAddPage fileAddShow={fileAddShow} setSeeFileAdd={setSeeFileAdd} choosedFileUuid={choosedFileUuid}/>

      )}
    </>
  );
};

export default FileList;
