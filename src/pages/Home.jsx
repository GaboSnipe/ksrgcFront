import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Header, Body, LeftB, RightB } from "../components";
import axios from "../axios";
import { ActiveObj } from "../utils/const";


const Home = () => {
  const [activeObj, setActiveObj] = useState(ActiveObj.ALLDOC)
  const [allDocView, setAllDocView] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [leftBWidth, setLeftBWidth] = useState(parseInt(localStorage.getItem('leftBWidth')) || 15);
  const [rightBWidth, setRightBWidth] = useState(parseInt(localStorage.getItem('rightBWidth')) || 20);
  const [docList, setDocList] = useState([]);
  const [lastUrl, setLastUrl] = useState('docList');
  const [lastPagination, setLastPagination] = useState(0);
  const [userId, setUserId] = useState(null); // Initialize userId as null initially
  const [urlList, setUrlList] = useState();
  const [listMax, setListMax] = useState();
  const [choseText, setchoseText] = useState("ყველა");
  const [fileList, setFileList] = useState([]);
  const [isFileList, setIsFileList] = useState(false);

  const pageMax = 10;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/accounts/auth/users/me/');
        setUserObj(response?.data);
        setUserId(response?.data?.id); // Set userId after userObj is fetched
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const newUrlList = {
      docList: `/api/eDocumentFlow/document/list/?limit=${pageMax}&offset=${lastPagination}`,
      verifySent: `/api/eDocumentFlow/document/list/?task=VERIFY&sent_by_user=${userId}&limit=${pageMax}&offset=${lastPagination}`,
      verifyReceived: `/api/eDocumentFlow/document/list/?task=VERIFY&received_to_user=${userId}&limit=${pageMax}&offset=${lastPagination}`,
      signSent: `/api/eDocumentFlow/document/list/?task=SIGN&sent_by_user=${userId}&limit=${pageMax}&offset=${lastPagination}`,
      signReceived: `/api/eDocumentFlow/document/list/?task=SIGN&received_to_user=${userId}&limit=${pageMax}&offset=${lastPagination}`
    };

    setUrlList(newUrlList);
  }, [lastPagination]);

  const setAndStoreLeftBWidth = (newWidth) => {
    setLeftBWidth(newWidth);
    localStorage.setItem('leftBWidth', newWidth.toString());
  };

  const setAndStoreRightBWidth = (newWidth) => {
    setRightBWidth(newWidth);
    localStorage.setItem('rightBWidth', newWidth.toString());
  };

  const makeLeftWidthNorm = () => {
    setAndStoreLeftBWidth(15);
  };

  const makeRightWidthNorm = () => {
    setAndStoreRightBWidth(20);
  };

  return (
    <div>
      <Header selectedDoc={selectedDoc} />
      <div style={{ display: "flex", width: "100%" }}>
        {leftBWidth < 10 ? (
          <button
            className="btn flex items-center z-50 justify-center absolute top-1/2 left-0 transform "
            onClick={makeLeftWidthNorm}
          >
            &#62;
          </button>
        ) : (
          <LeftB
            setDocList={setDocList}
            setAllDocView={setAllDocView}
            allDocView={allDocView}
            width={leftBWidth}
            userObj={userObj}
            setWidth={setAndStoreLeftBWidth}
            pageMax={pageMax}
            setLastUrl={setLastUrl}
            setLastPagination={setLastPagination}
            setListMax={setListMax}
            setchoseText={setchoseText}
            activeObj={activeObj}
            setActiveObj={setActiveObj}
            setFileList={setFileList}
            setIsFileList={setIsFileList}

          />
        )}

        <Body 
          userObj={userObj} 
          setSelectedDoc={setSelectedDoc} 
          allDocView={allDocView}
          docList={docList}
          setDocList={setDocList}
          setLastPagination={setLastPagination}
          setLastUrl={setLastUrl} 
          lastPagination={lastPagination}
          lastUrl={lastUrl}
          pageMax={pageMax}
          urlList={urlList}
          listMax={listMax}
          setListMax={setListMax}
          setchoseText={setchoseText}
          choseText={choseText}
          activeObj={activeObj}
          setFileList={setFileList}
          fileList={fileList}
          setIsFileList={setIsFileList}
          isFileList={isFileList}
        />

        {rightBWidth < 10 ? (
          <button
            className="btn flex items-center justify-center absolute top-1/2 right-0 transform "
            onClick={makeRightWidthNorm}
          >
            &#60;
          </button>
        ) : (
          <RightB
            selectedDoc={selectedDoc}
            width={rightBWidth}
            setWidth={setAndStoreRightBWidth}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
