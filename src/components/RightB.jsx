import React, { useRef, useState, useEffect } from "react";
import { format } from 'date-fns';
import { nanoid } from "nanoid";

const RightB = ({ selectedDoc, width, setWidth }) => {
  const resizerRef = useRef(null);
  const rightBRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (rightBRef.current) {
        const newWidth = (((window.innerWidth - event.clientX) / window.innerWidth) * 100);
        setWidth(newWidth);
      }

    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    if (resizerRef.current) {
      resizerRef.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (resizerRef.current) {
        resizerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [setWidth]);

  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy, HH:mm') : '';
  };

  return (
    <div ref={rightBRef} className="bg-base-200 border-l border-gray-800" style={{ width: `${width}%`, height: "90vh", position: "relative" }}>
      <div style={{ marginLeft: '7%' }}>
        <div className="collapse collapse-plus bg-base-100 hover:bg-base-300" style={{ marginTop: '10px', width: '90%' }}>
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-content">
            დოკუმენტი
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>comment: {selectedDoc?.comment}</td>
                  </tr>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>created_at: {formatDate(selectedDoc?.created_at)}</td>
                  </tr>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>documentNumber: {selectedDoc?.documentNumber}</td>
                  </tr>
                  {/* <tr className="text-content text-xs" key={nanoid()}>
                    <td>have_to_sign_users: {selectedDoc?.have_to_sign_users}</td>
                  </tr>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>have_to_verify_users: {selectedDoc?.have_to_verify_users}</td>
                  </tr> */}
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>is_signed: {selectedDoc?.is_signed ? <span className="text-green-500">&#x2713;</span> : <span className="text-red-500">&#x2717;</span>}</td>
                  </tr>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>is_verified: {selectedDoc?.is_verified ? <span className="text-green-500">&#x2713;</span> : <span className="text-red-500">&#x2717;</span>}</td>
                  </tr>
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>owner: {selectedDoc?.owner}</td>
                  </tr>
                  {/* <tr className="text-content text-xs" key={nanoid()}>
                    <td>signed_by_users: {selectedDoc?.signed_by_users}</td>
                  </tr> */}
                  <tr className="text-content text-xs" key={nanoid()}>
                    <td>title: {selectedDoc?.title}</td>
                  </tr>
                  {/* <tr className="text-content text-xs" key={nanoid()}>
                    <td>updated_at: {formatDate(selectedDoc?.updated_at)}</td>
                  </tr> */}
                  {/* <tr className="text-content text-xs" key={nanoid()}>
                    <td>uuid: {selectedDoc?.uuid}</td>
                  </tr> */}
                  {/* <tr className="text-content text-xs" key={nanoid()}>
                    <td>verified_by_users: {selectedDoc?.verified_by_users}</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 mt-2 w-11/12 hover:bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-content">
            ხელმოწერა
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase">
                  <tr>
                    <th scope="col" className="px-3 py-2">user</th>
                    <th scope="col" className="px-3 py-2">is?</th>
                    <th scope="col" className="px-3 py-2">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer">
                    <th scope="row" className="border-r border-gray-600 rounded px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                      {selectedDoc?.have_to_sign_users}
                    </th>
                    <td className="px-3 py-2 text-xs text-center">
                      {selectedDoc ? (
                        selectedDoc.is_signed ? (
                          <span className="text-green-500">&#x2713;</span>
                        ) : (
                          <span className="text-red-500">&#x2717;</span>
                        )
                      ) : (
                        ""
                      )}

                    </td>
                    <td className="border-l border-gray-600 px-3 py-2 text-xs">
                      {formatDate(selectedDoc?.created_at)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 mt-2 w-11/12 hover:bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-content">
            ვიზირება
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase">
                  <tr>
                    <th scope="col" className="px-3 py-2">user</th>
                    <th scope="col" className="px-3 py-2">is?</th>
                    <th scope="col" className="px-3 py-2">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer">
                    <th scope="row" className="border-r border-gray-600 rounded px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                      {selectedDoc?.have_to_verify_users}
                    </th>
                    <td className="px-3 py-2 text-xs text-center">
                    {selectedDoc ? (
                        selectedDoc.is_verified ? (
                          <span className="text-green-500">&#x2713;</span>
                        ) : (
                          <span className="text-red-500">&#x2717;</span>
                        )
                      ) : (
                        ""
                      )}

                    </td>
                    <td className="border-l border-gray-600 px-3 py-2 text-xs">
                      {formatDate(selectedDoc?.created_at)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
        className="bg-base-200"

          ref={resizerRef}
          style={{
            width: "7px",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "ew-resize"
          }}
        />
      </div>
    </div>
  );
};

export default RightB;

