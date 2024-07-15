import React, { useEffect, useState } from "react";
import "../styles/Body.css";
import { Filters, AllDocInfo, FileList, Inbox } from "../components";
import axios from "../axios";
import { ActiveObj } from "../utils/const";


const Body = ({
  userObj,
  setSelectedDoc,
  allDocView,
  docList,
  setDocList,
  setLastPagination,
  setLastUrl,
  lastPagination,
  lastUrl,
  urlList,
  pageMax,
  setListMax,
  listMax,
  setchoseText,
  choseText,
  activeObj,
  fileList,
  setFileList,
  setIsFileList,
  isFileList,
}) => {
  const handleClick = (doc) => {
    setSelectedDoc(doc);
  };

  const setPage = (index) => {
    setLastPagination(lastPagination + (index * pageMax));
  };
  const setMinPage = () => {
    setLastPagination(0)
  }
  const setMaxPage = () => {
    setLastPagination((Math.ceil(listMax / pageMax) - 1) * pageMax);
  }
  

  useEffect(() => {
    if (lastUrl && urlList && urlList[lastUrl]) {
      axios.get(urlList[lastUrl])
        .then(response => {
          setDocList(response.data.results);
          setListMax(response.data.count);
        })
        .catch(error => {
          console.error(error);
        });
    }
    
  }, [urlList]);
  const contentComponents = {
    [ActiveObj.WORKSPACE]: (
      <FileList setchoseText={setchoseText} choseText={choseText} setFileList={setFileList} fileList={fileList} isFileList={isFileList}  setIsFileList={setIsFileList}/>
      
    ),
    [ActiveObj.ALLDOC]: (
      <>
          <div className="overflow-y-auto max-h-72 block">
            <AllDocInfo
              setSelectedDoc={setSelectedDoc}
              docList={docList}
              setDocList={setDocList}
              setLastPagination={setLastPagination}
              setLastUrl={setLastUrl}
              pageMax={pageMax}
              choseText={choseText}
            />
          </div>
          <div className="bg-base-200 rounded-b-md flex justify-center items-center p-4">
            {lastPagination <= 0 ? ('') : (
              <>
                {(lastPagination - pageMax) <= 0 ? ('') : (
                  <button
                    onClick={setMinPage}
                    className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
                  >
                    1
                  </button>
                )}
                <button
                  onClick={() => setPage(-1)}
                  className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
                >
                  {Math.ceil(lastPagination / pageMax)}
                </button>
              </>
            )}
            <button
              className="btn bg-blue-500 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
            >
              {Math.ceil(lastPagination / pageMax) + 1}
            </button>
            {lastPagination >= listMax - pageMax ? ('') : (
              <button
                onClick={() => setPage(1)}
                className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
              >
                {Math.ceil(lastPagination / pageMax) + 2}
              </button>
            )}
            {(lastPagination + (2 * pageMax)) >= listMax ? ('') : (
              <button
                onClick={setMaxPage}
                className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
              >
                {Math.ceil(listMax / pageMax)}
              </button>
            )}
          </div>
        </>
    ),
    [ActiveObj.INBOX]: (
      <Inbox fileList={fileList}/>
    ),
  };


  return (
    <div className="flex-grow bg-base-300 p-4">
    <h1 className="my-5 py-4 pl-5 dark:bg-base-200" id="docInfoPath">დოკუმენტები - {choseText}</h1>
    <div className="max-h-72 block">
    {contentComponents[activeObj] || <div>Default Content</div>}
     
    </div>
      {/* <Filters /> */}
      {/* <div className="overflow-y-auto max-h-72 block">
        <AllDocInfo
          setSelectedDoc={setSelectedDoc}
          docList={docList}
          setDocList={setDocList}
          setLastPagination={setLastPagination}
          setLastUrl={setLastUrl}
          pageMax={pageMax}
          choseText={choseText}
        />
      </div>
      <div className="bg-base-200 rounded-b-md flex justify-center items-center p-4">
        {lastPagination <= 0 ? ('') : (
          <>
          {(lastPagination - pageMax) <= 0 ? ('') : (
            <button
              onClick={setMinPage}
              className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
            >
              1
            </button>)}
            <button
              onClick={() => setPage(-1)}
              className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
            >
             {(lastPagination / pageMax)}
             </button>
          </>)}
        <button
          className={`btn bg-blue-500 bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded`}
        >
          {(lastPagination / pageMax) + 1}
        </button>
        {lastPagination >= listMax - pageMax ? ('') : (<button
          onClick={() => setPage(1)}
          className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
        >
          {(lastPagination / pageMax) + 2}
        </button>)}
        {(lastPagination + (2 * pageMax)) >= listMax ? ('') : (
          <button
            onClick={setMaxPage}
            className="btn bg-gray-700 hover:bg-gray-500 text-white btn-sm mx-2 rounded"
          >
            {Math.ceil(listMax / pageMax)}
          </button>)}
      </div> */}
    </div>
  );
};

export default Body;
