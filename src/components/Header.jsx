import React, { useState } from "react";
import "../styles/Header.css";
import { useSelector } from "react-redux";
import { DocAdd } from "./index.js";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [isOpenAddDoc, setIsOpenAddDoc] = useState(false);
  const [isOpenAllDoc, setIsOpenAllDoc] = useState(false);
  const [isOpenSign, setIsOpenSign] = useState(false);
  const [isOpenVerify, setIsOpenVerify] = useState(false);

  const toggleAddDoc = () => {
    setIsOpenAddDoc(!isOpenAddDoc);
  };
  const toggleAllDoc = () => {
    setIsOpenAllDoc(!isOpenAllDoc);
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
        <div className="container text-2xl navlinks-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button onClick={toggleAddDoc}>
            <div className="collapse-title text-xl font-medium text-accent-content">დოკუმენტის დამატება</div>
          </button>
          <button onClick={toggleAllDoc}>
            <div className="collapse-title text-xl font-medium text-accent-content">viev all document</div>
          </button>
          <button onClick={toggleSign}>
            <div className="collapse-title text-xl font-medium text-accent-content">send to sign</div>
          </button>
          <button onClick={toggleVerify}>
            <div className="collapse-title text-xl font-medium text-accent-content">send to verify</div>
          </button>
        </div>
      </div>

      {isOpenAddDoc && (

        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={toggleAddDoc}></div>
            <DocAdd />
          </div>
        </>
      )}
      {isOpenAllDoc && (

        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={toggleAllDoc}></div>
          </div>
        </>
      )}
      {isOpenSign && (

        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={toggleSign}></div>
          </div>
        </>
      )}
      {isOpenVerify && (

        <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="popup-backdrop" onClick={toggleVerify}></div>
        </div>
        </>
      )}
    </>
  );
};

export default Header;
