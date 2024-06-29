import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Header, Body, LeftB, RightB, AllDocInfo } from "../components";
import axios from "../axios";

const Home = () => {
  const token = localStorage.getItem('token');
  const [allDocView, setAllDocView] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null); // Состояние для выбранного документа

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/accounts/auth/users/me/');
        setUserObj(response?.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div>
      <Header selectedDoc={selectedDoc}/>
      <div style={{ display: "flex" }}>
        <LeftB setAllDocView={setAllDocView} allDocView={allDocView} />
        <Body userObj={userObj} setSelectedDoc = {setSelectedDoc} allDocView={allDocView}/>
        <RightB selectedDoc={selectedDoc} /> {/* Передаем выбранный документ в RightB */}
      </div>
    </div>
  );
};

export default Home;
