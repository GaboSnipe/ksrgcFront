import React, { useState } from "react";
import "../styles/Header.css";
import { useSelector } from "react-redux";
import { DocAdd, DocVerify, DocSign } from "./index.js";
import 'react-toastify/dist/ReactToastify.css';

const Header = ({selectedDoc}) => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [isOpenAddDoc, setIsOpenAddDoc] = useState(false);
  const [isOpenSign, setIsOpenSign] = useState(false);
  const [isOpenVerify, setIsOpenVerify] = useState(false);

  const toggleAddDoc = () => {
    setIsOpenAddDoc(!isOpenAddDoc);
  };

  const toggleSign = () => {
    setIsOpenSign(!isOpenSign);
  };
  const toggleVerify = () => {
    setIsOpenVerify(!isOpenVerify);
  };



  return (
<>
  <div
    className="navbar-bottom-menu border-y border-gray-800 bg-base-200 rounded-b-lg"
    style={{ height: "10vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <div className="container text-base navlinks-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={toggleAddDoc}>
        <div className="collapse-title text-sm font-medium text-accent-content">დოკუმენტის დამატება</div>
      </button>
      <button onClick={toggleSign}>
        <div className="collapse-title text-sm font-medium text-accent-content">send to sign</div>
      </button>
      <button onClick={toggleVerify}>
        <div className="collapse-title text-sm font-medium text-accent-content">send to verify</div>
      </button>
    </div>
  </div>

  {isOpenAddDoc && (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="popup-backdrop" onClick={toggleAddDoc}></div>
        <DocAdd setIsOpenAddDoc={setIsOpenAddDoc}/>
      </div>
    </>
  )}
  {isOpenSign && (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="popup-backdrop" onClick={toggleSign}></div>
        <DocSign selectedDoc={selectedDoc}/>
      </div>
    </>
  )}
  {isOpenVerify && (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="popup-backdrop" onClick={toggleVerify}></div>
        <DocVerify selectedDoc={selectedDoc}/>
      </div>
    </>
  )}
</>
  );
};

export default Header;
