import React, { useRef, useState, useEffect } from "react";
import "../styles/LeftB.css";
import axios from "../axios";
import { nanoid } from "nanoid";

const LeftB = ({ setAllDocView, setchoseText, allDocView, width, setWidth, setDocList, setListMax, userObj, pageMax, setLastUrl, setLastPagination }) => {
  const resizerRef = useRef(null);
  const leftBRef = useRef(null);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     if (leftBRef.current) {
  //       const newWidth = ((event.clientX / window.innerWidth) * 100);
  //       setWidth(newWidth);
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //   };

  //   const handleMouseDown = () => {
  //     document.addEventListener('mousemove', handleMouseMove);
  //     document.addEventListener('mouseup', handleMouseUp);
  //   };

  //   if (resizerRef.current) {
  //     resizerRef.current.addEventListener('mousedown', handleMouseDown);
  //   }

  //   return () => {
  //     if (resizerRef.current) {
  //       resizerRef.current.removeEventListener('mousedown', handleMouseDown);
  //     }
  //   };
  // }, [setWidth]);
  const verifySentToUser = async (userId) => {
    try {
      const response = await axios.get(`/api/eDocumentFlow/document/list/?task=VERIFY&sent_by_user=${userId}&limit=${pageMax}&offset=0`);
      
      setDocList(response.data.results);
      setListMax(response.data.count);
      setchoseText("ვიზირება - დამევალა");

        setLastUrl('verifySent');
        setLastPagination(0);
    } catch (error) {
      console.error(error);
    }
  };
  const verifyReceivedToUser = async (userId) => {
    try {
      const response = await axios.get(`/api/eDocumentFlow/document/list/?task=VERIFY&received_to_user=${userId}&limit=${pageMax}&offset=0`);
      setDocList(response.data.results);
      setListMax(response.data.count);
      setLastUrl('verifyReceived');
      setchoseText("ვიზირება - დავავალე");
        setLastPagination(0);

    } catch (error) {
      console.error(error);
    }
  };
  const signSentToUser = async (userId) => {
    try {
      const response = await axios.get(`/api/eDocumentFlow/document/list/?task=SIGN&sent_by_user=${userId}&limit=${pageMax}&offset=0`);
      setDocList(response.data.results);
      setListMax(response.data.count);
      setLastUrl('signSent');
      setchoseText("ხელმოწერა - დამევალა");
        setLastPagination(0);

    } catch (error) {
      console.error(error);
    }
  };
  const signReceivedToUser = async (userId) => {
    try {
      const response = await axios.get(`/api/eDocumentFlow/document/list/?task=SIGN&received_to_user=${userId}&limit=${pageMax}&offset=0`);
      setDocList(response.data.results);
      setListMax(response.data.count);
      setLastUrl('signReceived');
      setchoseText("ხელმოწერა - დავავალე");
        setLastPagination(0);

    } catch (error) {
      console.error(error);
    }
  };


  const viewAllDoc = () => {
    setAllDocView(true);
    axios.get(`/api/eDocumentFlow/document/list/?limit=${pageMax}&offset=0`)
      .then(response => {
        setDocList(response.data.results);
      setListMax(response.data.count);
      setLastUrl('docList');
        setLastPagination(0);
      setchoseText("ყველა");
    })
      .catch(error => {
        console.error(error);
      });
  };

  const hideLeft = () => {
    setWidth(0);
  }

  const setText = (text) => {
    
  } 

  return (
    <div ref={leftBRef} className="bg-base-200 border-r border-gray-800 " style={{ width: `${width}%`, height: "90vh", position: "relative" }}>
      <div style={{ marginLeft: '7%' }}>

        <div className="collapse collapse-plus bg-base-100 hover:bg-base-300" style={{ marginTop: '10px', width: '90%' }}>
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-accent-content">
            ვიზირება
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table>
                <tbody>
                  <tr className="text-accent-content" key={nanoid()}>
                    <td>
                      <button
                        onClick={() => verifySentToUser(userObj?.id)}
                        className="text-accent-content text-xs">
                        დამევალა
                      </button>

                    </td>
                  </tr>
                  <tr className="text-accent-content" key={nanoid()}>
                    <td>
                      <button
                        onClick={() => verifyReceivedToUser(userObj?.id)}
                        className="text-accent-content text-xs">
                        დავავალე
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 hover:bg-base-300" style={{ marginTop: '10px', width: '90%' }}>
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-accent-content">
            ხელმოწერა
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table>
                <tbody>
                  <tr className="text-accent-content" key={nanoid()}>
                    <td>
                      <button
                        onClick={() => signReceivedToUser(userObj?.id)}
                        className="text-accent-content text-xs">
                        დამევალა
                      </button>
                    </td>
                  </tr>
                  <tr className="text-accent-content" key={nanoid()}>
                    <td>
                      <button
                        onClick={() => signSentToUser(userObj?.id)}
                        className="text-accent-content text-xs">
                        დავავალე
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus " style={{ marginTop: '10px', width: '90%' }}>
          <button onClick={viewAllDoc}>
            <div className="collapse-title text-sm font-medium text-accent-content bg-base-100 text-white whitespace-nowrap hover:bg-base-300 text-start">
              ყველას ნახვა
            </div>
          </button>
        </div>

        <button
  className="btn flex items-center justify-center bg-gray-800 absolute top-1/2 translate-x-2 right-0 transform p-1 text-xs"
  onClick={hideLeft}
>
  &#60;
</button>

        {/* <div
        className="bg-base-200"
          ref={resizerRef}
          style={{
            width: "7px",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "ew-resize"
          }}
        /> */}
      </div>
    </div>
  );
};

export default LeftB;