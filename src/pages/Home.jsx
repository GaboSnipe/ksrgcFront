import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Header, Body, LeftB, RightB } from "../components";
import axios from "../axios";

const Home = () => {
  const token = localStorage.getItem('token');
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/users/me/');
        setUserObj(response?.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <div style={{display: "flex"}}>
        <LeftB />
        <Body userObj={userObj} />
        <RightB />
      </div>
    </div>
  );
};

export default Home;
