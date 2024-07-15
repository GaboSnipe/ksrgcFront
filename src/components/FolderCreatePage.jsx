
import axios from '../axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const FolderCreatePage = ({folderCreateShow, setSeeFolderCreate}) => {
    const [customer, setCustomer] = useState("");
    const [cas, setCas] = useState("");
    const [comment, setComment] = useState("");
    const [stat, setStat] = useState("TODO");

    
  const ToList = {
    TODO: "todo",
    ARVICIMETIRA: "ar vici meti ra",
    MARTOTODOMUSHAOBS: "marto todo mushaobs"
  }

    const folderCreate = async () =>{
        let folderObj = new FormData();
          folderObj.append('customer', customer);
          folderObj.append('case', cas);
          folderObj.append('comment', comment);
          folderObj.append('status', stat);
          try{
            const response = await axios.post(`/api/expertise/folder/`, folderObj);
            setCustomer("");
            setCas("");
            setComment("");
            setStat("");
            setSeeFolderCreate(false);
            toast.success("Ok");
          }catch(err){
            toast.error("error:" + err);
            console.error(err);
          }
    
      }
      
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={folderCreateShow}></div>
            <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
                <h1 className="text-xl text-center text-content mb-4">folder create</h1>
                <div className="divide-y divide-slate-700">
                    <div className="grid grid-cols-2 gap-4 py-2 items-center">
                        <label className="text-xl font-medium text-white-700 col-span-1 ml-5">customer</label>
                        <div className="relative col-span-1">
                            <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                                <input
                                    id="customer"
                                    type="text"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    className="border-none flex-grow ml-2 focus:outline-none text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 items-center">
                        <label className="text-xl font-medium text-white-700 col-span-1 ml-5">case</label>
                        <div className="relative col-span-1">
                            <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>

                                <input
                                    id="cas"
                                    type="text"
                                    value={cas}
                                    onChange={(e) => setCas(e.target.value)}
                                    className="border-none flex-grow ml-2 focus:outline-none text-white"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 items-center">
                        <label className="text-xl font-medium text-white-700 ml-5">comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-1"
                            style={{ maxHeight: '40vh', minHeight: '15vh', overflowY: 'auto' }}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 items-center">
                            <label htmlFor="stat" className="text-xl font-medium text-gray-700 col-span-1 ml-5">Status</label>
                            <div className="relative col-span-1">
                                <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                                    <select
                                        id="stat"
                                        value={stat}
                                        onChange={(e) => setStat(e.target.value)}
                                        className="border-none flex-grow ml-2 focus:outline-none text-white"
                                    >
                                        {Object.entries(ToList).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    <div className="flex justify-center py-2">
                        <button
                            type="button"
                            onClick={folderCreate}
                            className="bg-transparent hover:bg-blue-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
   ) };

export default FolderCreatePage;
